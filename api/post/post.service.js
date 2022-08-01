const dbService = require('../../services/db.service')
const logger = require('../../services/logger.service')
const ObjectId = require('mongodb').ObjectId

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

    const collection = await dbService.getCollection('Post')
    var Posts = await collection.find(criteria).toArray()
    return Posts
  } catch (err) {
    logger.error('cannot find Posts', err)
    throw err
  }
}

async function getById(PostId) {
  try {
    const collection = await dbService.getCollection('Post')
    const Post = collection.findOne({ _id: ObjectId(PostId) })
    return Post
  } catch (err) {
    logger.error(`while finding Post ${PostId}`, err)
    throw err
  }
}

async function remove(PostId) {
  try {
    const collection = await dbService.getCollection('Post')
    await collection.deleteOne({ _id: ObjectId(PostId) })
    return PostId
  } catch (err) {
    logger.error(`cannot remove Post ${PostId}`, err)
    throw err
  }
}

async function add(Post) {
  try {
    const collection = await dbService.getCollection('Post')
    const addedPost = await collection.insertOne(Post)
    return addedPost
  } catch (err) {
    logger.error('cannot insert Post', err)
    throw err
  }
}

async function update(Post) {
  try {
    var id = ObjectId(Post._id)
    delete Post._id
    const collection = await dbService.getCollection('Post')
    await collection.updateOne({ _id: id }, { $set: { ...Post } })
    return Post
  } catch (err) {
    logger.error(`cannot update Post ${Post._id}`, err)
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
