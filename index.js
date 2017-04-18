'use strict';
/**
 * Created by steveetm on 2017. 04. 08..
 */

let Promise = require('bluebird');
class extParser {
    constructor(options) {
        this.options = options;
        this.classMap = null;
        this.classMapPromise = this.getClassMap();
    }

    getClassMap() {
        let Promise = require('bluebird');
        let dirParser = require('./lib/parseDir');
        let parseDir = new dirParser(this.options);
        return parseDir.parse().then(() => {
            this.classMapCache = parseDir.classMap;
            this.fileMapCache = parseDir.fileMap;
            return Promise.resolve(parseDir.classMap);
        });
    }

    ready() {
        return this.classMapPromise;
    }

    getClassMapCache() {
        if (this.classMapCache && this.classMapPromise.isFulfilled()) {
            return this.classMapCache;
        } else {
            throw new Error('Cannot use query while classMap is not initialized');
        }
    }

    query(className) {
        let obj = this.getClassMapCache();
        className.split('.').forEach((key) => {
            if (typeof obj === 'undefined') {
                return false;
            }
            if (key !== '*') {
                obj = obj[key];
            }

        });
        if (typeof obj === 'undefined') {
            console.log('cannot find', className);
            return {};
        }
        let res = [];
        if (obj.classProp) {
            res.push(obj.classProp);
        }

        if (className.indexOf('*') > -1) {
            res.push(...Object.keys(obj).map((key) => {
                return this.query(className.replace('*', '') + key);
            }));
        }
        if (res.length === 1) {
            return res[0];
        } else {
            return res.filter((elem) => {
                return (Array.isArray(elem) && elem.length > 0) || (!Array.isArray(elem) && elem);
            });
        }

    }
}

module.exports = extParser;