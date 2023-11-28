// App.js
import React, { useState, useEffect } from 'react';
import InputForm from './components/InputForm/InputForm';
import TransactionList from './components/TransactionList/TransactionList';
import Balance from './components/Balance/Balance';
import styled from 'styled-components';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AppContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  height: 100vh;
  background-color: #282c34;
  color: #ffffff;
  font-family: 'Roboto', sans-serif;
  padding: 10px;
  box-sizing: border-box;
`;

const ContentContainer = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  max-width: 1200px;
  box-sizing: border-box;
`;

const FormContainer = styled.div`
  width: 30%;
  box-sizing: border-box;
`;

const TransactionTablesContainer = styled.div`
  width: 65%;
  box-sizing: border-box;
`;

const TransactionTables = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Title = styled.h1`
  text-align: center;
`;

const App = () => {
  const [transactions, setTransactions] = useState([]);
  const [incomeTransactions, setIncomeTransactions] = useState([]);
  const [expenseTransactions, setExpenseTransactions] = useState([]);

  useEffect(() => {
    const storedTransactions = JSON.parse(localStorage.getItem('transactions')) || [];
    setTransactions(storedTransactions);
  }, []);

  useEffect(() => {
    localStorage.setItem('transactions', JSON.stringify(transactions));

    const income = transactions.filter((transaction) => transaction.amount > 0);
    const expenses = transactions.filter((transaction) => transaction.amount < 0);

    setIncomeTransactions(income);
    setExpenseTransactions(expenses);
  }, [transactions]);

  const addTransaction = (newTransaction) => {
    const currentStorageSize = JSON.stringify(localStorage).length;
    const maxStorageSize = 5000000;

    if (currentStorageSize + JSON.stringify(newTransaction).length > maxStorageSize) {
      const allTransactions = JSON.parse(localStorage.getItem('transactions')) || [];
      allTransactions.push(newTransaction);

      const jsonToSave = JSON.stringify(allTransactions);
      const blob = new Blob([jsonToSave], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'saved_transactions.json';
      a.click();

      localStorage.removeItem('transactions');
      setTransactions([]);
    } else {
      setTransactions([...transactions, newTransaction]);

      if (newTransaction.amount < 0) {
        // Exibir notificação para novas despesas
        toast.dark(`Nova Despesa: ${newTransaction.description}`, {
          position: 'bottom-left',
          autoClose: 3000, // Fechar após 3 segundos
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: false,
        });
      } else {
        // Exibir notificação para novas receitas
        toast.success(`Nova Receita: ${newTransaction.description}`, {
          position: 'bottom-left',
          autoClose: 3000, // Fechar após 3 segundos
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: false,
        });
      }
    }
  };

  const deleteTransaction = (id) => {
    const updatedTransactions = transactions.filter((transaction) => transaction.id !== id);
    setTransactions(updatedTransactions);
  };

  return (
    <AppContainer>
      <Title>Calculadora de Receitas e Despesas</Title>
      <ContentContainer>
        <FormContainer>
          <InputForm addTransaction={addTransaction} />
        </FormContainer>

        <TransactionTablesContainer>
          <TransactionTables>
            <div>
              <h2>Receitas</h2>
              <TransactionList transactions={incomeTransactions} deleteTransaction={deleteTransaction} />
            </div>

            <div>
              <h2>Despesas</h2>
              <TransactionList transactions={expenseTransactions} deleteTransaction={deleteTransaction} />
            </div>
          </TransactionTables>
        </TransactionTablesContainer>

        <Balance transactions={transactions} />
      </ContentContainer>

      <ToastContainer position="bottom-left" />
    </AppContainer>
  );
};

export default App;
