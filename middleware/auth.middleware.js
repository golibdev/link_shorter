const config = require('config')
const jwt = require('jsonwebtoken')

module.exports = (req, res, next) => {
   if (req.method === 'OPTIONS') {
      return next()
   }

   try {
      
      const token = req.headers.authorization.split(' ')[1]

      if(!token) {
         return res.status(401).json({ message: 'No authentificate' })
      }

      const decoded = jwt.verify(token, config.get('jwtSecret'))
      req.user = decoded
      next()

   } catch (err) {
      return res.status(500).json({ message: 'No authentificate' })
   }
}