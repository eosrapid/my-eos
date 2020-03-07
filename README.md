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
<link href="https://unpkg.com/my-eos@0.0.5/dist/my-eos.css" rel="stylesheet" />
```

#### Add this to the body of your html before all other scripts
```html
<script type="text/javascript" src="https://unpkg.com/my-eos@0.0.5/dist/my-eos.umd.js"></script>
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
const authorization = myEos.getWallet().getAuthorizations()[0];
console.log("Your are logged in as "+authorization.actor+"@"+authorization.permission);

const txObject = {
  actions: [{
    account: 'eosio.token',
    name: 'transfer',
    authorization: [{
      actor: authorization.actor,
      permission: authorization.permission,
    }],
    data: {
      from: authorization.actor,
      to: 'eosrapidprod',
      quantity: '0.0001 EOS',
      memo: 'hello',
    },
  }]
};
const txResult = await myEos.transact(txObject, {
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
const authorization = myEos.getWallet().getAuthorizations()[0];
console.log("Your are logged in as "+authorization.actor+"@"+authorization.permission);

const txObject = {
  actions: [{
    account: 'eosio.token',
    name: 'transfer',
    authorization: [{
      actor: authorization.actor,
      permission: authorization.permission,
    }],
    data: {
      from: authorization.actor,
      to: 'lioninjungle',
      quantity: '0.0001 EOS',
      memo: 'hello',
    },
  }]
};
const txResult = await myEos.transact(txObject, {
  blocksBehind: 3,
  expireSeconds: 30,
});

console.log("Transaction Result: ", txResult);
```



## Usage (Jungle Test Net, full html file)
```html
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width">
  <title>MyEOS Jungle Test Net Example</title>
  <link href="https://unpkg.com/my-eos@0.0.5/dist/my-eos.css" rel="stylesheet" />
</head>
<body>
<script type="text/javascript" src="https://unpkg.com/my-eos@0.0.5/dist/my-eos.umd.js"></script>
<script type="text/javascript">
const myEos = new MyEOS({
  network: {
    chainId: 'e70aaab8997e1dfce58fbfac80cbbb8fecec7b99cf982a9444273cbc64c41473',
    host: 'api.jungle.alohaeos.com',
    port: 443,
    protocol: 'https'
  },
  scatterAppName: "Your app name here"
});

const loginResponse = myEos.login().then(()=>{
  const authorization = myEos.getWallet().getAuthorizations()[0];
  console.log("Your are logged in as "+authorization.actor+"@"+authorization.permission);

  const txObject = {
    actions: [{
      account: 'eosio.token',
      name: 'transfer',
      authorization: [{
        actor: authorization.actor,
        permission: authorization.permission,
      }],
      data: {
        from: authorization.actor,
        to: 'lioninjungle',
        quantity: '0.0001 EOS',
        memo: 'hello',
      },
    }]
  };
  return myEos.transact(txObject, {
    blocksBehind: 3,
    expireSeconds: 30,
  });
})
.then((txResult)=>{
  console.log("Transaction Result: ", txResult);
})
.catch((error)=>{
  console.error("ERROR: ", error);
});
</script>
</body>
</html>
```

# TODO:
- Finish Documentation!
- Finish Todo List!