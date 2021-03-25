var express = require('express');
var router = express.Router();

const adminController = require('../controllers/adminController');

/* GET admin. */
router.get('/', function(req, res, next) {
  res.render('admin');
});

router.post('/auth', adminController.auth);

router.get('/logout',function(req, res, next) {
  req.session.destroy(() => {
    res.redirect('/admin');
  });
});

module.exports = router;