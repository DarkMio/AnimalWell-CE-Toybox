declare type Thread = {
  Name: string;
  Finished: boolean;
  Terminated: (this: void, timer: Timer) => void;
  freeOnTerminate: (this: void, state: boolean) => void;
  synchronize: (this: void, func: (this: void, thread: Thread) => void) => void;
  waitFor: (this: void) => void;
  suspend: (this: void) => void;
  resume: (this: void) => void;
  terminate: (this: void) => void;
};

declare function createThread(this: void, func: () => void): Thread;
