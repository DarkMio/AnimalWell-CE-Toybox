declare type Timer = {
  Interval: number;
  Enabled: boolean;
  OnTimer: (this: void) => void;

  getInterval: (this: void) => number;
  setInterval: (this: void, interval: number) => void;
  getOnTimer: (this: void) => (this: void) => void;
  setOnTimer: (this: void, cb: (this: void) => void) => void;
  getEnabled: (this: void) => boolean;
  setEnabled: (this: void, enabled: boolean) => void;
  destroy: (this: void) => void;
};
declare function createTimer(this: void, L: Form): Timer;
