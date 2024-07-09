import React, { useState } from 'react';
import CountryList from './components/CountryList';
import LeadershipData from './components/LeadershipDataList';

const App: React.FC = () => {
  const [selectedCountries, setSelectedCountries] = useState<string[]>([]);

  const handleSelectCountry = (country: string) => {
    setSelectedCountries((prevSelected) =>
      prevSelected.includes(country)
        ? prevSelected.filter(c => c !== country)
        : [...prevSelected, country]
    );
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <h1 className="text-4xl text-center mb-8">Country Leadership Data</h1>
      <div className="flex flex-col lg:flex-row justify-center gap-8">
        <CountryList onSelectCountry={handleSelectCountry} selectedCountries={selectedCountries} />
        <LeadershipData selectedCountries={selectedCountries} />
      </div>
    </div>
  );
};

export default App;
