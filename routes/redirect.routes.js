const { Router } = require('express')
const Link = require('../models/linkModel')
const router = Router()

router.get('/:code', async (req, res) => {
   try {
      const link = await Link.findOne({ code: req.params.code })

      if (link) {
         await Link.findByIdAndUpdate(link._id, {
            $inc: {
               clickLinks: 1
            },
         }, {
            new: true
         })
         return res.redirect(link.from)
      }

      res.status(404).json({ message: 'Link not found' })
   } catch (err) {
      res.status(500).json({ message: err.message })
   }
})

module.exports = router