module.exports = function (obj, id) {
return `\n\n/*${obj.username}*/
[user_by_bdfdb*="${id}"],
.avatar-3EQepX[data-user-id*="${id}"] + *,
.member-3-YXUe[data-user-id*="${id}"],
[data-author-id*="${id}"],
[style*="${id}"] + *,
img[src*="${id}"] + * {
  --name-dummy-transparent: transparent; --name-dummy-1: 1;
  --name-gradient: ${obj.color1}, ${obj.color2};
  ${obj.angle ? `--name-gradient-angle: ${obj.angle};` : ''}
}`;
}