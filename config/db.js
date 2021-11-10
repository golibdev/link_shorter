const mongoose = require('mongoose')
const config = require('config')

const connectDB = async () => {
   try {
      const conn = await mongoose.connect(config.get('mongoUri'))
      console.log(`DB connected to ${conn.connection.host}`)
   } catch (err) {
      console.log('Server error', err.message)
      process.exit()
   }
}

module.exports = connectDB