const dbService = require('../../services/db.service')
const logger = require('../../services/logger.service')
const ObjectId = require('mongodb').ObjectId
const utilService = require('../../services/util.service')

module.exports = {
  remove,
  query,
  getById,
  add,
  update,
}

async function query(filterBy) {
  try {
    const criteria = _buildCriteria(filterBy)
    // const criteria = {}

    const collection = await dbService.getCollection('post')

    var posts = await collection
      .find(criteria)
      .sort({ createdAt: -1 })
      .toArray()
    return posts
  } catch (err) {
    logger.error('cannot find posts', err)
    throw err
  }
}

async function getById(postId) {
  try {
    const collection = await dbService.getCollection('post')
    const post = collection.findOne({ _id: ObjectId(postId) })
    return post
  } catch (err) {
    logger.error(`while finding posts ${postId}`, err)
    throw err
  }
}

async function remove(postId) {
  try {
    const collection = await dbService.getCollection('post')
    await collection.deleteOne({ _id: ObjectId(postId) })
    return postId
  } catch (err) {
    logger.error(`cannot remove posts ${postId}`, err)
    throw err
  }
}

async function add(post) {
  const { body, imgBodyUrl, title, userId } = post
  try {
    const postToAdd = {
      userId: ObjectId(userId),
      title,
      body,
      reactions: [],
      createdAt: new Date().getTime(),
      imgBodyUrl,
      shares: [],
      comments: [],
    }

    const collection = await dbService.getCollection('post')
    await collection.insertOne(postToAdd)
    return postToAdd
  } catch (err) {
    logger.error('cannot insert posts', err)
    throw err
  }
}

async function update(post) {
  try {
    var id = ObjectId(post._id)
    delete post._id
    const collection = await dbService.getCollection('post')
    await collection.updateOne({ _id: id }, { $set: { ...post } })
    const addedPost = { ...post, _id: id }
    return addedPost
  } catch (err) {
    logger.error(`cannot update post ${post._id}`, err)
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
