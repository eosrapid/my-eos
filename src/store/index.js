import { connect } from "redux-zero/react";
import { bindActions } from "redux-zero/utils";
import store from './mainStore';
import actions from './actions';
const boundActions = bindActions(actions, store);



export {
  store,
  actions,
  boundActions,
  connect,
};