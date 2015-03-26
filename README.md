# Webpack Isomorphic Module Splitter

Allows you to have two JavaScript modules where one is targeting the server and
the other is targeting the client. While allowing downstream dependents to not
even be aware there is a split.

Given the two files `script.js` and `script.client.js` this plugin will favor
`script.client.js` when applied.

## Usage

In you webpack config:

```
var IsomorphicSplitPlugin = require('webpack-isomorphic-split-plugin');

module.exports = {
  ...
  plugins: [
    new IsomorphicSplitPlugin('.client')
  ]
};
```
