const listRemote = require("../docusaurus-lib-list-remote.js")

// https://github.com/1amcode/1amcode/tree/repo1
const repo1 = listRemote.createRepo('1amcode', '1amcode', 'repo1')

// https://github.com/1amcode/1amcode/tree/repo2
const repo2 = listRemote.createRepo('1amcode', '1amcode', 'repo2')

// https://github.com/ethereum/EIPs/tree/master/
const ethereumEIPsRepo = listRemote.createRepo('ethereum', 'EIPs', 'master')

module.exports = {
    title: "Testsite for docusaurus-lib-list-remote",
    tagline: "The tagline of my site",
    url: "https://your-docusaurus-test-site.com",
    baseUrl: "/",
    onBrokenLinks: "throw",
    onBrokenMarkdownLinks: "warn",
    favicon: "img/favicon.ico",
    organizationName: "1amcode",
    projectName: "docusaurus-lib-list-remote-testsite",
    themeConfig: {
        navbar: {
            title: "My Site",
            logo: {
                alt: "My Site Logo",
                src: "img/logo.svg",
            },
            items: [
                {
                    to: "docs/",
                    activeBasePath: "docs",
                    label: "Docs",
                    position: "left",
                },
                { to: "blog", label: "Blog", position: "left" },
                {
                    href: "https://github.com/facebook/docusaurus",
                    label: "GitHub",
                    position: "right",
                },
            ],
        },
        footer: {
            style: "dark",
            links: [
                {
                    title: "Docs",
                    items: [
                        {
                            label: "Style Guide",
                            to: "docs/",
                        },
                        {
                            label: "Second Doc",
                            to: "docs/doc2/",
                        },
                    ],
                },
                {
                    title: "More",
                    items: [
                        {
                            label: "Blog",
                            to: "blog",
                        },
                    ],
                },
            ],
            copyright: `Copyright ?? ${new Date().getFullYear()} My Project, Inc. Built with Docusaurus.`,
        },
    },
    presets: [
        [
            "@docusaurus/preset-classic",
            {
                docs: {
                    sidebarPath: require.resolve("./sidebars.js"),
                    // Please change this to your repo.
                    editUrl:
                        "https://github.com/facebook/docusaurus/edit/master/website/",
                },
                blog: {
                    showReadingTime: true,
                    // Please change this to your repo.
                    editUrl:
                        "https://github.com/facebook/docusaurus/edit/master/website/blog/",
                },
                theme: {
                    customCss: require.resolve("./src/css/custom.css"),
                },
            },
        ],
    ],
    plugins: [
        [
            "docusaurus-plugin-remote-content",
            {
                name: "repo1-docs",
                id: "repo1Docs",
                outDir: "docs/repo1-docs",
                sourceBaseUrl: listRemote.buildRepoRawBaseUrl(repo1),
                documents: listRemote.listDocuments(
                    repo1,
                    [
                        'docs/**/*.md',
                        'docs/i-do-not-exist-but-it-is-just-ignored.md',
                    ]
                )
            },
        ],
        [
            "docusaurus-plugin-remote-content",
            {
                name: "repo2-docs",
                id: "repo2Docs",
                outDir: "docs/repo2-docs",
                sourceBaseUrl: listRemote.buildRepoRawBaseUrl(repo2),
                documents: listRemote.listDocuments(
                    repo2,
                    [
                        'docs/folder21/*.md',
                        'docs/folder22/doc2*',
                    ],
                    [
                        'docs/folder21/doc2b.md'
                    ]
                )
            },
        ],
        [
            "docusaurus-plugin-remote-content",
            {
                name: "eth-docs",
                id: "ethDocs",
                outDir: "docs/eth-docs",
                sourceBaseUrl: listRemote.buildRepoRawBaseUrl(ethereumEIPsRepo),
                documents: listRemote.listDocuments(
                    ethereumEIPsRepo,
                    [
                        'EIPS/eip-90*.md',
                        'LICENSE.md',
                        'EIPS/eip-86.md'
                    ],
                    [
                        'EIPS/eip-908.md'   
                    ]
                )
            },
        ],
    ],
}
