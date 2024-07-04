import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import './Stats.css';

const Stats = ({ stats }) => {
  const data = {
    labels: ['Clients', 'Fournisseurs'],
    datasets: [
      {
        label: "Nombre d'utilisateurs",
        data: [stats.clients, stats.fournisseurs],
        backgroundColor: ['#36A2EB', '#FFCE56'],
      },
    ],
  };

  return (
    <div className="stats-container">
      <h2>Nombre d'utilisateurs</h2>
      <Doughnut data={data} />
    </div>
  );
};

export default Stats;
