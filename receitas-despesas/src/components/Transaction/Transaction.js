// Transaction.js
import React, { useState } from 'react';
import styled from 'styled-components';

const ListItem = styled.li`
  background-color: #373d48;
  padding: 10px;
  margin-bottom: 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-radius: 5px;
`;

const DetailsTitle = styled.h3`
  color: #61dafb;
`;

const DetailsParagraph = styled.p`
  margin-bottom: 8px;
`;

const DetailsButton = styled.button`
  background-color: #61dafb;
  color: #1e1e1e;
  cursor: pointer;
  border: none;
  padding: 10px;
  font-size: 16px;
  border-radius: 5px;
  margin-top: 10px;
  transition: background-color 0.3s;

  &:hover {
    background-color: #47a3da;
  }
`;

const DeleteButton = styled.button`
  background-color: #e57373;
  color: #1e1e1e;
  cursor: pointer;
  border: none;
  padding: 10px;
  font-size: 16px;
  border-radius: 5px;
  margin-left: 10px;
  transition: background-color 0.3s;

  &:hover {
    background-color: #c62828;
  }
`;

const PopupOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const PopupContent = styled.div`
  background-color: #1e1e1e; /* Cor de fundo da aplicação */
  color: #ffffff; /* Cor do texto da aplicação */
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
  max-width: 400px;
  width: 100%;
`;

const ConfirmDeleteButton = styled.button`
  background-color: #e57373;
  color: #1e1e1e;
  cursor: pointer;
  border: none;
  padding: 10px;
  font-size: 16px;
  border-radius: 5px;
  margin-right: 10px;
  transition: background-color 0.3s;

  &:hover {
    background-color: #c62828;
  }
`;

const CancelDeleteButton = styled.button`
  background-color: #61dafb;
  color: #1e1e1e;
  cursor: pointer;
  border: none;
  padding: 10px;
  font-size: 16px;
  border-radius: 5px;
  transition: background-color 0.3s;

  &:hover {
    background-color: #47a3da;
  }
`;

const CloseButton = styled.button`
  background-color: #e57373;
  color: #1e1e1e;
  cursor: pointer;
  border: none;
  padding: 10px;
  font-size: 16px;
  border-radius: 5px;
  margin-top: 10px;
  transition: background-color 0.3s;

  &:hover {
    background-color: #c62828;
  }
`;

const formatCurrency = (value) => {
  return value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
};

const Transaction = ({ transaction, deleteTransaction }) => {
  const [showDetails, setShowDetails] = useState(false);
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);

  const handleToggleDetails = () => {
    setShowDetails(!showDetails);
  };

  const handleToggleDeleteConfirmation = () => {
    setShowDeleteConfirmation(!showDeleteConfirmation);
  };

  const handleDelete = () => {
    deleteTransaction(transaction.id);
    setShowDeleteConfirmation(false);
  };

  return (
    <ListItem>
      <span>
        {transaction.description}: {formatCurrency(transaction.amount)}
      </span>
      <DetailsButton onClick={handleToggleDetails}>Ver Detalhes</DetailsButton>
      <DeleteButton onClick={handleToggleDeleteConfirmation}>Excluir</DeleteButton>
      {showDetails && (
        <PopupOverlay>
          <PopupContent>
            <DetailsTitle>Detalhes da Transação</DetailsTitle>
            <DetailsParagraph><strong>Descrição:</strong> {transaction.description}</DetailsParagraph>
            <DetailsParagraph><strong>Valor:</strong> {formatCurrency(transaction.amount)}</DetailsParagraph>
            <DetailsParagraph><strong>Tipo:</strong> {transaction.type === 'income' ? 'Receita' : 'Despesa'}</DetailsParagraph>
            <DetailsParagraph><strong>Tipo de Pagamento:</strong> {transaction.paymentType}</DetailsParagraph>
            <CloseButton onClick={handleToggleDetails}>Fechar Detalhes</CloseButton>
          </PopupContent>
        </PopupOverlay>
      )}
      {showDeleteConfirmation && (
        <PopupOverlay>
          <PopupContent>
            <p>Tem certeza de que deseja excluir esta transação?</p>
            <ConfirmDeleteButton onClick={handleDelete}>Sim</ConfirmDeleteButton>
            <CancelDeleteButton onClick={handleToggleDeleteConfirmation}>Cancelar</CancelDeleteButton>
          </PopupContent>
        </PopupOverlay>
      )}
    </ListItem>
  );
};

export default Transaction;
