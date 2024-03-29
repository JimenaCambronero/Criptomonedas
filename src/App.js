import React, {useState, useEffect} from 'react';
import styled from '@emotion/styled';
import axios from 'axios';
import imagen from './cryptomonedas.png';
import Formulario from './components/Formulario';
import Cotizacion from './components/Cotizacion';
import Spinner from './components/Spinner';
import Footer from './components/Footer';
const ContenedorPagina= styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`;
const Contenedor = styled.div`
  max-width: 80%;
  margin: 0 auto;
  position: relative;
  justify-items: center;
  align-items: center;
  @media (min-width:992px) {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    column-gap: 2rem;
    margin:auto;
  }
`;

const Imagen = styled.img`
  max-width: 100%;
  margin-top: 5rem;
`;
const Heading = styled.h1`
  font-family: 'Bebas Neue', cursive;
  color: black;
  text-align:left;
  font-weight: 700;
  font-size: 30px;
  margin-bottom: 50px;
  margin-top: 80px;
  &::after {
    content: '';
    width: 100px;
    height: 6px;
    background-color: orange;
    display:block;
  }
`;

function App() {

  const [moneda, guardarMoneda] = useState('');
  const [criptomoneda, guardarCriptomoneda] = useState('');
  const [resultado, guardarResultado] = useState({});
  const [cargando, guardarCargando] = useState(false);

  useEffect( () => {

      const cotizarCriptomoneda = async () => {
          // evitamos la ejecución la primera vez
          if(moneda === '') return;

          // consultar la api para obtener la cotizacion
          const url = `https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${criptomoneda}&tsyms=${moneda}`;

          const resultado = await axios.get(url);

          // mostrar el spinner
          guardarCargando(true);

          // ocultar el spinner y mostrar el resultado
          setTimeout(() => {

            // cambiar el estado de cargando
            guardarCargando(false);

            // guardar cotizacion
            guardarResultado(resultado.data.DISPLAY[criptomoneda][moneda] );
          }, 3000);

          
      }
      cotizarCriptomoneda();
  }, [moneda, criptomoneda]);

  // Mostrar spinner o resultado
  const componente = (cargando) ? <Spinner /> :  <Cotizacion  resultado={resultado} />

  return (
    <>
   <ContenedorPagina>
   <Contenedor>
        <div>
          <Imagen 
            src={imagen}
            alt="imagen cripto"
          />
        </div>
        <div>
            <Heading>Cotiza Criptomonedas al Instante</Heading>

            <Formulario 
              guardarMoneda={guardarMoneda}
              guardarCriptomoneda={guardarCriptomoneda}
            />

            {componente}
            
        </div>
    </Contenedor>
    <Footer/>
   </ContenedorPagina>
    
    </>
  );
}

export default App;

