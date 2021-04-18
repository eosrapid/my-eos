import {SKIPPABLE_MODALS} from '@/utils/eos-wallet/defs';

const START_MODAL_FOR_ACTION = {
  'login': 'login',
  'sendtx': 'tx_processing',
}
const reducers = (store) => ({
  setScatterAppName(state, value) {

    return {
      ...state,
      scatterAppName: value,
    }
  },
  setAnchorAppName(state, value) {

    return {
      ...state,
      anchorAppName: value,
    }
  },
  setMyEosTitle(state, value) {
    return {
      ...state,
      myEosTitle: value,
    }
  },
  setOpenModal(state, { modalId, openModalData }) {
    if (!state.modalOpen) {
      console.warn("Modal must be open to call setOpenModal!");
      return {
        ...state,
      }
    }
    return {
      ...state,
      modalId: modalId,
      openModalData: typeof openModalData==='undefined'?null:openModalData,
    }
  },
  openModalAction(state, { actionId, coreInstance,openModalData }) {
    if (!START_MODAL_FOR_ACTION.hasOwnProperty(actionId)) {
      console.warn("No definition for action " + actionId + "!");
      return {
        ...state,
      }
    }
    if (state.modalOpen && SKIPPABLE_MODALS.indexOf(START_MODAL_FOR_ACTION[actionId])===-1) {
      console.warn("cannot open modal for action " + actionId + ", as it is already open!");
      return {
        ...state,
      }
    }
    return {
      ...state,
      modalOpen: true,
      modalActionId: actionId,
      modalId: START_MODAL_FOR_ACTION[actionId],
      openModalData: typeof openModalData==='undefined'?null:openModalData,
      coreInstance: coreInstance,
    };
  },
  closeModal(state, options) {
    if(options&&typeof options.modalId==='string'&&state.modalId!==options.modalId){
      return {
        ...state,
      }

    }
    return {
      ...state,
      modalOpen: false,
      modalId: "",
      modalActionId: "",
      openModalData: null,
      coreInstance: null,
    }
  },
});

export default reducers;