import React, { Fragment, useState } from 'react';
import styled from '@emotion/styled';

const Label = styled.label`
  font-family: 'Yusei Magic', sans-serif;
  color: #fff;
  text-transform: uppercase;
  font-weight: bold;
  font-size: 1.4rem;
  margin-top: 2rem;
  display: block;
`;

const Select = styled.select`
  font-family: 'Yusei Magic', sans-serif;
  width: 100%;
  display: block;
  padding: 1rem;
  --webkit-appearance: none;
  border-radius: 10px;
  border: none;
  font-size: 1.2rem;
`;

const useMoneda = (label, stateInicial, opciones) => {
  //state de nuestro hook
  const [state, actualizarState] = useState(stateInicial);

  const Seleccionar = () => (
    <Fragment>
      <Label>{label}</Label>
      <Select onChange={(e) => actualizarState(e.target.value)} value={state}>
        <option value="">-Seleccione-</option>
        {opciones.map((opcion) => (
          <option key={opcion.codigo} value={opcion.codigo}>
            {opcion.nombre}
          </option>
        ))}
      </Select>
    </Fragment>
  );

  //retornar state, interfaz y fn q modific el state
  return [state, Seleccionar, actualizarState];
};

export default useMoneda;
