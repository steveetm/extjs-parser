/**
 * Parse Ext source files, gather JS annotations, fix invalid annotations.
 */
'use strict';
let Promise = require('bluebird');
let CommentParser = require('comment-parser');
let Path = require('path');
let readFile = Promise.promisify(require('fs').readFile);
let ExtractComments = require('extract-comments');

const nameTags = ['define'];
const requireTags = ['require', 'uses'];

class FileParser {
    constructor() {
        this.names = [];
        this.requires = [];
    }


    parse(src) {
        return this.loadFile(src)
            .then(this.extractComments.bind(this))
            .then(this.parseComments.bind(this))
            .then(this.parseTags.bind(this))
    }

    /**
     * Loads a file and returns with the jsDoc comments
     *
     * @param src String
     */
    loadFile(src) {
        return readFile(Path.resolve(src))
            .then((content) => {
                return content.toString();
            });
    }

    extractComments(content) {
        let comments = ExtractComments(content.toString());

        return new Promise.map(comments, (comment) => {
            let value = comment.raw;
            if (comment.type === 'line') {
                value = `*${comment.raw}`;
            }
            return CommentParser(`/*${value}*/`)[0];

        })
            .then((comments) => {
                return comments.filter((comment) => {
                    return comment;
                });
            });
    }

    /**
     * Gathers the tags from comment block and returns with the tags
     *
     * @param {Object[]} comments Array which contains the extracted comments
     * @param {String} comments[].tags Array of tags
     * @return Promise
     */
    parseComments(comments) {
        return new Promise.reduce(comments, (ret, comment) => {
            return [...ret, ...comment.tags];
        }, []);
    }

    parseTags(tags) {
        let tagParser = require('./parseTag');
        return new Promise.each(tags, (tag) => {
            return this.parseTag(new tagParser(tag));
        });
    }

    parseTag(tag) {
        if (nameTags.includes(tag.type)) {
            this.addName(tag.name);
        }
        if (requireTags.includes(tag.type)) {
            this.addRequire(tag.name);
        }
        return Promise.resolve();
    }

    addName(name) {
        this.names.push(name);
    }

    addRequire(require) {
        this.requires.push(require);
    }

}

module.exports = FileParser;