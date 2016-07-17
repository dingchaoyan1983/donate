import express from 'express';
import checkoutService from '../service/checkout';

const router = express.Router();

router.get('/checkout', function (req, res, next){
  const amount = req.param('amount');
  const currency = req.param('currency');

  checkoutService(amount, currency, (json) => {
    if (json.result.code === '000.200.100') {
      res.json(json);
    } else {
      res.status(500).send({ error: 'checkout failed!' });
    }
  });
});

export default router;
