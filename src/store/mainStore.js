import createStore from "redux-zero";
const initialState = {
  modalOpen: false,
  coreInstance: null,
  modalActionId: "",
  modalId: "",
  debugText: "",
  scatterAppName: "MyEOS Widget Demo",
  anchorAppName: "myeoswidget",
  myEosTitle: "myEOS",
}
const store = createStore(initialState);

export default store;