const logger = require('../../services/logger.service')
const commentService = require('./comment.service')

module.exports = {
  addComment,
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
