'use strict';
/**
 * Parse Ext source directory.
 */
let fileParser = require('./parseFile');
let Path = require('path');
let Glob = require('glob');
let Promise = require('bluebird');
class parseDir {
    /**
     *
     *
     * @param {Object} options
     * @param {String} options.path
     * @param {String} options.toolkit
     * @param {String[]} options.packages
     *
     */
    constructor(options) {
        debugger;
        this.fileMap = {};
        this.classMap = {};
        this._path = options.path;
        console.log(this._path);
        try {
            let packageJson = require(this.getPath() + '/package.json');
            this.type = packageJson.type;
            // console.log('Package.json found', packageJson);
            this.packageJson = packageJson;
            console.log(this.packageJson);
            this.classPath = Path.normalize(packageJson.classpath.replace('${package.dir}', this.getPath()));
            //console.log(options);
            this.namespace = options.namespace || packageJson.namespace || "";
            this.requires = [...options.packages ? options.packages : [], ...packageJson.requires ? packageJson.requires : []];
        } catch (e) {
            throw new Error(e, `options.path is not an Ext framework directory`);
        }
        this.toolkit = options.toolkit;
    }

    getPath() {
        let ExpandTilde = require('expand-tilde');
        return ExpandTilde(Path.normalize(this._path));
    }

    normalizeClass(file) {
        console.log(this.namespace, file, this.classPath);
        return this.namespace + file.replace(this.classPath, '').replace(/\//g, '.').replace('.js', '');
    }

    saveClass(className, file) {
        if (this.classMap[className]) {
            console.log(`Won't redefine ${className} in ${file}`);
            return;
        }
        this.classMap[className] = this.fileMap[file];
        this.classMap[className].src = file;
    }

    parse() {
        return this.processRequires(this.requires)
            .then(this.processDir.bind(this));
    }

    processRequires(requires) {
        let path = this.classPath;
        switch (this.type) {
            case 'toolkit' :
                path += '/../../../';
                break;
            case 'code' :
                path += '/../'

        }

        return new Promise.each(requires, (req) => {
            let dirParser = new parseDir({
                path: path + '/packages/' + req,
                toolkit: 'modern',
                namespace: 'Ext'

            });
            return dirParser.parse().then(() => {
                return Object.assign(this.classMap, dirParser.classMap);
            });
        });
    }

    processDir() {

        switch (this.type) {
            case 'framework' :
                let dirParser = new parseDir({
                    path: `${this.getPath()}/${this.toolkit}/${this.toolkit}`,
                    toolkit: this.toolkit
                });
                return dirParser.parse().then(() => {
                    return Object.assign(this.classMap, dirParser.classMap);
                });
                break;
            case 'toolkit' :
                return this.processPackage();
                break;
            case 'code' :
                return this.processPackage();
                break;
        }

    }

    processPackage() {
        return new Promise((resolve, reject) => {
            Glob(this.classPath + '/**/*js', {}, (err, files) => {
                if (err) {
                    return reject(err);
                }
                console.log('fonud', files.length, 'files');
                Promise.each(files, (file) => {
                    return this.processFile(file);
                }).then(resolve);
            });
        });
    }

    processFile(file) {
        let parser = new fileParser();
        return parser.parse(file).then(() => {
            this.fileMap[file] = {
                names: parser.names,
                requires: parser.requires
            };
            parser.names.forEach((className) => {
                this.saveClass(className, file);
            });
            this.saveClass(this.normalizeClass(file), file);

        });
    }
}

module.exports = parseDir;