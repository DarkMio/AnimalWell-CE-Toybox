import * as socket from "socket";

type Pixel = "black" | "blue" | "red" | "white";
const bitTable: Record<Pixel, [number, number, number, number]> = {
  black: [0b00_00_00_00, 0b00_00_00_00, 0b00_00_00_00, 0b00_00_00_00],
  blue: [0b01_00_00_00, 0b00_01_00_00, 0b00_00_01_00, 0b00_00_00_01],
  red: [0b10_00_00_00, 0b00_10_00_00, 0b00_00_10_00, 0b00_00_00_10],
  white: [0b11_00_00_00, 0b00_11_00_00, 0b00_00_11_00, 0b00_00_00_11],
};

const timer = createTimer(getMainForm());
timer.Interval = 16;

const killScript = (msg: string) => {
  console.log(msg);
  timer.destroy();
};

const createArray = (size: number, fill: number) =>
  ([] as number[]).fill(fill, 0, size);

const offValue = createArray(200, 0x00);
const onValue = createArray(200, 0xff);

const updateScreen = (() => {
  const bitbang = (px: Pixel[]) => {
    const result: number[] = [];
    for (let i = 0; i < px.length; i += 4) {
      // they fit into the register as following:
      // 0b00_00_00_00
      //   aa bb cc dd
      // aa: most significant bits
      // bb: high bits
      // cc: low bits
      // dd: least significant bits
      const most = px[i + 0];
      const high = px[i + 1];
      const low = px[i + 2];
      const least = px[i + 3];

      // lua universal doesn't understand bitwise ops, so there's a lookup table
      const value =
        bitTable[most][3] +
        bitTable[high][2] +
        bitTable[low][1] +
        bitTable[least][0];
      result.push(value);
    }
    return result;
  };

  return (px: Pixel[]) => {
    const address = getAddressList().getMemoryRecordByDescription(
      "Canvas Address"
    ).Address as Address;
    // px are 40 width, 20 height,
    if (px.length != 40 * 20 || !address) {
      killScript(
        `Array of size ${px.length} is not of expected size ${40 * 20}`
      );
      return;
    }
    writeBytes(address, ...bitbang(px));
  };
})();

const createTable = () => {
  const buffer = ([] as Pixel[]).fill("black", 0, 40 * 20);

  return {
    buffer: buffer,
    /**
     * y: bottom -> up
     * x: left -> right
     */
    setPixel: (x: number, y: number, color: Pixel) => {
      const index = buffer.length - (y * 40 + x + 1);
      if (index < 0 || index > buffer.length) {
        killScript(
          `that's an error, out of range: x: ${x}, y: ${y}, length: ${buffer.length}, idx: ${index}`
        );
        throw new Error();
      }
      buffer[index] = color;
    },
  };
};

const tickFunc = (() => {
  let flip = false;
  let counter = 1000;

  const table = createTable();

  return function (this: void) {
    if (counter <= 0) {
      timer.destroy();
      killScript("End of Program");
    }

    for (let x = 0; x < 40; x += 1) {
      for (let y = 0; y < 20; y += 1) {
        const u = (x / 40.0) * Math.PI * 2;
        const v = (y / 20.0) * Math.PI - 1;

        const offset = ((100 - (counter % 100)) / 100) * Math.PI * 2;
        const value = Math.sin(u + offset) + 0.5;
        const distance = Math.abs(v - value);
        table.setPixel(x, y, distance < 0.2 ? "white" : "black");
      }
    }
    updateScreen(table.buffer);
    counter -= 1;
  };
})();

// timer.OnTimer = tickFunc;
// timer.Enabled = true;

const thread = createThread(() => {
  const connection = socket.udp();
  connection.setsockname("*", 8080);
  console.log("try me at 8080");
  connection.settimeout(5);
  while (true) {
    const text = connection.receive();
    if (!text || text.length <= 0) {
      continue;
    }

    console.log(`Datagram is ${text.length} long`);
    if (text.length < 800) {
      return;
    }
    console.log(`Datagram: ${text.length}`);
    const arr: Pixel[] = [];

    for (var i = 0; i < 800; i++) {
      const data = text[i];
      switch (data) {
        case "0":
          arr.push("black");
          break;
        case "1":
          arr.push("blue");
          break;
        case "2":
          arr.push("red");
          break;
        case "3":
          arr.push("white");
          break;
        default:
          console.log(`error! character is: ${data}`);
          return;
      }
    }
    updateScreen(arr);
  }
});
