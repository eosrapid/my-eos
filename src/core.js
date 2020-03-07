import {EOSWallet} from '@/utils/eos-wallet/EOSWallet';
import {boundActions, store} from '@/store';
import {WALLET_EVENTS, SKIPPABLE_MODALS} from '@/utils/eos-wallet/defs';

class CoreMyEOS {
  constructor(options={}){
    this.options = options;
    this.wallet = options.network ? (new EOSWallet(options.network)) : null;
    this.login = this.login.bind(this);
    this.lastLoginReject = null;

    if(this.wallet){
      this.registerEvents();
    }
  
  }
  registerEvents(){
    this.wallet.eventManager.addListener(WALLET_EVENTS.LOGIN, ()=>{
      boundActions.setOpenModal({modalId: "login_success"});
    });
    this.wallet.eventManager.addListener(WALLET_EVENTS.TX_START, ()=>{
      boundActions.setOpenModal({modalId: "tx_processing"});
    });
    this.wallet.eventManager.addListener(WALLET_EVENTS.TX_SUCCESS, ()=>{
      boundActions.setOpenModal({modalId: "tx_success"});
    });
    this.wallet.eventManager.addListener(WALLET_EVENTS.TX_ERROR, ({error})=>{
      boundActions.setOpenModal({modalId: "tx_error", openModalData:(error&&typeof error=='object'&&error.message)?error.message:(error+"")});
    });

  }
  
  login() {
    if(store.getState().modalOpen) {
      return Promise.reject(new Error("Cannot run login while already processing another action!"));
    }
    boundActions.openModalAction({actionId: "login", coreInstance: this});
    const _this = this;
    return this.wallet.eventManager.addPromiseListener(WALLET_EVENTS.LOGIN, {}, (rFunc)=>{
      _this.lastLoginReject = rFunc;
    })
    .then(()=>{

    })
    
  }
  closeModal() {
    boundActions.closeModal();
  }
  cancelActiveAction() {

    boundActions.closeModal();
    if(typeof this.lastLoginReject==='function') {
      try{
        this.lastLoginReject(new Error("User Canceled Login!"));
      }catch(err1){}
    }
  }
  reset() {
    boundActions.closeModal();
    this.wallet.logout();
  }
  init(options) {
    this.options = options;
    if(this.wallet) {
      this.wallet.logout();
      this.wallet.initNetwork(options.network);
    }else{
      this.wallet = new EOSWallet(options.network);
      this.registerEvents();
    }
  }
  getWallet() {
    return this.wallet;
  }
  transact(transaction, options) {
    const {modalOpen, modalId} = store.getState();
    if(modalOpen&&SKIPPABLE_MODALS.indexOf(modalId)===-1) {
      return Promise.reject(new Error("Cannot run tx while already processing another action!"));
    }
    boundActions.openModalAction({actionId: "sendtx", coreInstance: this});
    return this.wallet.transact(transaction, options)
    .then(r=>{
      return r;
    })
    .catch(err=>{
      boundActions.setOpenModal({modalId: "tx_error", openModalData: (err&&typeof err=='object'&&err.message)?err.message:(err+"")})
      throw err;
    })
  }
}

export function init(options={}){
  const myEos = new CoreMyEOS(options);
  return myEos;
}