type Pixel = "black" | "blue" | "red" | "white";
const bitTable: Record<Pixel, [number, number, number, number]> = {
  black: [0b00_00_00_00, 0b00_00_00_00, 0b00_00_00_00, 0b00_00_00_00],
  blue: [0b01_00_00_00, 0b00_01_00_00, 0b00_00_01_00, 0b00_00_00_01],
  red: [0b10_00_00_00, 0b00_10_00_00, 0b00_00_10_00, 0b00_00_00_10],
  white: [0b11_00_00_00, 0b00_11_00_00, 0b00_00_11_00, 0b00_00_00_11],
};

const t = null;
const killScript = (msg: string) => {
  killScript(msg);
  object_destroy(t);
};

const createArray = (size: number, fill: number) =>
  ([] as number[]).fill(fill, 0, size);

const offValue = createArray(200, 0x00);
const onValue = createArray(200, 0xff);

const timer = createTimer(getMainForm());
timer.Interval = 16;

const updateScreen = (() => {
  const address = "105DD307" as Address;

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
    // px are 40 width, 20 height,
    if (px.length != 40 * 20) {
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

  return function (this: any) {
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

timer.OnTimer = tickFunc;
timer.Enabled = true;
