import React from 'react';

const Error = ({ codigo, mensagem, descricao }) => {
  return (
    <div className="container text-center mt-4">
      <h1 className="mt-4">Erro {codigo}</h1>
      <h5 className="mt-4">{mensagem}</h5>
      <h5>{descricao}</h5>
    </div>
  );
}

export default Error;