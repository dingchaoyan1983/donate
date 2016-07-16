import express from 'express';
import checkoutService from '../service/checkout';

const router = express.Router();

router.get('/checkout', function (req, res, next){
  const amount = req.param('amount');
  const currency = req.param('currency');

  checkoutService(amount, currency, (json) => {
    res.json(json);
  });
});

export default router;
