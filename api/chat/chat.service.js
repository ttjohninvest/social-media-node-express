const dbService = require('../../services/db.service')
const logger = require('../../services/logger.service')
const ObjectId = require('mongodb').ObjectId
const utilService = require('../../services/util.service')

module.exports = {
  // remove,
  query,
  getById,
  // add,
  update,
}

async function query(filterBy) {
  try {
    const criteria = _buildCriteria(filterBy)
    // const criteria = {}

    const collection = await dbService.getCollection('chat')

    var chats = await collection
      .find(criteria)
      .sort({ createdAt: -1 })
      .toArray()
    return chats
  } catch (err) {
    logger.error('cannot find chats', err)
    throw err
  }
}

async function getById(chatId) {
  try {
    const collection = await dbService.getCollection('chat')
    const chat = collection.findOne({ _id: ObjectId(chatId) })
    return chat
  } catch (err) {
    logger.error(`while finding chats ${chatId}`, err)
    throw err
  }
}

// async function remove(chatId) {
//   try {
//     const collection = await dbService.getCollection('chat')
//     await collection.deleteOne({ _id: ObjectId(chatId) })
//     return chatId
//   } catch (err) {
//     logger.error(`cannot remove chats ${chatId}`, err)
//     throw err
//   }
// }

// async function add(chat) {
//   const { body, imgBodyUrl, title, userId } = chat
//   try {
//     const chatToAdd = {
//       userId: ObjectId(userId),
//       title,
//       body,
//       reactions: [],
//       createdAt: new Date().getTime(),
//       imgBodyUrl,
//       shares: [],
//       comments: [],
//     }

//     const collection = await dbService.getCollection('chat')
//     await collection.insertOne(chatToAdd)
//     return chatToAdd
//   } catch (err) {
//     logger.error('cannot insert chats', err)
//     throw err
//   }
// }

async function update(chat) {
  try {
    var id = ObjectId(chat._id)
    delete chat._id
    const collection = await dbService.getCollection('chat')
    await collection.updateOne({ _id: id }, { $set: { ...chat } })
    const addedPost = { ...chat, _id: id }
    return addedPost
  } catch (err) {
    logger.error(`cannot update chat ${chat._id}`, err)
    throw err
  }
}

function _buildCriteria(filterBy) {
  const criteria = {}

  // by name
  if (filterBy.txt) {
    const regex = new RegExp(filterBy.txt, 'i')
    criteria.txt = { $regex: regex }
  }

  if (filterBy.userId) {
    criteria.userId = filterBy.userId
  }

  // filter by inStock
  if (filterBy.inStock) {
    criteria.inStock = { $eq: JSON.parse(filterBy.inStock) }
  }

  // filter by labels
  if (filterBy.labels?.length) {
    criteria.labels = { $in: filterBy.labels }
  }

  return criteria
}
