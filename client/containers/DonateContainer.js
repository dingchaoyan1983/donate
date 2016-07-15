import { connect } from 'react-redux';
import Donate from '../components/Donate';

import { fetchCheckoutId, destoryPaymentForm, paymentSuccess } from '../reducers/currentTransition';


const mapStateToProps = (state) => ({
  transitions: state.transitions,
  currentTransition: state.currentTransition
});

const mapActionCreators = {
  fetchCheckoutId,
  destoryPaymentForm,
  paymentSuccess
};

export default connect(mapStateToProps, mapActionCreators)(Donate);
