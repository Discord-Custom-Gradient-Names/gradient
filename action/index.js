process.on('unhandledRejection', up => {
  throw up;
});
const { Octokit } = require('@octokit/action');
const octokit = new Octokit();
const [ owner, repo ] = process.env.GITHUB_REPOSITORY.split('/');
const fs = require('fs').promises;
const { exec } = require('child-process-promise');
(async () => {
  const issuenumber = process.env.event_number;
  console.log(issuenumber);
  const issues = await octokit.issues.get({
    owner,
    repo,
    issuenumber
  }
  );
  console.log(issues);
  const data = issues.data[0];
  const file = await fs.readFile('./database.css');
  console.log(file);
  console.log(data.body);
  const issuebody = await JSON.parse(unescape(issues.data[0].body));
  console.log(issuebody);
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
  await fs.appendFile('./database.css', css);
  await octokit.issues.update({
    owner,
    repo,
    issuenumber
  }, { state: 'closed' });
  const { stdout } = await exec('git add ./database.css');
  console.log(stdout);
  const { stdout2 } = await exec(`git commit -m Add ${issuebody.username}`);
  console.log(stdout2);
  const { stdout3 } = await exec('git push');
  console.log(stdout3);
  console.log('Done!');
})();
