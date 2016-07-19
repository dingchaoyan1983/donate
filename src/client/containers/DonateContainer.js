import { connect } from 'react-redux';
import Donate from '../components/Donate';
import {
  destoryPaymentForm,
  paymentSuccess,
  restoreDonateForm,
  frozeDonateForm,
  resetDonateForm
} from '../reducers/currentTransition';

const mapStateToProps = (state) => ({
  currentTransition: state.currentTransition
});

const mapActionCreators = {
  destoryPaymentForm,
  paymentSuccess,
  restoreDonateForm,
  frozeDonateForm,
  resetDonateForm
};

export default connect(mapStateToProps, mapActionCreators)(Donate);
