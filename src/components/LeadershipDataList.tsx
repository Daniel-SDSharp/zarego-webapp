import React, { useEffect, useState } from 'react';
import { getLeadershipDataByCountries } from '../services/api';
import { Leadership } from '../services/types';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

interface LeadershipDataProps {
  selectedCountries: string[];
}

const LeadershipData: React.FC<LeadershipDataProps> = ({ selectedCountries }) => {
  const [data, setData] = useState<Leadership[]>([]);
  const [page, setPage] = useState(1);
  const [totalRegisters, setTotalRegisters] = useState(0);
  const rowsPerPage = 10;

  useEffect(() => {
    const getData = async () => {
      if (selectedCountries.length > 0) {
        const leadershipData = await getLeadershipDataByCountries(selectedCountries, page, rowsPerPage);
        setData(leadershipData.data);
        setTotalRegisters(leadershipData.metadata.row_count);
      }
    };
    getData();
  }, [selectedCountries, page]);

  const totalPages = Math.ceil(totalRegisters / rowsPerPage);

  const handlePreviousPage = () => {
    if (page > 1) {
      setPage(page - 1);
    }
  };

  const handleNextPage = () => {
    if (page < totalPages) {
      setPage(page + 1);
    }
  };

  const downloadPDF = () => {
    const doc = new jsPDF();
    autoTable(doc, {
      head: [
        ['ID', 'Country Name', 'Performance', 'Autocratic', 'Modesty', 'Country Cluster', 'Charisma', 'Decisive'],
      ],
      body: data.map((item) => [
        item.id,
        item.country_name,
        item.performance_oriented,
        item.autocratic,
        item.modesty,
        item.country_cluster,
        item.charisma,
        item.decisive,
      ]),
    });
    doc.save('leadership_data.pdf');
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-4 w-full overflow-x-auto">
      {data.length > 0 ? (
        <>
          <div className="flex justify-end mb-4">
            <button
              onClick={downloadPDF}
              className="bg-green-500 text-white px-4 py-2 rounded"
            >
              Download PDF
            </button>
          </div>
          <table className="min-w-full border-collapse">
            <thead>
              <tr>
                <th className="py-2 px-4 border">ID</th>
                <th className="py-2 px-4 border">Country Name</th>
                <th className="py-2 px-4 border">Performance</th>
                <th className="py-2 px-4 border">Autocratic</th>
                <th className="py-2 px-4 border">Modesty</th>
                <th className="py-2 px-4 border">Country Cluster</th>
                <th className="py-2 px-4 border">Charisma</th>
                <th className="py-2 px-4 border">Decisive</th>
              </tr>
            </thead>
            <tbody>
              {data.map((item) => (
                <tr key={item.id} className="hover:bg-gray-100">
                  <td className="py-2 px-4 border text-center">{item.id}</td>
                  <td className="py-2 px-4 border text-center">{item.country_name}</td>
                  <td className="py-2 px-4 border text-center">{item.performance_oriented}</td>
                  <td className="py-2 px-4 border text-center">{item.autocratic}</td>
                  <td className="py-2 px-4 border text-center">{item.modesty}</td>
                  <td className="py-2 px-4 border text-center">{item.country_cluster}</td>
                  <td className="py-2 px-4 border text-center">{item.charisma}</td>
                  <td className="py-2 px-4 border text-center">{item.decisive}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="flex justify-between mt-4">
            <button
              className="bg-blue-500 text-white px-4 py-2 rounded disabled:bg-blue-200"
              onClick={handlePreviousPage}
              disabled={page === 1}
            >
              Previous
            </button>
            <span>
              Page {page} of {totalPages}
            </span>
            <button
              className="bg-blue-500 text-white px-4 py-2 rounded disabled:bg-blue-200"
              onClick={handleNextPage}
              disabled={page === totalPages}
            >
              Next
            </button>
          </div>
        </>
      ) : (
        <p className="text-gray-500">No data available for the selected countries.</p>
      )}
    </div>
  );
};

export default LeadershipData;
