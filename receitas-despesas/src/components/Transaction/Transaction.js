// Transaction.js
import React, { useState } from 'react';

const formatCurrency = (value) => {
  return value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
};

const TransactionDetails = ({ transaction, onClose }) => {
  return (
    <div>
      <h3>Detalhes da Transação</h3>
      <p><strong>Descrição:</strong> {transaction.description}</p>
      <p><strong>Valor:</strong> {formatCurrency(transaction.amount)}</p>
      <p><strong>Tipo:</strong> {transaction.type === 'income' ? 'Receita' : 'Despesa'}</p>
      <p><strong>Tipo de Pagamento:</strong> {transaction.paymentType}</p>
      <button onClick={onClose}>Fechar Detalhes</button>
    </div>
  );
};

const Transaction = ({ transaction, deleteTransaction }) => {
  const [showDetails, setShowDetails] = useState(false);

  const handleToggleDetails = () => {
    setShowDetails(!showDetails);
  };

  return (
    <li key={transaction.id}>
      <span>
        {transaction.description}: {formatCurrency(transaction.amount)}
      </span>
      <button onClick={handleToggleDetails}>Ver Detalhes</button>
      {showDetails && (
        <TransactionDetails transaction={transaction} onClose={handleToggleDetails} />
      )}
      <button onClick={() => deleteTransaction(transaction.id)}>Excluir</button>
    </li>
  );
};

export default Transaction;
