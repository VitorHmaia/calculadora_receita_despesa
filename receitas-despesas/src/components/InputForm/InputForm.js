// InputForm.js
import React, { useState } from 'react';
import styled from 'styled-components';

const FormContainer = styled.form`
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 400px; /* Adicionado para limitar a largura do formulário em telas maiores */
  margin: 0 auto; /* Adicionado para centralizar o formulário */
`;

const FormLabel = styled.label`
  margin-bottom: 8px;
  color: #61dafb;
`;

const FormInput = styled.input`
  margin-bottom: 16px;
  padding: 10px;
  font-size: 16px;
  border: 1px solid #61dafb;
  border-radius: 5px;
`;

const FormSelect = styled.select`
  margin-bottom: 16px;
  padding: 10px;
  font-size: 16px;
  border: 1px solid #61dafb;
  border-radius: 5px;
`;

const FormButton = styled.button`
  background-color: #61dafb;
  color: #1e1e1e;
  cursor: pointer;
  border: none;
  padding: 12px;
  font-size: 16px;
  border-radius: 5px;
  transition: background-color 0.3s;

  &:hover {
    background-color: #47a3da;
  }
`;

const InputForm = ({ addTransaction }) => {
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');
  const [type, setType] = useState('income');
  const [paymentType, setPaymentType] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    if (description.trim() === '' || isNaN(amount) || paymentType.trim() === '') {
      alert('Por favor, preencha todos os campos corretamente.');
      return;
    }

    const newTransaction = {
      id: new Date().getTime(),
      description,
      amount: type === 'income' ? +amount : -amount,
      paymentType,
    };

    addTransaction(newTransaction);

    setDescription('');
    setAmount('');
    setPaymentType('');
  };

  return (
    <FormContainer onSubmit={handleSubmit}>
      <FormLabel>
        Descrição:
        <FormInput type="text" value={description} onChange={(e) => setDescription(e.target.value)} />
      </FormLabel>
      <FormLabel>
        Valor:
        <FormInput type="number" value={amount} onChange={(e) => setAmount(e.target.value)} />
      </FormLabel>
      <FormLabel>
        Tipo:
        <FormSelect value={type} onChange={(e) => setType(e.target.value)}>
          <option value="income">Receita</option>
          <option value="expense">Despesa</option>
        </FormSelect>
      </FormLabel>
      <FormLabel>
        Tipo de Pagamento:
        <FormInput type="text" value={paymentType} onChange={(e) => setPaymentType(e.target.value)} />
      </FormLabel>
      <FormButton type="submit">Adicionar Transação</FormButton>
    </FormContainer>
  );
};

export default InputForm;
