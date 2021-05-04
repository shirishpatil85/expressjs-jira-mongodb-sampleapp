// Express Router
const express = require('express');
const router = express.Router();
const { issue, search} = require('../controllers/jiraController')

router.use(function timeLog (req, res, next) {
  console.log('Time: ', Date.now())
  next();
})

router.get('/issue/:issueId', issue);
router.get('/search/:keyword', search);

module.exports = router