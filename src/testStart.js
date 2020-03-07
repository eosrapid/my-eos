import * as myEOSCore from '@/core';
const EOS_MAINNET_CFG = {
  chainId: 'aca376f206b8fc25a6ed44dbdc66547c36c6c33e3a119ffbeaef943642f0e906',
  host: 'api.eosrapid.com',
  port: 443,
  protocol: 'https'
};
const EOS_JUNGLE_CFG = {
  chainId: 'e70aaab8997e1dfce58fbfac80cbbb8fecec7b99cf982a9444273cbc64c41473',
  host: 'api.jungle.alohaeos.com',
  port: 443,
  protocol: 'https'
};
const myEOSInstance = myEOSCore.init({
  network: EOS_JUNGLE_CFG,
  
});
myEOSInstance.login()
  .then((res) => {
    console.log("Login Result: ", res);
    const auth = myEOSInstance.getWallet().getAuthorizations()[0];


    const tx = {
      actions: [{
        account: 'eosio.token',
        name: 'transfer',
        authorization: [{
          actor: auth.actor,
          permission: auth.permission,
        }],
        data: {
          from: auth.actor,
          to: 'lioninjungle',
          quantity: '0.0001 EOS',
          memo: 'hi',
        },
      }]
    };
    return myEOSInstance.transact(tx, {
      blocksBehind: 3,
      expireSeconds: 30,
    })
  })
  .catch(err => {
    console.error("Login Error: ", err);
  })