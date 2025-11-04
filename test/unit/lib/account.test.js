const {assert, lindaGridBuilder, net} = require('../../helpers/includes')


describe('#account functional unit test', function () {

    let lindaGrid;

    before(async function () {
        this.timeout(10000);
        lindaGrid = lindaGridBuilder.createInstance(net);
        lindaGrid.setExperimental('RVg3e7ma');
    });

    after(async function () {
        this.timeout(10000);
    });


    describe('#get account by address', function () {
        this.timeout(10000);

        const addresses = [
            '4142232ff1bddd5f01c948c9a661e43308648cfeb2'
        ];

        it('should get account by address', async function () {
            for (let address of addresses) {
                const res = await lindaGrid.account.get(address, {});
                for (let account of res.data) {
                    assert.equal(account.address, address);
                }
            }
        });
    });

    describe('#get transaction by account address', function () {
        this.timeout(10000);

        const addresses = [
            '4142232ff1bddd5f01c948c9a661e43308648cfeb2'
        ];

        it('should get transaction by address', async function () {

            for (let address of addresses) {
                const res = await lindaGrid.account.getTransactions(address, {});
                for (let tx of res.data) {
                    for (let contract of tx.raw_data.contract) {
                        const ownerAddress = contract.parameter.value.owner_address;
                        const toAddress = contract.parameter.value.to_address;
                        assert.isTrue(ownerAddress === address || toAddress === address);
                    }
                }
            }
        });
    });

    describe('#get lrc20 transaction by account address', function () {
        this.timeout(10000);

        const addresses = [
            'TJQ1vgSGsUuoDQUW5fZVM4mRYqyDXSecif',
            'TM6vkdemCZaLFG6CirzgDVSkGpJKbzzbyS',
            'TJQ1vgSGsUuoDQUW5fZVM4mRYqyDXSecif'
        ];

        it('should get lrc20 transaction by address', async function () {

            for (let address of addresses) {
                const res = await lindaGrid.account.getLrc20Transactions(address, {});
                for (let tx of res.data) {
                    assert.isTrue(tx.from === address || tx.to === address);
                    assert.notEqual(tx.value, '');
                    assert.isTrue(tx.type === 'Transfer' || tx.type === 'Approval');
                    assert.isTrue(Object.keys(tx.token_info).length !== 0);
                }
            }
        });
    });

})
