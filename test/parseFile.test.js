'use strict';
require('./common.js');
const parseFile = require('../lib/parseFile');
describe('File loading', () => {
    it('should load file', () => {
        let parser = new parseFile();
        return parser.loadFile('test/structure/fileTestAll.js').should.not.be.rejected;
    });

    it('should reject when file does not exists', () => {
        let parser = new parseFile();
        return parser.loadFile('non-existing-file').should.be.rejected;
    });
});

describe('File content extract', () => {
    let files = ['fileTestAll.js', 'fileRequiresNonExisting.js'];
    files.forEach((file, idx) => {
        it(`should be ${idx + 1} comment block`, () => {
            let parser = new parseFile();
            return parser.loadFile(`test/structure/${file}`)
                .then(parser.extractComments.bind(parser))
                .then((comments) => {
                    expect(comments.length).to.be.equals(idx + 1);
                });
        });

    });
});

describe('Parse comments', () => {
    it('should return all tags', () => {
        let parser = new parseFile();
        return parser.loadFile('test/structure/fileMisleading.js')
            .then(parser.extractComments.bind(parser))
            .then(parser.parseComments.bind(parser))
            .then((result) => {
                expect(result.length).to.be.equals(2);
            });
    });
});

describe('Parse tags', () => {
    it('should find all requires', () => {
        let parser = new parseFile();
        return parser.loadFile('test/structure/fileRequiresOnly.js')
            .then(parser.extractComments.bind(parser))
            .then(parser.parseComments.bind(parser))
            .then(parser.parseTags.bind(parser))
            .then(() => {
                let mustHave = ['structure.fileB', 'structure.fileC', 'structure.fileD'];
                expect(parser.requires).to.be.deep.equals(mustHave);
            });
    });

    it('should find all define', () => {
        let parser = new parseFile();
        return parser.loadFile('test/structure/fileDefineOnly.js')
            .then(parser.extractComments.bind(parser))
            .then(parser.parseComments.bind(parser))
            .then(parser.parseTags.bind(parser))
            .then(() => {
                let mustHave = ['structure.fileD', 'structure.fileDAlias'];
                expect(parser.names).to.be.deep.equals(mustHave);
            });
    });
});