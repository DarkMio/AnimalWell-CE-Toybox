# Animal Well CheatEngine Injection Toybox

This project is a TypescriptToLua adaptation for generating CheatEngine Lua code.
It is used to inject scripts and ease development of those scripts for Animal Well.

The project does type declarations for what ever is necessary to interface with the CE API.

tldr:

- grab the Lua socket library and paste its contents into the CE installation folder: https://cheatengine.org/download/luasocket.zip
- checkout this repo
- run `npm install` or `bun install`
- run `npx tstl --watch` or `bunx tstl --watch` to emit lua code
- paste the code in the CE lua console found by pressing `CTRL` + `ALT` + `SHIFT` + `L`

That's it!
