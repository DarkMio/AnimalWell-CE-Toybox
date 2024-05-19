declare type MemoryRecord = {
  ID: number;
  Index: number;
  Description: string;
  Address: Address;
  OffsetCount: number;
  Offset: number[];
  CurrentAddress: number;
  Type: number;
  CustomTypeName: string;
  Script: string;
  Value: string;
  IsGroupHeader: boolean;
  readonly Selected: boolean;
  Active: boolean;
  Color: boolean;
  ShowAsHex: boolean;
  AllowIncrease: boolean;
  AllowDecrease: boolean;
  Count: BigInteger;
  Child: MemoryRecord[];
  HotkeyCount: number;
  HotKey: unknown[];
  Options: string;
  Collapsed: boolean;
  OnActivate: (
    memoryrecord: MemoryRecord,
    before: boolean,
    currentState: boolean
  ) => boolean;
  OnDeactivate: (
    memoryrecord: MemoryRecord,
    before: boolean,
    currentState: boolean
  ) => boolean;
  OnDestroy: () => void;
  DontSave: boolean;
  DropDownLinked: boolean;
  DropDownLinkedMemrec: string;
  DropDownList: string[];
  DropDownReadOnly: boolean;
  DropDownDescriptionOnly: boolean;
  DisplayAsDropDownListItem: boolean;
  DropDownCount: number;
  readonly DropDownValue: unknown[];
  readonly DropDownDescription: string[];
};
declare type Address = string & { __addressBand: never };
declare type AddressList = {
  readonly Count: number;
  readonly SelCount: number;
  readonly SelectedRecord: MemoryRecord;
  readonly MemoryRecord: MemoryRecord[];
  [k: number]: MemoryRecord;
  getCount: () => number;
  getMemoryRecord: (index: number) => MemoryRecord;
  getMemoryRecordByDescription: (description: string) => MemoryRecord;
  getMemoryRecordByID: (ID: number) => MemoryRecord;
  createMemoryRecord: () => MemoryRecord;
  getSelectedRecords: () => MemoryRecord;
  doDescriptionChange: () => void;
  doAddressChange: () => void;
  doTypeChange: () => void;
  doValueChange: () => void;
  getSelectedRecord: () => MemoryRecord;
  setSelectedRecord: (memrec: MemoryRecord) => void;
};

declare function writeBytes(Address: Address, ...bytes: number[]): void;
declare function getAddressList(): AddressList;
