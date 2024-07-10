import React, { useState, useEffect } from 'react';
import CountryList from './components/CountryList';
import LeadershipData from './components/LeadershipDataList';

const App: React.FC = () => {
  const [selectedCountries, setSelectedCountries] = useState<string[]>([]);
  const [showData, setShowData] = useState<boolean>(false);
  const [isMobileView, setIsMobileView] = useState<boolean>(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobileView(window.innerWidth < 768);
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleSelectCountry = (country: string) => {
    setSelectedCountries((prevSelected) =>
      prevSelected.includes(country)
        ? prevSelected.filter(c => c !== country)
        : [...prevSelected, country]
    );
    setShowData(false);
  };

  const handleBack = () => {
    setShowData(false);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <h1 className="text-4xl text-center mb-8">International Leadership Data</h1>
      <div className="flex flex-col lg:flex-row justify-center gap-8">
        {isMobileView ? (
          <>
            {!showData ? (
              <div className="w-full">
                <CountryList onSelectCountry={handleSelectCountry} selectedCountries={selectedCountries} />
                <button
                  className={`bg-blue-500 text-white px-4 py-2 rounded mt-4 self-center ${showData ? 'hidden' : ''}`}
                  onClick={() => setShowData(true)}
                >
                  See Data
                </button>
              </div>
            ) : (
              <div>
                <button
                  className="bg-blue-500 text-white px-4 py-2 rounded mt-4 mb-4"
                  onClick={handleBack}
                >
                  Back
                </button>
                <LeadershipData selectedCountries={selectedCountries} />
              </div>
            )}
          </>
        ) : (
          <>
            <CountryList onSelectCountry={handleSelectCountry} selectedCountries={selectedCountries} />
            <LeadershipData selectedCountries={selectedCountries} />
          </>
        )}
      </div>
    </div>
  );
};

export default App;
