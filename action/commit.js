process.on('unhandledRejection', up => {
  throw up;
});
const template = require('./template')
const fs = require('fs').promises;
const { exec } = require('child-process-promise');
(async () => {
  const db = await fs.readFile('./database.json');
  const obj = await JSON.parse(db);
  let css = '';
  Object.keys(obj).forEach(e => {
    delete obj[e].userID
    css += template(obj[e], e)
  });
  const newjson = await JSON.stringify(obj, null, 1);
  await fs.writeFile('./database.json', newjson);
  await fs.writeFile('./database.css', css);
  const { stdout } = await exec('git add ./database.css');
  console.log(stdout);
  const { stdout2 } = await exec(`git commit -m "Rebuild dB" --allow-empty`);
  console.log(stdout2);
  console.log('Done!');
})();

