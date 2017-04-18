# Ext.js framework parser for extjs-loader
The `extjs-parser` interprets the specified Ext framework directory and generates a map file of class names and requires.
 The one and only purpose of this library is to scan and parse ExtJS framework or package and generate a dependency tree with a 
 classname-to-sourcefile mapping.
 

## Gotchas

Unfortunately ExtJS and DeftJS using some non-standard JSON files, which breaks webpack and standard node requires, because comments are NOT allowed in JSON.
It is a shame, but we have to live with it, so you must prepare your sources with something like this:
```bash
npm install strip-json-comments
find . -name package.json -exec sh -c 'echo "$(strip-json-comments {})" > {}' \;
```
Do not just copy-paste this command, watch out for pwd or this can hurt!

## Install
```bash
npm install --save extjs-parser
```

## Test

Run tests with 

```bash
npm test 
```

### Example 
```js
var extParser = require('./');
var parser = new extParser({
    path: '~/dev/ext-sdk-6.2.1',
    toolkit: 'modern',
    namespace: 'Ext',
    packages: ['core', 'deft','charts']
});
parser.ready().then(() => {
    console.log('Source file: ', parser.query('Ext.Boot').src);
});

```

This should print you:
 
 `Source file:  /Users/steveetm/dev/ext-sdk-6.2.1/packages/core/src/Boot.js`
 
#### Wildcard
You can also use wildcard at the end of the query.
##### Good
`Ext.util.*`

##### Bad
`Ext.*.Panel`

### Via webpack config (recommended)

**webpack.config.js**
```js
module.exports = {
  module: {
    rules: [
      {
        test: /\.js/,
        use: [ 
            {
                loader: 'extjs-loader',
                debug: true,
                nameSpace: 'MyApp',
                paths: {
                    'Deft': false,
                    'Ext.ux': 'utils/ux',
                    'Ext': {
                        use: 'ext-parser',
                        options: {
                            path: '~/ext-sdk-6.2.1',
                            toolkit: 'modern',
                            namespace: 'Ext',
                            aliasForNs: ['Deft'],
                            packages: ['core', 'deft', 'google', 'charts']
                        }
                    },
                    'Override': 'app/overrides',
                    'MyApp': 'app'
                }
            } ]
      }
    ]
  }
}
```

## Options

### `path`
Path to the ExtJS framework. Currently you have to use 6.2+

### `toolkit`

Which toolkit to use, `modern` or `classic`. `Universal` is not supported.

### `namespace`

Just specify `Ext`. Will be removed.

### `aliasForNs`

A bit hacky way to tell the loader to resolve different NS than Ext with this parser.
If you are going to use deft as sencha package, you must define `['Deft']` for this.

### `packages`

What packages to add as optional dependency. They won't be included as long as you don't use 
them in Ext.require or similar way.



<h2 align="center">Maintainers</h2>

<table>
  <tbody>
    <tr>
      <td align="center">
        <img width="150" height="150"
        src="https://avatars1.githubusercontent.com/u/1021537?v=3&s=460">
        </br>
        <a href="https://github.com/zmagyar">Zoltan Magyar</a>
      </td>
      <td align="center">
        <img width="150" height="150"
        src="https://avatars1.githubusercontent.com/u/11589541?v=3&s=460">
        </br>
        <a href="https://github.com/steveetm">Steveetm</a>
      </td>
    </tr>
  <tbody>
</table>

