export type Car = {
  id: number;
  MAKE: string;
  MODEL: string;
  YEAR: number;
  HORSEPOWER: number;
  COLOR: string;
};

export type HeaderKey = Exclude<keyof Car, 'id'>;

export type Header = {
  id: number;
  KEY: HeaderKey;
  LABEL: string;
};