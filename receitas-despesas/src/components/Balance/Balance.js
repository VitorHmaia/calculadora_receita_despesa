import React from 'react';

const Balance = ({ transactions }) => {
  const balance = transactions.reduce((acc, transaction) => acc + transaction.amount, 0);

  return (
    <div>
      <h2>Saldo: R$ {balance}</h2>
    </div>
  );
};

export default Balance;
