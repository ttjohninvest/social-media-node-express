const dbService = require('../../services/db.service')
const logger = require('../../services/logger.service')
const ObjectId = require('mongodb').ObjectId
const utilService = require('../../services/util.service')

module.exports = {
  add,
}

async function add(comment) {
  console.log(comment)
  const { txt, postId, userId } = comment
  try {
    const commentToAdd = {
      _id: utilService.makeId(24),
      userId: ObjectId(userId),
      postId: ObjectId(postId),
      txt,
      reactions: [],
      createdAt: new Date().getTime(),
    }

    const collection = await dbService.getCollection('post')
    const res = await collection.updateOne(
      { _id: ObjectId(postId) },
      { $push: { comments: commentToAdd } }
    )
    console.log(res)
    return commentToAdd
  } catch (err) {
    logger.error('cannot insert comment', err)
    throw err
  }
}

function _buildCriteria(filterBy) {
  const criteria = {}

  // by name
  const regex = new RegExp(filterBy.name, 'i')
  criteria.name = { $regex: regex }

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
