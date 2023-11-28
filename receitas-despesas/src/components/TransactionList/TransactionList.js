// TransactionList.js
import React from 'react';
import Transaction from '../Transaction/Transaction';
import styled from 'styled-components';

const ListContainer = styled.div`
  background-color: #282c34;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
  padding: 20px;
  margin-bottom: 20px;
  overflow-y: auto;
  max-height: 50vh;
  max-width: 80vw; /* Adicionado para limitar a largura da lista em telas maiores */
`;

const ListTitle = styled.h2`
  color: #61dafb;
  margin-bottom: 10px;
`;

const TransactionList = ({ transactions, deleteTransaction }) => {
  return (
    <ListContainer>
      <ListTitle>Lista de Transações</ListTitle>
      <ul>
        {transactions.map((transaction) => (
          <Transaction
            key={transaction.id}
            transaction={transaction}
            deleteTransaction={deleteTransaction}
          />
        ))}
      </ul>
    </ListContainer>
  );
};

export default TransactionList;
