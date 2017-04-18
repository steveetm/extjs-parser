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
                .then(parser.generateAST.bind(parser))
        });

    });
});

describe('Extract comments', () => {
    let testData = require('./testData.js');
    let Schema = require('./schema.js');

    describe('Block comments', () => {
        it('should return 1 comment block', () => {
            let parser = new parseFile();
            let mockData = testData.AST.comments.oneBlock.twoTags;
            return parser.extractComments(mockData)
                .then((result) => {
                    expect(result).to.be.jsonSchema(Object.assign({}, Schema.AST.comments, {minItems: 1, maxItems: 1}));
                });
        });

        it('should return 2 comment block', () => {
            let parser = new parseFile();
            let mockData = testData.AST.comments.twoBlocks.twoTags;

            return parser.extractComments(mockData)
                .then((result) => {
                    expect(result).to.be.jsonSchema(Object.assign({}, Schema.AST.comments, {minItems: 2, maxItems: 2}));
                });
        });

        it('should return 3 comment block', () => {
            let parser = new parseFile();
            let mockData = testData.AST.comments.threeBlocks.withEmptyBlock;
            return parser.extractComments(mockData)
                .then((result) => {
                    expect(result).to.be.jsonSchema(Object.assign({}, Schema.AST.comments, {minItems: 3, maxItems: 3}));
                });
        });
    });

    describe('Line comments', () => {
        it('should return 1 comment block', () => {
            let parser = new parseFile();
            let mockData = testData.AST.comments.oneLine.twoTags;
            return parser.extractComments(mockData)
                .then((result) => {
                    expect(result).to.be.jsonSchema(Object.assign({}, Schema.AST.comments, {minItems: 1, maxItems: 1}));
                });
        });

        it('should return 2 comment block', () => {
            let parser = new parseFile();
            let mockData = testData.AST.comments.twoLines.twoTags;
            return parser.extractComments(mockData)
                .then((result) => {
                    expect(result).to.be.jsonSchema(Object.assign({}, Schema.AST.comments, {minItems: 2, maxItems: 2}));
                });
        });
    });

    describe('Mixed comments', () => {
        it('block-line-emptyline should return 2 comment block', () => {
            let parser = new parseFile();
            let mockData = testData.AST.comments.mixed.withEmptyLine;
            return parser.extractComments(mockData)
                .then((result) => {
                    expect(result).to.be.jsonSchema(Object.assign({}, Schema.AST.comments, {minItems: 2, maxItems: 2}));
                });
        });

        it('should return 2 comment block', () => {
            let parser = new parseFile();
            let mockData = testData.AST.comments.mixed.withEmptyBlock;
            return parser.extractComments(mockData)
                .then((result) => {
                    expect(result).to.be.jsonSchema(Object.assign({}, Schema.AST.comments, {minItems: 2, maxItems: 2}));
                });
        });

        it('should return 3 comment block', () => {
            let parser = new parseFile();
            return parser.extractComments(testData.AST.comments.mixed.full)
                .then((result) => {
                    expect(result).to.be.jsonSchema(Object.assign({}, Schema.AST.comments, {minItems: 3, maxItems: 3}));
                });
        });
    });
});

describe('Parse tags', () => {
    it('should find all requires', () => {
        let parser = new parseFile();
        return parser.parse('test/structure/fileRequiresOnly.js')
            .then(() => {
                let mustHave = ['structure.fileB', 'structure.fileC', 'structure.fileD'];
                expect(parser.requires).to.be.deep.equals(mustHave);
            });
    });

    it('should find all define', () => {
        let parser = new parseFile();
        return parser.parse('test/structure/fileDefineOnly.js')
            .then(() => {
                let mustHave = ['structure.fileD', 'structure.fileDAlias', 'structure.fileE'];
                expect(parser.names.sort()).to.be.deep.equals(mustHave.sort());
            });
    });

    it('should find all define and requires', () => {
        let parser = new parseFile();
        return parser.parse('test/structure/fileTestAll.js')
            .then(() => {
                let mustHaveNames = ['structure.alias.file',
                    'structure.file',
                    'structure.fileClass',
                    'structure.fileE'
                ];
                let mustHaveRequires = [
                    'structure.fileA', 'structure.fileB', 'structure.fileC', 'structure.fileD'
                ];
                expect(parser.names.sort()).to.be.deep.equals(mustHaveNames.sort());
                expect(parser.requires.sort()).to.be.deep.equals(mustHaveRequires.sort());
            });
    });
});
