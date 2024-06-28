import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Payments = () => {
  const [payments, setPayments] = useState([]);

  useEffect(() => {
    axios.get('/api/payments')
      .then(response => setPayments(response.data))
      .catch(error => console.error('Erreur de chargement des paiements:', error));
  }, []);

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Gestion des Paiements</h2>
      <ul>
        {payments.map(payment => (
          <li key={payment.id} className="mb-4 p-4 border rounded shadow">
            <h3 className="font-bold">Paiement de {payment.amount}€</h3>
            <p>{payment.description}</p>
            <button className="bg-blue-500 text-white px-4 py-2 mt-2">Détails</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Payments;
