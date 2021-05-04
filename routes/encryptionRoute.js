const express = require('express');
const router = express.Router();
const { encrypt} = require('../controllers/encryptionController')

router.use(function timeLog (req, res, next) {
  console.log('Time: ', Date.now())
  next();
})

router.get('/encrypt/:text', encrypt);

module.exports = router