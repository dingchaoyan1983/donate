import React from 'react';
import config from 'json-loader!../../../config.json';


const { protocol, host, paymentWidgets } = config.payOnServer;

export default class Payment extends React.Component {
  render() {
    const shopperResultUrl = `${document.location.href}`;
    return (
      <div className="jumbotron donate__payment">
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
      },
      onReady: () => this.props.restoreDonateForm() //if the payment widget avalid, resotre the checkout form
    };

    const { checkoutId } = this.props.currentTransition;
    const scriptTag = document.createElement("script");
    scriptTag.setAttribute('charset', 'utf-8');
    scriptTag.setAttribute('type', 'text/javascript');

    scriptTag.onerror = () => {
      scriptTag.remove();
      this.props.destoryPaymentForm();
      this.props.restoreDonateForm();
    }

    scriptTag.onload = function() {
      scriptTag.remove();
    }

    scriptTag.setAttribute('src', `${protocol}//${host}${paymentWidgets}.js?checkoutId=${checkoutId}`);

    document.head.appendChild(scriptTag);
  }
}
