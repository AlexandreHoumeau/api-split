const router = require('express').Router();
const verifyToken = require('../verifyToken');
router.get('/', verifyToken,async (req, res) => {
  res.json({
    post: {
      title: 'my first post',
      description: 'random data from post'
    }
  })
})

module.exports = router;