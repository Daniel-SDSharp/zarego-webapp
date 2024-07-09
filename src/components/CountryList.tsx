import React, { useEffect, useState } from 'react';
import { fetchCountries } from '../services/api';
import { Country } from '../services/types';

interface CountryListProps {
  selectedCountries: string[];
  onSelectCountry: (country: string) => void;
}

const CountryList: React.FC<CountryListProps> = ({ onSelectCountry, selectedCountries }) => {
  const [countries, setCountries] = useState<Country[]>([]);

  useEffect(() => {
    const getCountries = async () => {
      const data = await fetchCountries();
      setCountries(data);
    };
    getCountries();
  }, []);

  return (
    <ul className="bg-white shadow-md rounded-lg p-4 max-w-sm w-full h-[800px] overflow-y-auto">
      {countries.map((country) => (
        <li
          key={country.country}
          onClick={() => onSelectCountry(country.country)}
          className={`cursor-pointer p-2 border-b last:border-b-0 hover:bg-gray-200 ${selectedCountries.includes(country.country) ? 'bg-blue-300' : ''
            }`}
        >
          {country.country_name}
        </li>
      ))}
    </ul>
  );
};

export default CountryList;
