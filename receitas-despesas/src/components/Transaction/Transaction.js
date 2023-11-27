// Transaction.js
import React from 'react';

const formatCurrency = (value) => {
    return value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
  };
  
  const Transaction = ({ transaction, deleteTransaction }) => {
    const { id, description, amount } = transaction;
  
    return (
      <li key={id}>
        {description}: {formatCurrency(amount)}
        <button onClick={() => deleteTransaction(id)}>Excluir</button>
      </li>
    );
  };
  
  export default Transaction;