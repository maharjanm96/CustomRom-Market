export interface Device {
  _id: any;
  name: string;
  image: string;
  codeName: string;
  androidVersion: string;
  roms: string[];
}

export type Rom = {
  _id: string;
  name: string;
  androidVersion: string;
  status: string;
  averageRating?: number;
  averageSentiment?: number;
};
