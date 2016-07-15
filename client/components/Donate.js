import React from 'react';
import Checkout from './Checkout';
import Payment from './Payment';

export default class Donate extends React.Component {
  constructor(props, context) {
    super(props, context);
  }

  get showPaymentForm() {
    // Get the checkoutId from currentTransition state
    const { checkoutId } = this.props.currentTransition;
    // If checkoutId is got from server-to-server side
    // Show the payment form.
    return Boolean(checkoutId);
  }

  render() {
    let paymentForm = null;

    if (this.showPaymentForm) {
      paymentForm = <Payment {...this.props}/>
    }

    return (
      <div className="container donate__container">
        <Checkout {...this.props}/>
        { paymentForm }
      </div>
      );
  }
}
