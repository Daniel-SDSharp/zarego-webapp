import React, { useEffect, useState } from 'react';
import { getLeadershipDataByCountries } from '../services/api';
import { Leadership } from '../services/types';

interface LeadershipDataProps {
  selectedCountries: string[];
}

const LeadershipData: React.FC<LeadershipDataProps> = ({ selectedCountries }) => {
  const [data, setData] = useState<Leadership[]>([]);

  useEffect(() => {
    const getData = async () => {
      if (selectedCountries.length > 0) {
        const leadershipData = await getLeadershipDataByCountries(selectedCountries, 1, 50);
        setData(leadershipData.data);
      }
    };
    getData();
  }, [selectedCountries]);

  return (
    <div className="bg-white shadow-md rounded-lg p-4 w-full overflow-x-auto">
      <h2 className="text-2xl mb-4">Leadership Data</h2>
      {data.length > 0 ? (
        <table className="min-w-full border-collapse">
          <thead>
            <tr>
              <th className="py-2 px-4 border">ID</th>
              <th className="py-2 px-4 border">Country Name</th>
              <th className="py-2 px-4 border">Performance Oriented</th>
              <th className="py-2 px-4 border">Autocratic</th>
              <th className="py-2 px-4 border">Modesty</th>
              <th className="py-2 px-4 border">Country Cluster</th>
              <th className="py-2 px-4 border">Charisma</th>
              <th className="py-2 px-4 border">Decisive</th>
              <th className="py-2 px-4 border">Date Added</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item) => (
              <tr key={item.id} className="hover:bg-gray-100">
                <td className="py-2 px-4 border">{item.id}</td>
                <td className="py-2 px-4 border">{item.country_name}</td>
                <td className="py-2 px-4 border">{item.performance_oriented}</td>
                <td className="py-2 px-4 border">{item.autocratic}</td>
                <td className="py-2 px-4 border">{item.modesty}</td>
                <td className="py-2 px-4 border">{item.country_cluster}</td>
                <td className="py-2 px-4 border">{item.charisma}</td>
                <td className="py-2 px-4 border">{item.decisive}</td>
                <td className="py-2 px-4 border">{item.date_added}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p className="text-gray-500">No data available for the selected countries.</p>
      )}
    </div>
  );
};

export default LeadershipData;
