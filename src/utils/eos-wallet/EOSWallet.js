import { Api, JsonRpc } from "eosjs";

import ScatterJS from "scatterjs-core";
import ScatterEOS from "scatterjs-plugin-eosjs2";
import { JsSignatureProvider } from "eosjs/dist/eosjs-jssig";
import { SIG_PROVIDERS, WALLET_EVENTS, LOGOUT_TYPES } from "./defs";
import EventManager from "../event-mgr";
import {
  getRPCUrlForNetworkInfo,
  parseStringAuthorization,
  ensureArray
} from "./helpers";

ScatterJS.plugins(new ScatterEOS());

class EOSWallet {
  constructor(networkOptions) {
    const { chainId, port, protocol, host } = networkOptions;
    this.authorizations = [];
    this.sigProviderType = SIG_PROVIDERS.NONE;
    this.transactFunc = null;
    this.eventManager = new EventManager();
    if (networkOptions) {
      this.initNetwork({ chainId, port, protocol, host });
    }
  }

  logout(logoutType = LOGOUT_TYPES.STANDARD) {
    if (this.sigProviderType !== SIG_PROVIDERS.NONE) {
      const oldAuths = this.authorizations,
        oldType = this.sigProviderType;
      this.authorizations = [];
      this.sigProviderType = SIG_PROVIDERS.NONE;
      this.initEmptyAPIFromNetwork();
      this.eventManager.fireEvent(WALLET_EVENTS.LOGOUT, {
        authorizations: oldAuths,
        sigProviderType: oldType,
        logoutType: logoutType
      });
    }
  }
  initEmptyAPIFromNetwork() {
    this.api = new Api({
      rpc: this.rpc
    });
    this.transactFunc = null;
  }
  initNetwork({ chainId, port, protocol, host }) {
    this.networkInfo = { chainId, port, protocol, host };
    this.logout();
    this.rpc = new JsonRpc(getRPCUrlForNetworkInfo(this.networkInfo));
    this.initEmptyAPIFromNetwork();
  }
  async loginWithPrivateKeys(privateKeys, authorizations) {
    this.logout(LOGOUT_TYPES.NEW_LOGIN);
    const cleanAuthorizations = ensureArray(authorizations).map(a =>
      parseStringAuthorization(a)
    );

    const signatureProvider = new JsSignatureProvider(ensureArray(privateKeys));

    const api = new Api({
      rpc: this.rpc,
      signatureProvider: signatureProvider,
      textDecoder: new TextDecoder(),
      textEncoder: new TextEncoder()
    });

    this.sigProviderType = SIG_PROVIDERS.PRIVATE_KEY;
    this.authorizations = cleanAuthorizations.concat([]);
    this.api = api;
    this.transactFunc = (transaction, options) =>
      this.api.transact(transaction, options);
    this.eventManager.fireEvent(WALLET_EVENTS.LOGIN, {
      authorizations: this.authorizations.concat([]),
      sigProviderType: this.sigProviderType
    });
  }
  async loginWithScatter(appName) {
    this.logout(LOGOUT_TYPES.NEW_LOGIN);
    const network = ScatterJS.Network.fromJson({
      blockchain: "eos",
      chainId: this.networkInfo.chainId,
      host: this.networkInfo.host,
      port: parseInt(this.networkInfo.port + "", 10),
      protocol: this.networkInfo.protocol
    });
    const rpc = new JsonRpc(network.fullhost());
    const connected = await ScatterJS.connect(appName, { network });
    if (!connected) {
      throw new Error("Missing Network in Scatter or Scatter!");
    }
    const eosApi = ScatterJS.eos(network, Api, { rpc });
    const id = await ScatterJS.login();
    if (!id) {
      throw new Error("No account selected for Scatter!");
    }
    const account = ScatterJS.account("eos");
    this.sigProviderType = SIG_PROVIDERS.SCATTER;
    this.authorizations = [
      {
        actor: account.name,
        permission: account.authority
      }
    ];
    this.rpc = rpc;
    this.api = eosApi;
    this.transactFunc = (transaction, options) =>
      this.api.transact(transaction, options);
    this.eventManager.fireEvent(WALLET_EVENTS.LOGIN, {
      authorizations: this.authorizations.concat([]),
      sigProviderType: this.sigProviderType
    });
  }
  isLoggedIn() {
    return (
      this.sigProviderType !== SIG_PROVIDERS.NONE && this.authorizations.length
    );
  }
  getName() {
    return this.authorizations.length ? this.authorizations[0].actor : null;
  }
  getAuthorizations() {
    return this.authorizations;
  }
  transact(transaction, options) {
    const _this = this;
    _this.eventManager.fireEvent(WALLET_EVENTS.TX_START, {inputTx: transaction, options: options});
    return this.transactFunc(transaction, options)
    .then((res)=>{
      _this.eventManager.fireEvent(WALLET_EVENTS.TX_SUCCESS, res);
      _this.eventManager.fireEvent(WALLET_EVENTS.TX_EXIT, {success: true, error: null, tx: res});
      return res;
    })
    .catch(err=>{
      _this.eventManager.fireEvent(WALLET_EVENTS.TX_ERROR, err);
      _this.eventManager.fireEvent(WALLET_EVENTS.TX_EXIT, {success: false, error: err, tx: null});
      throw err;
    })
  }
}

export { EOSWallet };
