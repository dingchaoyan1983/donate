import React from 'react';

export default class Payment extends React.Component {
  render() {
    const shopperResultUrl = `${document.location.href}`;
    return (
      <div className="container donate__payment">
        <form action={shopperResultUrl} className="paymentWidgets">VISA MASTER AMEX</form>
      </div>
      );
  }

  componentDidMount() {
    this.generatePaymentWidgets();
  }

  generatePaymentWidgets() {
    window.wpwlOptions = {
      style: "plain",
      useSummaryPage: true,
      onSaveTransactionData: (data) => {
        this.props.paymentSuccess({
          ...this.props.currentTransition,
          buildNumber: data.buildNumber,
          timestamp: data.timestamp,
          ndc: data.ndc
        });
      }
    };

    const { checkoutId } = this.props.currentTransition;
    const scriptTag = document.createElement("script");
    scriptTag.setAttribute('charset', 'utf-8');
    scriptTag.setAttribute('type', 'text/javascript');

    scriptTag.onerror = () => {
      scriptTag.remove();
      this.props.destoryPaymentForm();
    }

    scriptTag.onload = function() {
      scriptTag.remove();
    }

    scriptTag.setAttribute('src', `https://test.oppwa.com/v1/paymentWidgets.js?checkoutId=${checkoutId}`);

    document.head.appendChild(scriptTag);
  }
}
