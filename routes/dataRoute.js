// Express Router
const express = require('express');
const router = express.Router();
const { list } = require('../controllers/dataController')

router.use(function timeLog (req, res, next) {
  console.log('Time: ', Date.now())
  next();
})

router.get('/list', list);

module.exports = router