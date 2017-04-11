# Ext.js framework parser for extjs-loader
The `extjs-parser` interprets the specified Ext framework directory and generates a map file of class names and requires.


## Install
```bash
npm install --save extjs-parser
```

## Test

Run tests with 

```bash
npm test 
```

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
                    'Ext': new extjsParser({
                        toolkit: 'modern',
                        path:'~/ext/sdk/'
                        }),
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

