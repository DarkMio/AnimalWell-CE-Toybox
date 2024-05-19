declare type Form = {
  saveToFile: (this: void, filename: string) => void;
  centerToStcreen: (this: void) => void;
  hide: (this: void) => void;
  show: (this: void) => void;
  showModal: (this: void) => void;
  isForegroundWindow: (this: void) => boolean;
  onClose: (this: void, func: (this: void) => void) => unknown;
  getMenu: (this: void, form: unknown) => unknown;
  setMenu: (this: void, mainmenu: unknown) => unknown;
};

declare function getMainForm(this: void): Form;
