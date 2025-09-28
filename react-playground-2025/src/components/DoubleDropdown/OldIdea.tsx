import { useState } from "react";

const sampleCountries = [
  {
    name: "China",
    value: "CN",
    cities: [
      "Beijing",
      "Shanghai",
      "Guangzhou",
      "Shenzhen"
    ]
  },
  {
    name: "United States",
    value: "US",
    cities: [
      "New York",
      "Los Angeles",
      "Chicago",
      "Houston"
    ]
  },
  {
    name: "United Kingdom",
    value: "GB",
    cities: [
      "London",
      "Manchester",
      "Liverpool",
      "Birmingham"
    ]
  },
];

interface Country {
  name: string;
  value: string;
  cities: string[];
}

const sampleCountriesMapper = new Map<string, Country>(
  sampleCountries.map(item => [item.name, item])
);

const getCountries = ['Please select an country'].concat(sampleCountries.map(country => country.name));

const getCities = (countryName: string) => {
  const defaultCity = ["Please select a city"];
  return defaultCity.concat(Array.from(sampleCountriesMapper.get(countryName)?.cities || []));
}

const DropdownComponent = <T extends Country | string>({ data, handleChange }: {data: T[], handleChange: (name: string) => void}) => {
  return (
    <select onChange={(e) => handleChange(e.target.value)}>
      {data.map(item => (
        <option
          key={typeof item === 'string' ? item : item.value}
          value={typeof item === 'string' ? item : item.value}
        >
          {typeof item === 'string' ? item : item.name}
        </option>
      ))}
    </select>
  );
}

export default function DoubleDropdown() {
  const [selectedCountry, setSelectedCountry] = useState('');
  
  const handleCountryChange = (countryName: string) => {
    setSelectedCountry(countryName);
  }
  
  const handleCityChange = (city: string) => {
    console.log(city);
  }

  return <div>
    <DropdownComponent<string> data={getCountries} handleChange={handleCountryChange} />
    {selectedCountry && <DropdownComponent<string> data={getCities(selectedCountry)} handleChange={handleCityChange} />}
  </div>
}
