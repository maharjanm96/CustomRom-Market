export interface Device {
  _id: any;
  name: string;
  image: string;
  codeName: string;
  androidVersion: string;
  roms: string[];
}

export type Rom = {
  _id: string; // MongoDB ObjectId as a string
  name: string; // ROM name
  androidVersion: string; // Android version
  status: string;
};

interface SelectOption {
  value: string;
  label: string;
}
