import createStore from "redux-zero";
import {
  getConfigConst,
} from '@/store';
const initialState = {
  modalOpen: false,
  coreInstance: null,
  modalActionId: "",
  modalId: "",
  debugText: "",
  scatterAppName: "MyEOS Widget Demo",
}
const store = createStore(initialState);

export default store;