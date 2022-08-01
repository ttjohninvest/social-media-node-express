const logger = require('../../services/logger.service')
const PostService = require('./Post.service')

module.exports = {
  getPosts,
  getPostById,
  addPost,
  updatePost,
  removePost,
}

// LIST
async function getPosts(req, res) {
  try {
    const filterBy = req.query
    const Posts = await PostService.query(filterBy)
    res.json(Posts)
  } catch (err) {
    logger.error('Failed to get Posts', err)
    res.status(500).send({ err: 'Failed to get Posts' })
  }
}

// READ
async function getPostById(req, res) {
  try {
    const { id } = req.params
    const Post = await PostService.getById(id)
    res.json(Post)
  } catch (err) {
    logger.error('Failed to get Post', err)
    res.status(500).send({ err: 'Failed to get Post' })
  }
}

// CREATE
async function addPost(req, res) {
  try {
    const Post = req.body
    const addedPost = await PostService.add(Post)
    res.json(addedPost)
  } catch (err) {
    logger.error('Failed to add Post', err)
    res.status(500).send({ err: 'Failed to add Post' })
  }
}

// UPDATE
async function updatePost(req, res) {
  try {
    const Post = req.body
    const updatedPost = await PostService.update(Post)
    res.json(updatedPost)
  } catch (err) {
    logger.error('Failed to update Post', err)
    res.status(500).send({ err: 'Failed to update Post' })
  }
}

// DELETE
async function removePost(req, res) {
  try {
    const { id } = req.params
    const removedId = await PostService.remove(id)
    res.send(removedId)
  } catch (err) {
    logger.error('Failed to remove Post', err)
    res.status(500).send({ err: 'Failed to remove Post' })
  }
}
