# What is LindaGridJS?

__[LindaGridJS - Developer Document](https://developers.linda.network/docs/lindagrid-js-intro)__

LindaGridJS is a Javascript library for utilizing LindaGrid APIs to retrieve blockchain data from the Linda network.

## Compatibility
- Version built for Node.js v6 and above
- Version built for browsers with more than 0.25% market share

LindaGridJS is also compatible with frontend frameworks such as:
- Angular
- React
- Vue

You can also ship LindaGridJS in a Chrome extension.

## Installation

__[LindaGridJS - NPM Package](https://www.npmjs.com/package/@lindacoin/lindagrid)__

#### NPM
```bash
> npm install lindagrid
```

#### Yarn
```bash
> yarn add lindagrid
```

## Build Steps

If you'd like to download and build locally, please follow the steps below.
```bash
git clone https://github.com/lindaprotocol/lindagrid-js.git
cd lindagrid-js
yarn install
yarn build
yarn test
```

## Supported APIs

LindaGridJS allows to easily access the new v1 API provided by LindaGrid.


#### `lindaGrid.account.get(accountAddress, options)`
It returns info about the account at `accountAddress`

Options:
```
onlyConfirmed       Show only the situation at latest confirmed block
                        true | false        (default false)
```
It substitutes the following JavaLinda API:
* /wallet/getaccount


#### `lindaGrid.account.getTransations(accountAddress, options)`
It returns all the transactions related to the account at `accountAddress`.

Options:
```
onlyConfirmed       Shows only confirmed.
                        true | false        default false
onlyUnconfirmed     Shows only unconfirmed.
                        true | false        default false
onlyTo              Only transaction to address.
                        true | false       default false
onlyFrom            Only transaction from address.
                        true | false        default false
limit               The requested number of transaction per page. Default 20. Max 200.
fingerprint         The fingerprint of the last transaction returned by the previous page
orderBy             Sorts the results of the query. Example:
                        orderBy=block_timestamp,desc
minBlockTimestamp       The minimum transaction timestamp        default 0
maxBlockTimestamp       The maximum transaction timestamp        default now

```
It substitutes the following JavaLinda API:
* /walletextension/gettransactionfromthis
* /walletextension/gettransactiontothis



#### `lindaGrid.asset.getAll(options)`
It returns all the assets on the LINDA platform.

Options:
```
orderBy             Sorts the results.
                    Accepted fields:
                        id
                        name
                        total_supply
                        start_time
                        end_time
limit               Number of assets per page
fingerprint         Previous fingerprint. For pagination.
```


#### `lindaGrid.asset.get(assetIdentifier, options)`
It returns an asset identified by the address of its owner, or its own ID
It substitutes the following JavaLinda API:
* /wallet/getassetissuebyaccount
* /wallet/getassetissuebyid



#### `lindaGrid.asset.getList(assetName, options)`
It returns all the asset with the name `assetName`

Options:
```
limit               The requested number of assets per page. Default 20. Max 200.
fingerprint         The fingerprint of the last asset returned by the previous page.
                    When there is a pagination, the minimum limit is set to 20.
orderBy             Sorts the results of the query.
                    Accepted fields:
                        id
                        name
                        total_supply
                        start_time
                        end_time
                    Example:
                        orderBy=start_time,desc   (starts from the most recent ICO)
                        orderBy=id,asc            (starts from the oldest)

onlyConfirmed       Shows only the situation at latest confirmed block.
                        true | false        default false

```

It substitutes the following JavaLinda API:
* /wallet/getassetissuelistbyname
* /wallet/getassetissuelist



#### `lindaGrid.block.getEvents(identifier, options)`
It returns all the events of a specific block.
The identifier can be either `latest` or a block number.



#### `lindaGrid.contract.getEvents(contractAddress, options)`
It returns all the events emitted by a smart contract.

Options:
```
onlyConfirmed       Shows only confirmed.
                        true | false                default false
onlyUnconfirmed     Shows only unconfirmed.
                        true | false                default false
eventName           The name of the event
blockNumber         The block number for which the events are required
minBlockTimestamp       The minimum block timestamp     default 0
maxBlockTimestamp       The maximum block timestamp        default now
orderBy             Sort the events. Accepted values:
                        timestamp,asc
                        timestamp,desc         (default)
limit               For pagination.                 default 20, max 200
fingerprint             The fingerprint of last event retrieved in the page
```



#### `lindaGrid.transaction.getEvents(id, options)`
It returns all the events emitted in the transaction specified by `id`


## Responses and pagination

Any API will return a response with a success property, a data array and a meta object.
For example, `await lindaGrid.asset.getAll()` will return something like

```
{
    "success": true,
    "data": [
        {
            "confirmed": true,
            "id": "1002225",
            "abbr": "DbDsgVP3GRh",
            "description": "KEYS unlock Cryptocurrency. Keys are a digital asset designed to work as medium of exchange.",
            "frozen_supply": [
                {
                    "forzen_days": 730,
                    "frozen_amount": 75926666666
                }
            ],
            "name": "KEYS",
            "num": 22778,
            "precision": 0,
            "total_supply": 227780000000,
            "lind_num": 22778,
            "url": "www.KEYS.crypto.org",
            "vote_score": 0,
            "owner_address": "3049b3dad5ef9dbab6a059fc95159efcecd5db910e",
            "start_time": 1553538720706,
            "end_time": 1553538960706
        },
        ...
    ],
    "meta": {
        "total": 2,
        "at": 1553548776704,
        "fingerprint": "8xuwf4jd2dpoSms5KzLhxY9fmCm9oJA5164Qd7T2SexRSHYCwvRAr2zJGtwJceEcGWz",
        ...
    }
}

```

As you can see, in the meta fields, there is the fingerprint you must pass to next request as an option in order to get next page.


## Usage

Install [LindaWeb](https://github.com/lindaprotocol/linda-web) if you don't have done it yet.

```bash
npm install lindaweb
```

Initialize LindaWeb and create LindaGridJS instance

```js
const LindaGrid = require('lindagrid');
const LindaWeb = require('lindaweb');

const lindaWeb = new LindaWeb({
    fullHost: 'https://api.lindagrid.io'
});

const lindaGrid = new LindaGrid(lindaWeb);

```

### Example

```js
const LindaGrid = require('lindagrid');
const LindaWeb = require('lindaweb');

const lindaWeb = new LindaWeb({
    fullHost: 'https://api.lindagrid.io'
});

const lindaGrid = new LindaGrid(lindaWeb);
lindaGrid.setExperimental('your experimental key');

async function getAccount() {
    const address = 'LYaqMeF8c8eUHqjktYVQSAoJ933YthjNA1';

    const options = {
        showAssets: true,
        onlyConfirmed: true,
    };

    // awaiting
    const account = await lindaGrid.account.get(address, options);
    console.log({account});

    // promise
    lindaGrid.account.get(address, options).then(account => {
        console.log({account});
    }).catch(err => console.error(err));

    // callback
    lindaGrid.account.get(address, options, (err, account) => {
        if (err)
            return console.error(err);

        console.log({account});
    });
}

async function getTransactions() {
    const address = 'LYaqMeF8c8eUHqjktYVQSAoJ933YthjNA1';

    const options = {
        onlyTo: true,
        onlyConfirmed: true,
        limit: 100,
        orderBy: 'timestamp,asc',
        minBlockTimestamp: Date.now() - 60000 // from a minute ago to go on
    };

    // awaiting
    const transactions = await lindaGrid.account.getTransactions(address, options);
    console.log({transactions});

    // promise
    lindaGrid.account.getTransactions(address, options).then(transactions => {
        console.log({transactions});
    }).catch(err => console.error(err));

    // callback
    lindaGrid.account.getTransactions(address, options, (err, transactions) => {
        if (err)
            return console.error(err);

        console.log({transactions});
    });
}

async function getAssets() {
    const address = 'LgznR8uovknhwX6Xm2o4kgzHhTjJ3h7UTM';
    const options = {};

    // awaiting
    const assets = await lindaGrid.asset.get(address);
    console.log({assets});

    // promise
    lindaGrid.asset.get(address, options).then(assets => {
        console.log({assets});
    }).catch(err => console.error(err));

    // callback
    lindaGrid.asset.get(address, options, (err, assets) => {
        if (err)
            return console.error(err);

        console.log({assets});
    });
}

getAccount();
getTransactions();
getAssets();
```

### Version History
__1.2.4__
* Fix injectpromise issue.

__1.2.3__
* Add getLrc20Transactions function inside account.

__1.2.2__
* Add getLrc20Tokens function inside contract.

__1.2.1__
* Update README for version history.

__1.2.0__
* Add nextPage function for pagination.

__1.1.0__
* Improve structure and add httpClient for request module.
* Add events watch function under contract.

__1.0.3__
* Add validators.

__1.0.2__
* Fix example in README using the new parameters minBlockTimestamp, maxBlockTimestamp and orderBy.

__1.0.1__
* Updates README for LindaWeb 2.3.+.

__1.0.0__
* Supports retrieving info, transactions, and assets by identifier.
* Supports retrieving events by contract address. 
* Supports retrieving transaction by ID.
* Supports retrieving events by block number.
