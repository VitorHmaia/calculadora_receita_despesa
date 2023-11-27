// TransactionList.js
import React from 'react';
import Transaction from '../Transaction/Transaction';

const TransactionList = ({ transactions, deleteTransaction }) => {
  return (
    <div>
      <h2>Lista de Transações</h2>
      <ul>
        {transactions.map((transaction) => (
          <Transaction
            key={transaction.id}
            transaction={transaction}
            deleteTransaction={deleteTransaction}
          />
        ))}
      </ul>
    </div>
  );
};

export default TransactionList;
