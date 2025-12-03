const LindaWeb = require('lindaweb');
const LindaGrid = require('../setup/LindaGrid');
const {SHASTA, LOCAL, NET} = require('./config');

const createInstance = net => {
    let node;
    switch (net) {
        case 'shasta':
            node = SHASTA;
            break;
        case 'local':
            node = LOCAL;
            break;
        default:
            throw new Error('has to choose net in config.js');
    };

    let lindaWeb = new LindaWeb({
        fullHost: node.HOST,
        privateKey: node.PRIVATE_KEY
    });
    return new LindaGrid(lindaWeb);
}

let instance;

const getInstance = net => {
    if (!instance) {
        instance = createInstance(net);
    }
    return instance;
};

const getTestAccounts = async (block) => {
    const accounts = {
        b58: [],
        hex: [],
        pks: []
    }
    const lindaGrid = createInstance(NET);
    const lindaWeb = lindaGrid.lindaWeb;
    const accountsJson = await lindaWeb.fullNode.request('/admin/accounts-json');
    accounts.pks = accountsJson.privateKeys;
    for (let i = 0; i < accounts.pks.length; i++) {
        let addr = lindaWeb.address.fromPrivateKey(accounts.pks[i]);
        accounts.b58.push(addr);
        accounts.hex.push(lindaWeb.address.toHex(addr));
    }
    return Promise.resolve(accounts);
}

module.exports = {
    createInstance,
    getInstance,
    getTestAccounts,
    LindaGrid
};

