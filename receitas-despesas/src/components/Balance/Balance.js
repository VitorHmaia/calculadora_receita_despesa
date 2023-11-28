// Balance.js
import React from 'react';
import styled from 'styled-components';

const BalanceContainer = styled.div`
  background-color: #282c34;
  padding: 20px;
  margin-top: 20px;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
  text-align: center; /* Ajustado para centralizar o texto */
`;

const BalanceTitle = styled.h2`
  color: #61dafb;
  margin-bottom: 10px;
`;

const BalanceAmount = styled.p`
  color: #ffffff;
  font-size: 24px;
`;

const Balance = ({ transactions }) => {
  const calculateBalance = () => {
    return transactions.reduce((acc, transaction) => acc + transaction.amount, 0);
  };

  const calculateIncome = () => {
    return transactions.reduce((acc, transaction) => (transaction.amount > 0 ? acc + transaction.amount : acc), 0);
  };

  const calculateExpenses = () => {
    return transactions.reduce((acc, transaction) => (transaction.amount < 0 ? acc + transaction.amount : acc), 0);
  };

  return (
    <BalanceContainer>
      <BalanceTitle>Saldo:</BalanceTitle>
      <BalanceAmount>R$ {calculateBalance()}</BalanceAmount>
      <BalanceTitle>Receitas:</BalanceTitle>
      <BalanceAmount>R$ {calculateIncome()}</BalanceAmount>
      <BalanceTitle>Despesas:</BalanceTitle>
      <BalanceAmount>R$ {Math.abs(calculateExpenses())}</BalanceAmount>
    </BalanceContainer>
  );
};

export default Balance;
