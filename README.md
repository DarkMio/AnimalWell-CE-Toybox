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

The sender looks like that:

```js
import * as dgram from "dgram";
import { glob } from "glob";
import { PNG } from "pngjs";
import * as fs from "fs";

const frames = await glob("_frames/*.png");
const data: Partial<Record<string, string[]>> = {};

for (const file of frames) {
  const png = fs.createReadStream(file).pipe(new PNG());
  png.on("parsed", () => {
    const arr: string[] = [];
    for (var y = 0; y < png.height; y++) {
      for (var x = 0; x < png.width; x++) {
        var idx = (png.width * y + x) << 2;
        const r = png.data[idx];
        arr.push(r > 128 ? "3" : "0");
      }
    }
    arr.push("\n");
    data[file] = arr;
  });
}

const waitLoad = () => {
  const entries = Object.keys(data).sort();
  if (entries.length < frames.length) {
    console.log(`${entries.length} / ${frames.length} loaded, waiting...`);
    setTimeout(waitLoad, 100);
    return;
  }
  console.log("Done waiting...");

  var client = dgram.createSocket("udp4");

  let counter = 0;
  const timer = setInterval(() => {
    if (counter > entries.length) {
      clearInterval(timer);
      console.log("Done!");
      return;
    }
    const key = entries[counter];
    const payload = data[key];
    if (!payload) {
      throw new Error();
    }

    const msg = payload.join("");
    console.log(`Sending ${msg.length} characters to 127.0.0.1:8080`);
    client.send(msg, 8080, "172.25.224.1");
    counter += 1;
  }, 1000 / 30);
};

waitLoad();
```
