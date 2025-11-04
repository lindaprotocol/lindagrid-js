import Base from '../core/Base';

let utils;
let account;

export default class LindaWebPlugin extends Base {

    constructor(lindaGrid) {
        super(lindaGrid);
        utils = this.utils;
        account = this.lindaGrid.account;
    }

    setExperimental(experimental) {
        this.lindaGrid.setExperimental(experimental);
    }

    async getTransactions(address = this.lindaWeb.defaultAddress.hex, direction = 'all', limit = 20, offset = 0, callback = false) {

        if (utils.isFunction(offset)) {
            callback = offset;
        }

        if (utils.isFunction(limit)) {
            callback = limit;
            limit = 20;
        }

        if (utils.isFunction(direction)) {
            callback = direction;
            direction = 'all';
        }

        if (utils.isFunction(address)) {
            callback = address;
            address = this.lindaWeb.defaultAddress.hex;
        }

        const options = {
            limit,
            only_data_and_fingerprint: true
        }
        if (direction === 'to') {
            options.only_to = true
        } else if (direction === 'from') {
            options.only_from = true
        }
        return account.getTransactions(address, options, callback)
    }

}
