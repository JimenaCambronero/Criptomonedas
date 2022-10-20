import React from 'react';
import styled from '@emotion/styled';

const ResultadoDiv= styled.div`
    color: black;
    font-family: Arial, Helvetica, sans-serif;
    font-weight:bold;
`;

const Info = styled.p`
    font-size: 15px;
        span{
            font-weight:bold;
        }
`;

const Precio = styled.p`
    font-size:20px,
    span{
        font-weight:bold;
    }
`;


const Cotizacion = ({resultado}) => {

    if(Object.keys(resultado).lenght === 0)return null;

  return (
    <ResultadoDiv>
        <Precio>El precio es: <span>{resultado.PRICE}</span></Precio>
        <Info>El precio más alto del día es: <span>{resultado.HIGHDAY}</span></Info>
        <Info>El precio más bajo del día es: <span>{resultado.LOWDAY}</span></Info>
        <Info>La última actualización fue: <span>{resultado.LASTUPDATE}</span></Info>
    </ResultadoDiv>
  );
}

export default Cotizacion;