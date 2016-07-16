var express = require('express');
var router = express.Router();
var checkoutService  = require('../service/checkout');

router.get('/checkout', function(req, res, next) {
  var amount = req.param('amount');
  var currency = req.param('currency');

  checkoutService(amount, currency, function(json) {
    res.json(json);
  });
});

module.exports = router;
