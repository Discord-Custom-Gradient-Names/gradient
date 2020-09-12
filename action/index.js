const { Octokit } = require('@octokit/action');
const octokit = new Octokit();
const [ owner, repo ] = process.env.GITHUB_REPOSITORY.split('/');
const fs = require('fs').promises;
const { exec } = require('child-process-promise');
(async () => {
  const issues = await octokit.issues.listForRepo({
    owner,
    repo,
    sort: 'created',
    state: 'open'
  }
  );
  console.log(issues.data[0]);
  const data = issues.data[0];
  const { number } = data;
  const file = await fs.readFile('../database.css');
  console.log(file);
  const issuebody = JSON.parse(data.body);
  let css;
  if (issuebody.angle) {
    css = `
    /*${issuebody.username}*/
  [user_by_bdfdb*="${issuebody.userID}"],
  [data-user-id*="${issuebody.userID}"],
  [data-author-id*="${issuebody.userID}"] {
    --name-dummy-transparent: transparent; --name-dummy-1: 1;
    --name-gradient: ${issuebody.color1}, ${issuebody.color2};
    --name-gradient-angle: ${issuebody.angle};
  }
  `;
  } else {
    css = `
    /*${issuebody.username}*/
  [user_by_bdfdb*="${issuebody.userID}"],
  [data-user-id*="${issuebody.userID}"],
  [data-author-id*="${issuebody.userID}"] {
    --name-dummy-transparent: transparent; --name-dummy-1: 1;
    --name-gradient: ${issuebody.color1}, ${issuebody.color2};
  }
  `;
  }
  const newfile = `${file}\n\n\n${css}`;
  console.log(newfile);
  await fs.appendFile('../database.css', css);
  await octokit.issues.update({
    owner,
    repo,
    number,
    state: 'closed'
  });
  await exec('git add ./database.css', { cwd: '../' });
  await exec(`git commit -m Add ${issuebody.username}`, { cwd: '../' });
  await exec('git push', { cwd: '../' });
  console.log('Done!');
})();
