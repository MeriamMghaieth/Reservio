import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Pie } from 'react-chartjs-2'; // Import Pie chart from react-chartjs-2
import 'chart.js/auto'; // Automatically register all Chart.js components

const Statistics = () => {
  const [stats, setStats] = useState({ totalDemands: 0, acceptedDemands: 0, rejectedDemands: 0, totalRevenue: 0 });

  useEffect(() => {
    axios.get('/api/statistics')
      .then(response => setStats(response.data))
      .catch(error => console.error('Erreur de chargement des statistiques:', error));
  }, []);

  // Prepare data for the Pie chart
  const data = {
    labels: ['Total Demands', 'Accepted Demands', 'Rejected Demands'],
    datasets: [
      {
        label: 'Demands',
        data: [stats.totalDemands, stats.acceptedDemands, stats.rejectedDemands],
        backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
      },
    ],
  };

  const revenueData = {
    labels: ['Total Revenue'],
    datasets: [
      {
        label: 'Revenue',
        data: [stats.totalRevenue],
        backgroundColor: ['#4BC0C0'],
      },
    ],
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Tableau de Bord</h2>
      <div className="bg-white p-6 rounded shadow">
        <p>Total des Demandes: {stats.totalDemands}</p>
        <p>Demandes Acceptées: {stats.acceptedDemands}</p>
        <p>Demandes Refusées: {stats.rejectedDemands}</p>
        <p>Revenus Totaux: {stats.totalRevenue}€</p>

        {/* Display Pie chart for demands */}
        <div className="mt-6">
          <h3 className="text-lg font-bold mb-2">Distribution des Demandes</h3>
          <Pie data={data} />
        </div>

        {/* Display Pie chart for revenue */}
        <div className="mt-6">
          <h3 className="text-lg font-bold mb-2">Distribution des Revenus</h3>
          <Pie data={revenueData} />
        </div>
      </div>
    </div>
  );
};

export default Statistics;
