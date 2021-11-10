const { Router } = require('express')
const bcrypt = require('bcryptjs')
const config = require('config')
const jwt = require('jsonwebtoken')
const { check, validationResult } = require('express-validator')
const User = require('../models/userModel')
const router = Router()

// /api/auth/register
router.post(
   '/register', 
   [
      check('email', 'Email error').isEmail(),
      check('password', 'The password must be at least 6 characters long').isLength({ min: 6 })
   ],
   async (req, res) => {
   try {
      const errors = validationResult(req)

      if(!errors.isEmpty()) {
         return res.status(400).json({
            errors: errors.array(),
            message: 'An error occurred during the registration process'
         })
      }
      const { email, password } = req.body

      const candidate = await User.findOne({ email })

      if(candidate) {
         return res.status(400).json({ message: 'The user is already registered' })
      }

      const hashedPassword = await bcrypt.hash(password, 10)

      const user = new User({ email, password: hashedPassword })

      await user.save()

      res.status(201).json({ message: 'User created' })

   } catch (err) {
      res.status(500).json({ message: err.message })
   }
})

// /api/auth/login
router.post(
   '/login',
   [
      check('email', 'Email error').normalizeEmail().isEmail(),
      check('password', 'Enter the password').exists()
   ], 
   async (req, res) => {
   try {
   
      const errors = validationResult(req)

      if(!errors.isEmpty()) {
         return res.status(400).json({
            errors: errors.array(),
            message: 'An error occurred during the login process'
         })
      }
      
      const {email, password} = req.body

      const user = await User.findOne({ email })

      if(!user) {
         return res.status(400).json({ message: 'User not found' })
      }

      const isMatch = await bcrypt.compare(password, user.password)

      if(!isMatch) {
         return res.status(400).json({ message: 'Password error, try again' })
      }

      const token = jwt.sign(
         { userId: user.id },
         config.get('jwtSecret'),
         { expiresIn: '1h' }
      )

      res.status(200).json({ token, userId: user.id })

   } catch (err) {
      res.status(500).json({ message: err.message })
   }
})

module.exports = router