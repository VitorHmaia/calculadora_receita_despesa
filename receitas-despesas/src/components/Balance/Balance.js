// Balance.js
import React from 'react';
import styled from 'styled-components';

// Styled Components for Balance
const BalanceContainer = styled.div`
  background-color: #282c34;
  padding: 20px;
  margin-top: 20px;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
  text-align: center; /* Adjusted to center the text */
`;

const BalanceTitle = styled.h2`
  color: #61dafb;
  margin-bottom: 10px;
`;

const BalanceAmount = styled.p`
  color: #ffffff;
  font-size: 24px;
`;

// Balance component
const Balance = ({ transactions }) => {
  // Function to calculate the total balance
  const calculateBalance = () => {
    return transactions.reduce((acc, transaction) => acc + transaction.amount, 0);
  };

  // Function to calculate total income
  const calculateIncome = () => {
    return transactions.reduce((acc, transaction) => (transaction.amount > 0 ? acc + transaction.amount : acc), 0);
  };

  // Function to calculate total expenses
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
