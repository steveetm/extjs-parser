'use strict';
/**
 * Created by steveetm on 2017. 04. 08..
 */

class extParser {
    constructor(options) {
        let dirParser = require('./lib/parseDir');
        return new dirParser(options).parse().classMap;
    }
}

module.exports = extParser;