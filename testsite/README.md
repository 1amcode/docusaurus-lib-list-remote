# Website

This site showcases the usage of [docusaurus-plugin-remote-content](https://github.com/rdilweb/docusaurus-plugin-remote-content) with the ability to dynamically fetch remote files.

_TODO_

https://github.com/1amcode/1amcode/tree/repo1

https://github.com/1amcode/1amcode/tree/repo2

https://github.com/ethereum/EIPs/tree/master/


Spec: [https://gist.github.com/galligan/3ea08b81ab534b47628b13f5709fd6da](https://gist.github.com/galligan/3ea08b81ab534b47628b13f5709fd6da)

## Installation

```console
yarn install
```

## Local Development

```console
yarn testsite:start
```

or use helper:
```console
./run-start.sh
```

This command starts a local development server and open up a browser window. Most changes are reflected live without having to restart the server.

## Build

```console
yarn testsite:build
```

This command generates static content into the `build` directory and can be served using any static contents hosting service.

Helper for `build` and `serve` locally:
```console
./run-build.sh
```

### Example:
`docs/eth-docs/EIPS/eip-86` e.g. locally http://localhost:3000/docs/eth-docs/EIPS/eip-86

# Note

Test site was copied from [rdilweb/docusaurus-plugin-remote-content > testsite](https://github.com/rdilweb/docusaurus-plugin-remote-content/tree/main/testsite).

This website is built using [Docusaurus 2](https://v2.docusaurus.io/).
