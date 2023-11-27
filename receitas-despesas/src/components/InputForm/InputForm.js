import React, { useState } from 'react';

const InputForm = ({ addTransaction }) => {
    const [description, setDescription] = useState('');
    const [amount, setAmount] = useState('');
    const [type, setType] = useState('income'); // 'income' for receita, 'expense' for despesa
    const [paymentType, setPaymentType] = useState(''); // Novo campo para o tipo de pagamento
  
    const handleSubmit = (e) => {
      e.preventDefault();
  
      // Validar entrada
      if (description.trim() === '' || isNaN(amount) || paymentType.trim() === '') {
        alert('Por favor, preencha todos os campos corretamente.');
        return;
      }
  
      // Adicionar transação
      const newTransaction = {
        id: new Date().getTime(),
        description,
        amount: type === 'income' ? +amount : -amount,
        paymentType,
      };
  
      addTransaction(newTransaction);
  
      // Limpar campos
      setDescription('');
      setAmount('');
      setPaymentType('');
    };
  
    return (
      <form onSubmit={handleSubmit}>
        <label>
          Descrição:
          <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </label>
        <label>
          Valor:
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
        </label>
        <label>
          Tipo:
          <select value={type} onChange={(e) => setType(e.target.value)}>
            <option value="income">Receita</option>
            <option value="expense">Despesa</option>
          </select>
        </label>
        <label>
          Tipo de Pagamento:
          <input
            type="text"
            value={paymentType}
            onChange={(e) => setPaymentType(e.target.value)}
          />
        </label>
        <button type="submit">Adicionar Transação</button>
      </form>
    );
  };
  
  export default InputForm;