const logger = require('../../services/logger.service')
const commentService = require('./comment.service')

module.exports = {
  // getComments,
  getCommentsByPostId,
  addComment,
  updateComment,
  removeComment,
}

// LIST
// async function getComments(req, res) {
//   try {
//     const filterBy = req.query
//     const comments = await commentService.query(filterBy)
//     res.json(comments)
//   } catch (err) {
//     logger.error('Failed to get comments', err)
//     res.status(500).send({ err: 'Failed to get comments' })
//   }
// }

// READ
async function getCommentsByPostId(req, res) {
  try {
    const postId = req.params.id
    const comments = await commentService.getCommentsByPostId(postId)
    res.json(comments)
  } catch (err) {
    logger.error('Failed to get comment', err)
    res.status(500).send({ err: 'Failed to get comment' })
  }
}

// CREATE
async function addComment(req, res) {
  try {
    const comment = req.body
    const addedComment = await commentService.add(comment)
    res.json(addedComment)
  } catch (err) {
    logger.error('Failed to add comment', err)
    res.status(500).send({ err: 'Failed to add comment' })
  }
}

// UPDATE
async function updateComment(req, res) {
  try {
    const comment = req.body
    const updatedComment = await commentService.update(comment)
    res.json(updatedComment)
  } catch (err) {
    logger.error('Failed to update comment', err)
    res.status(500).send({ err: 'Failed to update comment' })
  }
}

// DELETE
async function removeComment(req, res) {
  try {
    const { id } = req.params
    const removedId = await commentService.remove(id)
    res.send(removedId)
  } catch (err) {
    logger.error('Failed to remove comment', err)
    res.status(500).send({ err: 'Failed to remove comment' })
  }
}
