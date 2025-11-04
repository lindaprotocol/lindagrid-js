import LindaGrid from '../../index';
import APIClient from '../apis/APIClient';
import validator from '../../utils/Validator';
import injectpromise from 'injectpromise';

class Base {

    constructor(lindaGrid) {
        if (!lindaGrid || !(lindaGrid instanceof LindaGrid))
            throw new Error('Expected instance of LindaGrid');

        this.lindaGrid = lindaGrid;
        this.lindaWeb = lindaGrid.lindaWeb;
        this.injectPromise = injectpromise(this);
        this.apiNode = this.lindaWeb.eventServer;
        this.utils = this.lindaWeb.utils;
        this.validator = new validator(lindaGrid);
        this.APIClient = new APIClient(lindaGrid);
    }

}

export default Base
