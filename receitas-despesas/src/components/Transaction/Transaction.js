// Transaction.js
import React from 'react';

const Transaction = ({ transaction, deleteTransaction }) => {
  const { id, description, amount } = transaction;

  return (
    <li key={id}>
      {description}: R$ {amount}
      <button onClick={() => deleteTransaction(id)}>Excluir</button>
    </li>
  );
};

export default Transaction;
