const { Octokit, App } = require("octokit");

const minimatch = require("minimatch")
minimatchOpts = {
  matchBase: true,
  nonegate: true, // no need to support negation i.e. only positive files matching
}

const octokit = new Octokit({
  // userAgent: "docusaurus-lib-list-remote" // TODO customize per usage?!
});

const extractFilesFromTree = (treeElements) => {
  return treeElements
    .filter(treeElement => treeElement.type === 'blob') // filter files only
    .map(treeElement => treeElement.path)
}

const createRepo = (repoOwner, repoName, primaryBranch) => {
  return {
    'owner': repoOwner,
    'name': repoName,
    'branch': primaryBranch
  }
}

const buildRepoRawBaseUrl = (repo) => {
  return `https://raw.githubusercontent.com/${repo.owner}/${repo.name}/${repo.branch}`
}

const applyFilters = (paths, filters) => {
  const unique = function (a) {
    return Array.from(new Set(a));
  }

  pathsFilteredArray = filters.map(filter => {
    return minimatch.match(paths, filter, minimatchOpts)
  })
  pathsFilteredFlattened = [].concat(...pathsFilteredArray)

  return unique(pathsFilteredFlattened)
} 

const listDocuments = (repo, filters) => { 
  return octokit.request('GET /repos/{owner}/{repo}/git/trees/{tree_sha}?recursive=1', {
    owner: repo.owner,
    repo: repo.name,
    tree_sha: repo.branch
  }).then(repoTreeResponse => {
    // TODO verify repoTreeResponse.status == 200 etc
    repoFilePaths = extractFilesFromTree(repoTreeResponse.data.tree)
    console.log(`\nRetrieved all file paths:\n${repoFilePaths}`)
    
    console.log(`\nApplying filters:\n${filters}`)
    filteredFilePaths = applyFilters(repoFilePaths, filters)

    console.log(`\nResulting filtered file paths:\n${filteredFilePaths}`)

    return filteredFilePaths
  })
}

module.exports = {
  createRepo,
  buildRepoRawBaseUrl,
  listDocuments,

  // NOTE exposed for tests only (use rewire? or is there any better alternative?)
  extractFilesFromTree,
  applyFilters,
};
