declare type Timer = {
  Interval: number;
  Enabled: boolean;
  OnTimer: () => void;

  getInterval: () => number;
  setInterval: (interval: number) => void;
  getOnTimer: () => () => void;
  setOnTimer: (cb: () => void) => void;
  getEnabled: () => boolean;
  setEnabled: (enabled: boolean) => void;
  destroy: () => void;
};
declare function createTimer(this: void, L: Form): Timer;
