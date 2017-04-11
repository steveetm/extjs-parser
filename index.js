'use strict';
/**
 * Created by steveetm on 2017. 04. 08..
 */

class extParser {
    constructor(options) {
        let dirParser = require('./lib/parseDir');
        let Promise = require('bluebird');
        let parseDir = new dirParser(options)
        return parseDir.parse().then(() => {
            return Promise.resolve(parseDir.classMap);
        });
    }
}

module.exports = extParser;