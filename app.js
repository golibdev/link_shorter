const express = require('express')
const path = require('path')
const config = require('config')
const connectDB = require('./config/db')

const app = express()

app.use(express.json({ extended: true }))

app.use('/api/auth', require('./routes/auth.routes'))
app.use('/api/link', require('./routes/link.routes'))
app.use('/t', require('./routes/redirect.routes'))

if(process.env.NODE_ENV === 'production') {
   app.use('/', express.static(path.join(__dirname, 'client', 'build')))

   app.get('*', (req, res) => {
      res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
   })
}

const PORT = config.get('port') || 3000

connectDB()
app.listen(PORT, () => console.log(`App has been started on started ${PORT}...`))