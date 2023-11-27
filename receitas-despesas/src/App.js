import React, { useState, useEffect } from 'react';
import InputForm from './components/InputForm/InputForm';
import TransactionList from './components/TransactionList/TransactionList';
import Balance from './components/Balance/Balance';

const App = () => {
  const [transactions, setTransactions] = useState([]);
  const [incomeTransactions, setIncomeTransactions] = useState([]);
  const [expenseTransactions, setExpenseTransactions] = useState([]);

  useEffect(() => {
    // Recuperar transações do Local Storage ao carregar a página
    const storedTransactions = JSON.parse(localStorage.getItem('transactions')) || [];
    setTransactions(storedTransactions);
  }, []);

  useEffect(() => {
    // Atualizar o Local Storage sempre que as transações mudarem
    localStorage.setItem('transactions', JSON.stringify(transactions));

    // Atualizar listas de receitas e despesas
    const income = transactions.filter((transaction) => transaction.amount > 0);
    const expenses = transactions.filter((transaction) => transaction.amount < 0);

    setIncomeTransactions(income);
    setExpenseTransactions(expenses);
  }, [transactions]);

  const addTransaction = (newTransaction) => {
    setTransactions([...transactions, newTransaction]);
  };

  const deleteTransaction = (id) => {
    const updatedTransactions = transactions.filter((transaction) => transaction.id !== id);
    setTransactions(updatedTransactions);
  };

  return (
    <div>
      <h1>Calculadora de Receitas e Despesas</h1>
      <InputForm addTransaction={addTransaction} />
      
      <div>
        <h2>Receitas</h2>
        <TransactionList transactions={incomeTransactions} deleteTransaction={deleteTransaction} />
      </div>

      <div>
        <h2>Despesas</h2>
        <TransactionList transactions={expenseTransactions} deleteTransaction={deleteTransaction} />
      </div>

      <Balance transactions={transactions} />
    </div>
  );
};

export default App;