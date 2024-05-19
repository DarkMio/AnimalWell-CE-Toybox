declare type Form = {
  saveToFile: (filename: string) => void;
  centerToStcreen: () => void;
  hide: () => void;
  show: () => void;
  showModal: () => void;
  isForegroundWindow: () => boolean;
  onClose: (func: () => void) => unknown;
  getMenu: (form: unknown) => unknown;
  setMenu: (mainmenu: unknown) => unknown;
};

declare function getMainForm(this: void): Form;
