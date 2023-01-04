// figure out what set of credentials to return
// if - we are in production - return the prod set of keys
// else - we are in development - return the dev keys

let config = require('./prod')
// let config =
//   process.env.NODE_ENV === 'production' ? require('./prod') : require('./dev')

module.exports = config
