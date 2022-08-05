const dbService = require('../../services/db.service')
const logger = require('../../services/logger.service')
const ObjectId = require('mongodb').ObjectId
const utilService = require('../../services/util.service')

module.exports = {
  remove,
  query,
  getCommentsByPostId,
  add,
  update,
}

async function query(filterBy) {
  try {
    // const criteria = _buildCriteria(filterBy)
    const criteria = {}

    const collection = await dbService.getCollection('comment')
    var comments = await collection.find(criteria).toArray()
    return comments
  } catch (err) {
    logger.error('cannot find comments', err)
    throw err
  }
}

async function getCommentsByPostId(postId) {
  try {
    const collection = await dbService.getCollection('comment')
    const comments = await collection
      .find({ postId: ObjectId(postId) })
      .toArray()

    console.log(comments)
    return comments
  } catch (err) {
    logger.error(`while finding comments postId: ${postId}`, err)
    throw err
  }
}

async function remove(commentId) {
  try {
    const collection = await dbService.getCollection('comment')
    await collection.deleteOne({ _id: ObjectId(commentId) })
    return commentId
  } catch (err) {
    logger.error(`cannot remove comments ${commentId}`, err)
    throw err
  }
}

async function add(comment) {
  const { txt, postId, userId } = comment
  try {
    const commentToAdd = {
      userId: ObjectId(userId),
      postId: ObjectId(postId),
      txt,
      reactions: [],
      createdAt: new Date().getTime(),
    }

    const collection = await dbService.getCollection('comment')
    await collection.insertOne(commentToAdd)
    return commentToAdd
  } catch (err) {
    logger.error('cannot insert comments', err)
    throw err
  }
}

async function update(comments) {
  try {
    var id = ObjectId(comments._id)
    delete comments._id
    const collection = await dbService.getCollection('comment')
    await collection.updateOne({ _id: id }, { $set: { ...comments } })
    return comments
  } catch (err) {
    logger.error(`cannot update comments ${comments._id}`, err)
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
