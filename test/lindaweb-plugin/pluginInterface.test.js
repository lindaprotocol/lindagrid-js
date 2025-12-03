const LindaWeb = require('../setup/LindaWeb');
const {assert} = require('../helpers/includes');
const LindaGrid = require('../setup/LindaGrid');
const {LOCAL} = require('../helpers/config');

describe('#pluginInterface for walletextension plugin', function () {

    let lindaWeb;

    before(async function () {
        lindaWeb = new LindaWeb({
            fullHost: LOCAL.HOST
        });

        // lindaWeb.plugin.register(LindaGrid, {experimental: 'RVg3e7ma'});

    });

    describe.skip('#get transaction from this', function () {

        const address = '3042232ff1bddd5f01c948c9a661e43308648cfeb2';

        it('should substitute getTransactionsToAddress', async function () {

            const res = await lindaWeb.lind.getTransactionsToAddress(address, 5);
            assert.equal(res.length, 5);
            assert.isNotNull(res[0].txID);
        })

        it('should substitute getTransactionsFromAddress', async function () {

            const res = await lindaWeb.lind.getTransactionsFromAddress(address, 5);
            assert.equal(res.length, 5);
            assert.isNotNull(res[0].txID);
        })
    })
})
