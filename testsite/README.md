# Website

This site showcases the usage of [docusaurus-plugin-remote-content](https://github.com/rdilweb/docusaurus-plugin-remote-content) with the ability to dynamically fetch remote files using (docusaurus-lib-list-remote)[https://github.com/1amcode/docusaurus-lib-list-remote].

It pulls content from the following external repositories:
- https://github.com/ethereum/EIPs/tree/master
- https://github.com/1amcode/1amcode/tree/repo1
- https://github.com/1amcode/1amcode/tree/repo2

See more in [docusaurus.config.js](./docusaurus.config.js).

Spec: [https://gist.github.com/galligan/3ea08b81ab534b47628b13f5709fd6da](https://gist.github.com/galligan/3ea08b81ab534b47628b13f5709fd6da)

## Running locally

```console
# installation
yarn install

# start locally
yarn testsite:start
```

When it's running locally, navigate to `docs/eth-docs/EIPS/eip-900` under http://localhost:3000/docs/eth-docs/EIPS/eip-900 to see the content fetched from https://github.com/ethereum/EIPs/blob/master/EIPS/eip-900.md which comes from:
```javascript
{
  // ...
  documents: listRemote.listDocuments(
    ethereumEIPsRepo,
    ['EIPS/eip-90*.md', 'LICENSE.md', 'EIPS/eip-86.md'],
    ['EIPS/eip-908.md']
  )
}
```

## Build

```console
yarn testsite:build
```

This command generates static content into the `build` directory and can be served using any static contents hosting service.

# Note

Test site was originally copied from [rdilweb/docusaurus-plugin-remote-content > testsite](https://github.com/rdilweb/docusaurus-plugin-remote-content/tree/main/testsite).

This website is built using [Docusaurus 2](https://v2.docusaurus.io/).
