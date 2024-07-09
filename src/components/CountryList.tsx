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
    <div className='w-full lg:w-[450px]'>
      <h2 className="font-bold text-2xl mb-4 text-center">Choose Country</h2>
      <ul className="bg-white shadow-md rounded-lg p-4 max-h-[400px] lg:max-h-[700px] overflow-y-auto">
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
    </div>
  );
};

export default CountryList;
