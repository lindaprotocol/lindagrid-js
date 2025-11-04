import Account from 'lib/core/Account';
import Asset from 'lib/core/Asset';
import Block from 'lib/core/Block';
import Contract from 'lib/core/Contract';
import Transaction from 'lib/core/Transaction';
import LindaWebPlugin from 'lib/plugins/LindaWebPlugin';
import APIClient from 'lib/apis/APIClient';
import validator from 'utils/Validator';
import injectpromise from 'injectpromise';

let utils;
let experimental;

export default class LindaGrid {

    constructor(lindaWeb = false) {
        if (!lindaWeb)
            throw new Error('Expected instance of LindaWeb');

        this.lindaWeb = lindaWeb;
        this.utils = utils = lindaWeb.utils
        this.account = new Account(this);
        this.asset = new Asset(this);
        this.block = new Block(this);
        this.contract = new Contract(this);
        this.transaction = new Transaction(this);
        this.apiClient = new APIClient(this);
        this.validator = new validator(this);
        this.injectPromise = injectpromise(this);

        this.experimental = undefined;
    }

    setExperimental(code) {
        this.experimental = code;
    }

    pluginInterface(options) {
        if (options.experimental) {
            experimental = options.experimental
        }
        const lindaWebPlugin = new LindaWebPlugin(this);
        lindaWebPlugin.setExperimental(options.experimental);
        return {
            requires: '^2.2.4',
            components: {
                lind: {
                    getTransactionsRelated: lindaWebPlugin.getTransactions
                }
            }
        }
    }

    nextPage(data, callback) {

        if (!callback)
            return this.injectPromise(this.nextPage, data);

        this.validator.validatePageData(data);

        if (typeof data === 'string') {
            return this.apiClient.get(data, {}, callback);
        } else if (typeof data === 'object') {
            return this.apiClient.get(data.meta.links.next, {}, callback);
        }
    }
}
