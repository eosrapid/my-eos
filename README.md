# MyEOS
**MyEOS** is a javascript library that makes it fast and easy to build EOS dApps. 

## Installation 

### NPM
`npm install --save my-eos`

### Yarn
`yarn add my-eos`

### HTML
#### Add this to your header:
```html
<link href="<todo add unpkg link>" rel="stylesheet" />
```

#### Add this to the body of your html before all other scripts
```html
<script type="text/javascript" src="<todo add unpkg link>"></script>
```


## Usage (mainnet)
```javascript
const myEos = new MyEOS({
  network: {
    chainId: 'aca376f206b8fc25a6ed44dbdc66547c36c6c33e3a119ffbeaef943642f0e906',
    host: 'api.eosrapid.com',
    port: 443,
    protocol: 'https'
  },
  scatterAppName: "Your app name here"
});

const loginResponse = await myEos.login();
const authorization = myEOSInstance.getWallet().getAuthorizations()[0];
console.log("Your are logged in as "+authorization.actor+"@"+authorization.permission);

const txObject = {
  actions: [{
    account: 'eosio.token',
    name: 'transfer',
    authorization: [{
      actor: auth.actor,
      permission: auth.permission,
    }],
    data: {
      from: auth.actor,
      to: 'eosrapidprod',
      quantity: '0.0001 EOS',
      memo: 'hello',
    },
  }]
};
const txResult = await myEOSInstance.transact(txObject, {
  blocksBehind: 3,
  expireSeconds: 30,
});

console.log("Transaction Result: ", txResult);
```


## Usage (Jungle Test Net)
```javascript
const myEos = new MyEOS({
  network: {
    chainId: 'e70aaab8997e1dfce58fbfac80cbbb8fecec7b99cf982a9444273cbc64c41473',
    host: 'api.jungle.alohaeos.com',
    port: 443,
    protocol: 'https'
  },
  scatterAppName: "Your app name here"
});

const loginResponse = await myEos.login();
const authorization = myEOSInstance.getWallet().getAuthorizations()[0];
console.log("Your are logged in as "+authorization.actor+"@"+authorization.permission);

const txObject = {
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
      memo: 'hello',
    },
  }]
};
const txResult = await myEOSInstance.transact(txObject, {
  blocksBehind: 3,
  expireSeconds: 30,
});

console.log("Transaction Result: ", txResult);
```

# TODO:
- Finish Documentation!
- Finish Todo List!