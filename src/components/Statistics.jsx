import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Statistics = () => {
  const [stats, setStats] = useState({});

  useEffect(() => {
    axios.get('/api/statistics')
      .then(response => setStats(response.data))
      .catch(error => console.error('Erreur de chargement des statistiques:', error));
  }, []);

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Tableau de Bord</h2>
      <div className="bg-white p-6 rounded shadow">
        <p>Total des Demandes: {stats.totalDemands}</p>
        <p>Demandes Acceptées: {stats.acceptedDemands}</p>
        <p>Demandes Refusées: {stats.rejectedDemands}</p>
        <p>Revenus Totaux: {stats.totalRevenue}€</p>
      </div>
    </div>
  );
};

export default Statistics;
