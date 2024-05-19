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
    this: void,
    memoryrecord: MemoryRecord,
    before: boolean,
    currentState: boolean
  ) => boolean;
  OnDeactivate: (
    this: void,
    memoryrecord: MemoryRecord,
    before: boolean,
    currentState: boolean
  ) => boolean;
  OnDestroy: (this: void) => void;
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
  getCount: (this: void) => number;
  getMemoryRecord: (this: void, index: number) => MemoryRecord;
  getMemoryRecordByDescription: (
    this: void,
    description: string
  ) => MemoryRecord;
  getMemoryRecordByID: (this: void, ID: number) => MemoryRecord;
  createMemoryRecord: (this: void) => MemoryRecord;
  getSelectedRecords: (this: void) => MemoryRecord;
  doDescriptionChange: (this: void) => void;
  doAddressChange: (this: void) => void;
  doTypeChange: (this: void) => void;
  doValueChange: (this: void) => void;
  getSelectedRecord: (this: void) => MemoryRecord;
  setSelectedRecord: (this: void, memrec: MemoryRecord) => void;
};

declare function writeBytes(Address: Address, ...bytes: number[]): void;
declare function getAddressList(): AddressList;
