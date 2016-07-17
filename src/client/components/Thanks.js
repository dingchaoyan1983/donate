import React from 'react';

export default class Thanks extends React.Component {
  render() {
    const { donator, currency, amount, timestamp } = this.props.currentTransition;
    return (
      <div className="container donate__thanks">
        <p className="alert alert-info">
          Thank you very much, <strong>{donator}</strong>. You have donated <strong>{amount}{currency}</strong> in {timestamp}.
          Kindly remind that each hour you can donate once. Thank you for understanding.
        </p>
      </div>
    );
  }
}
