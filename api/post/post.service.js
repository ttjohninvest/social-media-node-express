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
    // const criteria = _buildCriteria(filterBy)
    const criteria = {}

    const collection = await dbService.getCollection('post')
    var posts = await collection.find(criteria).toArray()
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
  try {
    const collection = await dbService.getCollection('post')
    const addedPost = await collection.insertOne(post)
    return addedPost
  } catch (err) {
    logger.error('cannot insert posts', err)
    throw err
  }
}

async function update(posts) {
  try {
    var id = ObjectId(posts._id)
    delete posts._id
    const collection = await dbService.getCollection('post')
    console.log({ collection })
    await collection.updateOne({ _id: id }, { $set: { ...posts } })
    return posts
  } catch (err) {
    logger.error(`cannot update posts ${posts._id}`, err)
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
