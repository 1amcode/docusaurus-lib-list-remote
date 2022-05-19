const listRemote = require("../docusaurus-lib-list-remote");

test('extractFilesFromTree', () => {
  const treeElements = [
    {
      path: 'src/plugins.js',
      mode: '100644',
      type: 'blob',
      sha: '6477a3bbf13475f1b7b9e4ec2561541891f9286c',
      size: 448,
      url: 'https://api.github.com/repos/xmtp-labs/web-starter/git/blobs/6477a3bbf13475f1b7b9e4ec2561541891f9286c'
    },
    {
      path: 'src/theme',
      mode: '040000',
      type: 'tree',
      sha: '1abee92a3a0235e862df6d82e56f504c350852c5',
      url: 'https://api.github.com/repos/xmtp-labs/web-starter/git/trees/1abee92a3a0235e862df6d82e56f504c350852c5'
    },
    {
      path: 'src/theme/Footer',
      mode: '040000',
      type: 'tree',
      sha: '8c004968001b0748b09158102990bb5611c6de7f',
      url: 'https://api.github.com/repos/xmtp-labs/web-starter/git/trees/8c004968001b0748b09158102990bb5611c6de7f'
    },
    {
      path: 'src/theme/Footer/index.js',
      mode: '100644',
      type: 'blob',
      sha: 'f8b73fc271ca875df4bc62d613d447d9294f2809',
      size: 181,
      url: 'https://api.github.com/repos/xmtp-labs/web-starter/git/blobs/f8b73fc271ca875df4bc62d613d447d9294f2809'
    },
  ]

  expect(listRemote.extractFilesFromTree(treeElements)).toStrictEqual(['src/plugins.js', 'src/theme/Footer/index.js']);
});

test('applyFilters', () => {
  paths = [
    'docs/intro.md',
    'docs/tutorial-basics/_category_.json',
    'docs/tutorial-basics/congratulations.md',
    'docs/tutorial-basics/create-a-blog-post.md',
    'docs/tutorial-basics/markdown-features.mdx',
    'docs/tutorial-extras/_category_.json',
    'docs/tutorial-extras/manage-docs-versions.md',
    'docs/tutorial-extras/translate-your-site.md',
  ]
  expect(listRemote.applyFilters(paths, ['docs/intro.md'])).toStrictEqual(
    ['docs/intro.md']);
  expect(listRemote.applyFilters(paths, ['docs/intro.md', 'docs/tutorial-basics/*.json'])).toStrictEqual(
    ['docs/intro.md', 'docs/tutorial-basics/_category_.json']);
  expect(listRemote.applyFilters(paths, ['docs/intro.md', 'docs/tutorial-basics/*.md'])).toStrictEqual(
    ['docs/intro.md', 'docs/tutorial-basics/congratulations.md', 'docs/tutorial-basics/create-a-blog-post.md']);
  expect(listRemote.applyFilters(paths, ['docs/intro.md', 'docs/tutorial-basics/*.md', 'docs/tutorial-basics/congratulations.md', 'docs/tutorial-basics/create-a-blog-post.md'])).toStrictEqual(
    ['docs/intro.md', 'docs/tutorial-basics/congratulations.md', 'docs/tutorial-basics/create-a-blog-post.md']);
  expect(listRemote.applyFilters(paths, ['docs/**/*.md'])).toStrictEqual(
    ['docs/intro.md', 'docs/tutorial-basics/congratulations.md', 'docs/tutorial-basics/create-a-blog-post.md', 
     'docs/tutorial-extras/manage-docs-versions.md', 'docs/tutorial-extras/translate-your-site.md']);
});

test('dev - filter spec', () => {
  const minimatch = require("minimatch")
  minimatchOpts = {
    matchBase: true,
    nonegate: true, // no need to support negation i.e. only positive files matching
  }

  let doFilter = (paths, filter) => {
    return minimatch.match(paths, filter, minimatchOpts)
  }

  paths = [
    'docs/intro.md',
    'docs/tutorial-basics/_category_.json',
    'docs/tutorial-basics/congratulations.md',
    'docs/tutorial-basics/create-a-blog-post.md',
    'docs/tutorial-basics/markdown-features.mdx',
    'docs/tutorial-extras/_category_.json',
    'docs/tutorial-extras/manage-docs-versions.md',
    'docs/tutorial-extras/translate-your-site.md',
  ]

  // ** is only for dirs
  expect(doFilter(paths, 'docs/*.md')).toStrictEqual(['docs/intro.md']);
  expect(doFilter(paths, 'docs/**.md')).toStrictEqual(['docs/intro.md']);
  expect(doFilter(paths, 'docs/**/*.md')).toStrictEqual([
    'docs/intro.md',
    'docs/tutorial-basics/congratulations.md',
    'docs/tutorial-basics/create-a-blog-post.md',
    'docs/tutorial-extras/manage-docs-versions.md',
    'docs/tutorial-extras/translate-your-site.md',
  ]);

  // * can be used multiple times
  expect(doFilter(paths, 'docs/tutorial-*/*.m*')).toStrictEqual([
    'docs/tutorial-basics/congratulations.md',
    'docs/tutorial-basics/create-a-blog-post.md',
    'docs/tutorial-basics/markdown-features.mdx',
    'docs/tutorial-extras/manage-docs-versions.md',
    'docs/tutorial-extras/translate-your-site.md',
  ]);
});
