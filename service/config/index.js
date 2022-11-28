
const auth = require('./auth')
const config = {
  jwtSecretKey: 'recordWork',
  expiresIn: '10h',
  algorithms: ["HS256"],
  path: auth
}

module.exports = config