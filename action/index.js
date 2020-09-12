const { Octokit } = require('@octokit/action');
const octokit = new Octokit();
const [ owner, repo ] = process.env.GITHUB_REPOSITORY.split('/');
(async () => {
  const issues = await octokit.issues.listForRepo({
    owner,
    repo,
    sort: 'created',
    state: 'open'
  }
  );
  console.log(issues.data[0]);
  const json = JSON.parse(issues.data[0]);
})();
