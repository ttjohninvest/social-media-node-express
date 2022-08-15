const logger = require('../../services/logger.service')
const commentService = require('./comment.service')

module.exports = {
  addComment,
  updateComment,
}

// CREATE
async function addComment(req, res) {
  try {
    const comment = req.body
    const addedComment = await commentService.add(comment)
    res.json(addedComment)
  } catch (err) {
    logger.error('comment.controller - Failed to add comment', err)
    res.status(500).send({ err: 'Failed to add comment' })
  }
}

// UPDATE
async function updateComment(req, res) {
  try {
    const comment = req.body
    // console.log(comment)
    const updatedComment = await commentService.update(comment)
    res.json(updatedComment)
  } catch (err) {
    logger.error('comment.controller - Failed to update comment', err)
    res.status(500).send({ err: 'Failed to update comment' })
  }
}
