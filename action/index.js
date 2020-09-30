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
  const cssfile = await fs.readFile('./database.json');
  const obj = await JSON.parse(cssfile);
  // regen database
  if (!issuebody.userID || !issuebody.username || !issuebody.color1 || !issuebody.color2) {
    throw 'json error';
  }
  obj[issuebody.userID] = issuebody;
  let props;
  let css;
  Object.keys(obj).forEach(e => {
    if (obj[e].angle) {
      props = `
  --name-dummy-transparent: transparent; --name-dummy-1: 1;
  --name-gradient: ${obj[e].color1}, ${obj[e].color2};
  --name-gradient-angle: ${obj[e].angle};
    `;
    } else {
      props = `
  --name-dummy-transparent: transparent; --name-dummy-1: 1;
  --name-gradient: ${obj[e].color1}, ${obj[e].color2};
    `;
    }
    css += `\n\n/*${obj[e].username}*/
:root [user_by_bdfdb*="${e}"],
:root [data-user-id*="${e}"] + *,
:root [data-author-id*="${e}"],
:root [style*="${e}"] + *,
:root img[src*="${e}"] + * {
${props}
}`;
  });
  const newjson = await JSON.stringify(obj, null, 1);
  await fs.writeFile('./database.json', newjson);
  await fs.writeFile('./database.css', css);
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

