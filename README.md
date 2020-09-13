<h1 align=center>Discord Custom Gradient Names</h1> 

[![Discord Server](https://discordapp.com/api/guilds/754130139415183401/widget.png?style=shield)](https://discord.gg/Cka4prH)
[![Handle Request](https://github.com/Discord-Custom-Gradient-Names/gradient/workflows/Handle%20Request/badge.svg?event=issues)](https://github.com/Discord-Custom-Gradient-Names/gradient/actions?query=workflow%3A%22Handle+Request%22)
![Minify CSS](https://github.com/Discord-Custom-Gradient-Names/gradient/workflows/Minify%20CSS/badge.svg?event=push)
[![GitHub License](https://img.shields.io/github/license/Discord-Custom-Gradient-Names/gradient.svg)](https://github.com/Discord-Custom-Gradient-Names/gradient/blob/master/LICENSE)
[![Stars](https://img.shields.io/github/stars/Discord-Custom-Gradient-Names/gradient.svg)](https://www.youtube.com/watch?v=dQw4w9WgXcQ)
[![CodeFactor](https://www.codefactor.io/repository/github/discord-custom-gradient-names/gradient/badge)](https://www.codefactor.io/repository/github/discord-custom-gradient-names/gradient)

## Importing
To import, add this **at the top** of your QuickCSS / CustomCSS
```css
@import url('https://discord-custom-gradient-names.github.io/gradient/dist/main.min.css');
```

*P.S.: theme devs, feel free to add this to your theme without consent. To do so, add the snippet above with your imports, also if you want to, you can send over a PR to add your theme to the (soon™) list of themes using Discord Custom Gradient Names*


## Attention all BetterDiscord Users!
If you are using BetterDiscord, you MUST have a plugin by DevilBro running, as we require his library for certain, but important data attributes (`user_by_bdfdb`).

## Adding your Custom Gradient Name to the Database
To add it, use [this generator](https://discord-custom-gradient-names.github.io/gradient/app/) and when done, hit `Generate Text`, then hit ``submit issue`` without changing the issue.

You could also shoot us over a Pull Request with your Custom Gradient Name (must follow template below!) at the end of the [database.css](https://github.com/Discord-Custom-Gradient-Names/gradient/database.css) file. Rotation is optional, and defaults to left-to-right.

Template to follow for manual PR: 
```css
/*YOUR_USERNAME#YOUR_DISCRIMINATOR_TAG*/
[user_by_bdfdb*="YOUR_USER_ID_HERE"],
[data-user-id*="YOUR_USER_ID_HERE"] + *,
[data-author-id*="YOUR_USER_ID_HERE"],
img[src*="YOUR_USER_ID_HERE"] + * {
  --name-dummy-transparent: transparent; --name-dummy-1: 1;
  --name-gradient: COLOR1, COLOR2;
  --name-gradient-angle: ROTATION;
}
```

## Support Server
[![Discord Server](https://discordapp.com/api/guilds/754130139415183401/widget.png?style=banner2)](https://discord.gg/Cka4prH)
