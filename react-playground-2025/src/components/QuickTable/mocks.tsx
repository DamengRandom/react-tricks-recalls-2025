import { Car, Header } from "./types";

export const headers: Header[] = [
  {
    id: 1,
    KEY: "MAKE",
    LABEL: "Make",
  },
  {
    id: 2,
    KEY: "MODEL",
    LABEL: "Model",
  },
  {
    id: 3,
    KEY: "YEAR",
    LABEL: "Year",
  },
  {
    id: 4,
    KEY: "HORSEPOWER",
    LABEL: "Horsepower",
  },
  {
    id: 5,
    KEY: "COLOR",
    LABEL: "Color",
  }
];

export const data: Car[] = [
  {
    id: 1,
    MAKE: "Toyota",
    MODEL: "Corolla",
    YEAR: 2020,
    HORSEPOWER: 150,
    COLOR: "Blue",
  },
  {
    id: 2,
    MAKE: "Honda",
    MODEL: "Civic",
    YEAR: 2021,
    HORSEPOWER: 180,
    COLOR: "Red",
  },
  {
    id: 3,
    MAKE: "Ford",
    MODEL: "Mustang",
    YEAR: 2022,
    HORSEPOWER: 250,
    COLOR: "Yellow",
  },
  {
    id: 4,
    MAKE: "Chevrolet",
    MODEL: "Camaro",
    YEAR: 2023,
    HORSEPOWER: 220,
    COLOR: "Black",
  }
];