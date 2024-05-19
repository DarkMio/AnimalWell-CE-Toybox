declare type Internet = {
  getURL: (url: string) => string;
  postURL: (url: string) => string;
  destroy: () => void;
};

declare function getInternet(name: string): Internet;
