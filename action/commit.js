process.on('unhandledRejection', up => {
  throw up;
});
const fs = require('fs').promises;
const { exec } = require('child-process-promise');
(async () => {
  const cssfile = await fs.readFile('./database.json');
  const obj = await JSON.parse(cssfile);
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
[user_by_bdfdb*="${e}"],
[data-user-id*="${e}"] + *,
[data-author-id*="${e}"],
[style*="${e}"] + *,
img[src*="${e}"] + * {
${props}
}`;
  });
  const newjson = await JSON.stringify(obj, null, 1);
  await fs.writeFile('./database.json', newjson);
  await fs.writeFile('./database.css', css);
  const { stdout } = await exec('git add ./database.css');
  console.log(stdout);
  const { stdout2 } = await exec(`git commit -m "Rebuild dB"`);
  console.log(stdout2);
  console.log('Done!');
})();

