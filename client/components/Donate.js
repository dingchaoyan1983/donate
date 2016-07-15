import React from 'react';
import Checkout from './Checkout';
import Payment from './Payment';
import Thanks from './Thanks';

export default class Donate extends React.Component {
  constructor(props, context) {
    super(props, context);
  }

  get showPaymentForm() {
    // Get the checkoutId from currentTransition state
    const { checkoutId, showThanks } = this.props.currentTransition;
    // If checkoutId is got from server-to-server side
    // Show the payment form.

    return !showThanks && Boolean(checkoutId);
  }

  render() {
    let secondStep = null;

    if (this.showPaymentForm) {
      secondStep = <Payment {...this.props}/>;
    } else if (this.props.currentTransition.showThanks) {
      secondStep = <Thanks {...this.props}/>;
    }

    return (
      <div className="container donate__container">
        <Checkout {...this.props}/>
        { secondStep }
      </div>
    );
  }
}
