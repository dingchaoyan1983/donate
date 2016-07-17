import React from 'react';
import classnames from 'classnames';

const CURRENCY_SYMBOL_MAPPDING = {
  EUR: '€',
  USD: '$'
}

export default class Checkout extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      donator: this.props.currentTransition.donator,
      currency: this.props.currentTransition.currency,
      amount: this.props.currentTransition.amount
    };

    this.onChangeDonator = this.onChangeDonator.bind(this);
    this.onChangeAmount = this.onChangeAmount.bind(this);
    this.onChangeCurrency = this.onChangeCurrency.bind(this);
    this.onDonate = this.onDonate.bind(this);
  }

  get isDonatorValid() {
    const donator = this.state.donator;
    return /^[a-zA-Z0-9\s\.]+$/.test(donator);
  }

  get isAmountValid() {
    const amount = this.state.amount;
    return /^(\d*\.\d{1,2}|\d+)$/.test(amount) && amount < 100;
  }

  get donatorErrorTips() {
    if (!this.isDonatorValid) {
      return (
        <span className="help-block">
          Donator name should not <strong>empty</strong> or contain <strong>~!@#$%^&*()</strong> symbol.
        </span>
      );
    } else {
      return null;
    }
  }

  get amountErrorTips() {
    if (!this.isAmountValid) {
      let errorString = 'Amount must be a currency number, such as 1.23';
      const currencySymbol = CURRENCY_SYMBOL_MAPPDING[this.state.currency];

      if (this.state.amount >= 100) {
        errorString = `Thank you for donate more than 100${currencySymbol}, we only allow donate less than 100${currencySymbol}.`;
      }

      return (
        <span className="help-block">
          {errorString}
        </span>
      );
    } else {
      return null;
    }
  }


  render() {
    const {donator, currency, amount} = this.state;
    const { frozeDonateForm } = this.props.currentTransition;

    return (
      <div className="form-horizontal donate__checkout">
        <div className="jumbotron clearfix">
          <div className={classnames('form-group', this.isDonatorValid ? '' : 'has-error')}>
            <label className="control-label col-sm-4" htmlFor="donate-form__donator">Donator</label>
            <div className="col-sm-8">
              <input type="text" className="form-control col-sm-8" id="donate-form__donator" placeholder="your name" value={donator} disabled = {frozeDonateForm} onChange={this.onChangeDonator} />
              {this.donatorErrorTips}
            </div>
          </div>
          <div className="form-group">
            <label className="control-label col-sm-4" htmlFor="donate-form__currency">Currency</label>
            <div className="col-sm-8">
              <select id="donate-form__currency" className="form-control" value={currency}  disabled = {frozeDonateForm}  onChange={this.onChangeCurrency}>
                <option value="EUR">€</option>
                <option value="USD">$</option>
              </select>
            </div>
          </div>
          <div className={classnames('form-group', this.isAmountValid ? '' : 'has-error')}>
            <label className="control-label col-sm-4" htmlFor="donate-form__amount">Amount</label>
            <div className="col-sm-8">
              <div className="input-group">
                <div className="input-group-addon">{CURRENCY_SYMBOL_MAPPDING[currency]}</div>
                <input type="amount" className="form-control donate-form__amount" id="donate-form__amount" placeholder="0.00" value={amount}  disabled = {this.props.currentTransition.frozeDonateForm }  onChange={this.onChangeAmount} />
              </div>
              {this.amountErrorTips}
            </div>
          </div>
          <button type="button" className="btn btn-success pull-right" onClick={this.onDonate} disabled={ !(this.isDonatorValid && this.isAmountValid) || frozeDonateForm}>Donate</button>
        </div>
      </div>
    );
  }

  componentWillReceiveProps(props) {
    this.setState({
      donator: props.currentTransition.donator,
      currency: props.currentTransition.currency,
      amount: props.currentTransition.amount
    });
  }

  onChangeDonator(event) {
    this.setState({
      donator: event.target.value
    });
  }

  onChangeAmount(event) {
    this.setState({
      amount: event.target.value
    });
  }

  onChangeCurrency(event) {
    this.setState({
      currency: event.target.value
    });
  }

  onDonate() {
    //double check whether the donate button can be clicked.
    if(this.isDonatorValid && this.isAmountValid) {
      const { donator, currency, amount } = this.state;
      this.props.showPaymentOrThanks(donator, currency, amount);
    }
  }
}
