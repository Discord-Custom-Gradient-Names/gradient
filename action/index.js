process.on('unhandledRejection', up => {
  throw up;
});
const { Octokit } = require('@octokit/action');
const octokit = new Octokit();
const [ owner, repo ] = process.env.GITHUB_REPOSITORY.split('/');
const fs = require('fs').promises;
const { exec } = require('child-process-promise');
(async () => {
  const issuenumber = await parseInt(process.env.event_number);
  console.log(issuenumber);
  const issues = await octokit.request(`GET /repos/:owner/:repo/issues/${issuenumber}`, {
    owner,
    repo
  });
  console.log(issues);
  const { data } = issues;
  console.log(data.body);
  const issuebody = await JSON.parse(unescape(issues.data.body));
  console.log(issuebody);
  let css;
  if (issuebody.angle) {
    css = `
/*${issuebody.username}*/
[user_by_bdfdb*="${issuebody.userID}"],
[data-user-id*="${issuebody.userID}"] + *,
[data-author-id*="${issuebody.userID}"],
img[src*="${issuebody.userID}"] + * {
  --name-dummy-transparent: transparent; --name-dummy-1: 1;
  --name-gradient: ${issuebody.color1}, ${issuebody.color2};
  --name-gradient-angle: ${issuebody.angle};
}
  `;
  } else {
    css = `
/*${issuebody.username}*/
[user_by_bdfdb*="${issuebody.userID}"],
[data-user-id*="${issuebody.userID}"] + *,
[data-author-id*="${issuebody.userID}"],
img[src*="${issuebody.userID}"] {
  --name-dummy-transparent: transparent; --name-dummy-1: 1;
  --name-gradient: ${issuebody.color1}, ${issuebody.color2};
}
  `;
  }
  console.log(css);
  await fs.appendFile('./database.css', css);
  await octokit.request(`PATCH /repos/:owner/:repo/issues/${issuenumber}`, {
    owner,
    repo,
    state: 'closed'
  });
  const { stdout } = await exec('git add ./database.css');
  console.log(stdout);
  const { stdout2 } = await exec(`git commit -m "Add ${issuebody.username}"`);
  console.log(stdout2);
  console.log('Done!');
})();

