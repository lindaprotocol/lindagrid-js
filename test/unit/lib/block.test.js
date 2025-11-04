const {assert, lindaGridBuilder, net} = require('../../helpers/includes')


describe('#block functional unit test', function () {

    let lindaGrid;

    before(async function () {
        this.timeout(10000);
        lindaGrid = lindaGridBuilder.createInstance(net);
    });

    after(async function () {
        this.timeout(10000);
    });

    describe('#get events by block number', function () {
        this.timeout(10000);

        it('should get events in single block', async function () {
            let blockNumber = 8864287;
            const events = await lindaGrid.block.getEvents(blockNumber, {only_data_and_fingerprint: true});
            for (let event of events) {
                assert.equal(event.block_number, blockNumber);
            }
        });
    });

})
