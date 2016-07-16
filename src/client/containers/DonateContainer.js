import { connect } from 'react-redux';
import Donate from '../components/Donate';

import { showPaymentOrThanks, destoryPaymentForm, paymentSuccess } from '../reducers/currentTransition';


const mapStateToProps = (state) => ({
  currentTransition: state.currentTransition
});

const mapActionCreators = {
  showPaymentOrThanks,
  destoryPaymentForm,
  paymentSuccess
};

export default connect(mapStateToProps, mapActionCreators)(Donate);
