declare type Internet = {
  getURL: (this: void, url: string) => string;
  postURL: (this: void, url: string) => string;
  destroy: (this: void) => void;
};

declare function getInternet(name: string): Internet;
