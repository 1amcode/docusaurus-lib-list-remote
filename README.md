# docusaurus-lib-list-remote

Helper library to dynamically list files in a remote GitHub repository given a list of file path filters.
It allows to list such remote files to be downloaded then using [docusaurus-plugin-remote-content](https://github.com/rdilweb/docusaurus-plugin-remote-content) docusaurus plugin.

This library was motivated by this thread: https://github.com/rdilweb/docusaurus-plugin-remote-content/issues/37.

## Usage

```javascript
// Import docusaurus-lib-list-remote
const listRemote = require('<path-to>/docusaurus-lib-list-remote')

// Define external repository
// example (for https://github.com/ethereum/EIPs/tree/master/):
//   listRemote.createRepo('ethereum', 'EIPs', 'master')
const repo = listRemote.createRepo(
  '<repository-organization>', 
  '<repository-name>', 
  '<branch-name-or-tree-sha>'
)

// Use within docusaurus-plugin-remote-content
module.exports = {
  // ...
  plugins: [
    [
      "docusaurus-plugin-remote-content",
      {
        name: "remote-docs",
        id: "remoteDocs",
        outDir: "docs/remote-docs",

        // helper function to reduce duplication
        // (as sourceBaseUrl can be built with information passed to `repo`)
        sourceBaseUrl: listRemote.buildRepoRawBaseUrl(repo),
        
        // main usage: list remote files from the repo for a given list of path filters
        // and optionally the second list of filters for files to be excluded
        documents: listRemote.listDocuments(
          repo, 
          ['<path-include-filters>'],
          ['<path-exclude-filters>']
        )

        // example:
        // listRemote.listDocuments(
        //   repo, 
        //   ['EIPS/eip-90*.md', 'LICENSE.md'], 
        //   ['EIPS/eip-908.md']
        // )
      }
    ]
  ]
}
```

For now, in order to use this library copy [docusaurus-lib-list-remote.js](docusaurus-lib-list-remote.js) file into your project.
Also, add manually dependencies as in https://github.com/1amcode/docusaurus-lib-list-remote/blob/main/package.json#L8.

Path files filtering is performed using [minimatch](https://www.npmjs.com/package/minimatch).
You can also refer to local tests for sample filters [tests/docusaurus-lib-list-remote.test.js](https://github.com/1amcode/docusaurus-lib-list-remote/blob/50f50ed38876555d360d01bd86a31df55af8fad4/tests/docusaurus-lib-list-remote.test.js#L83).


### Working example

A working example of the library usage togerther with [docusaurus-plugin-remote-content](https://github.com/rdilweb/docusaurus-plugin-remote-content) can be found under [testsite](testsite/). In particular, the library is used in [testsite/docusaurus.config.js](testsite/docusaurus.config.js).

## Development

```
# Installation
yarn install

# Run tests
yarn test
```

Internally it uses:
- [octokit](https://www.npmjs.com/package/octokit) to pull GitHub repository tree
- [minimatch](https://www.npmjs.com/package/minimatch) for file paths filtering
