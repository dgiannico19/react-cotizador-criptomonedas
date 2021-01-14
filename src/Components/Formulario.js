import React, { useEffect, useState } from 'react';
import styled from '@emotion/styled';

import Error from './Error';
import useMoneda from '../Hooks/useMoneda';
import useCriptomoneda from '../Hooks/useCriptomoneda';
import axios from 'axios';

const Boton = styled.input`
  font-family: 'Yusei Magic', sans-serif;
  margin-top: 20px;
  font-weight: bold;
  font-size: 20px;
  padding: 10px;
  background-color: #66a2fe;
  border: none;
  width: 100%;
  border-radius: 10px;
  color: #fff;
  transition: background-color 0.3s ease;
  &:hover {
    background-color: #326ac0;
    cursor: pointer;
  }
`;
const Formulario = ({ guardarMoneda, guardarCriptomoneda }) => {
  //stat del listado de criptomonedas
  const [listacripto, guardarCriptomonedas] = useState([]);
  const [error, guardarError] = useState(false);

  const MONEDAS = [
    { codigo: 'USD', nombre: 'Dolar de Estados Unidos' },
    { codigo: 'MXN', nombre: 'Peso Mexicano' },
    { codigo: 'EUR', nombre: 'Euro' },
    { codigo: 'GBP', nombre: 'Libra Esterlina' },
    { codigo: 'ARS', nombre: 'Peso Argentino' },
    { codigo: 'AUD', nombre: 'Dolar de Australia' },
    { codigo: 'COP', nombre: 'Peso Colombiano' },
  ];
  //usar useMoneda
  const [moneda, SelectMonedas] = useMoneda('Elige tu moneda: ', '', MONEDAS);

  //usar useCriptomoneda
  const [criptomoneda, SelectCripto] = useCriptomoneda(
    'Elige tu criptomoneda',
    '',
    listacripto
  );

  //ejecutar llamado a la api
  useEffect(() => {
    const consultarAPI = async () => {
      const url =
        'https://min-api.cryptocompare.com/data/top/mktcapfull?limit=10&tsym=USD';

      const resultado = await axios.get(url);

      guardarCriptomonedas(resultado.data.Data);
    };
    consultarAPI();
  }, []);

  //cuando el usuario hace submit
  const cotizarMoneda = (e) => {
    e.preventDefault();

    //validar campos llenos
    if (moneda === '' || criptomoneda === '') {
      guardarError(true);
      return;
    }

    //pasar datos al componente principal
    guardarError(false);
    guardarMoneda(moneda);
    guardarCriptomoneda(criptomoneda);
  };

  return (
    <form onSubmit={cotizarMoneda}>
      {error ? <Error mensaje="Faltan campos Conan!!" /> : null}
      <SelectMonedas />
      <SelectCripto />

      <Boton type="submit" value="Calcular" />
    </form>
  );
};

export default Formulario;
