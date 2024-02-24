import React, { useEffect, useState } from 'react';
import { APIProvider, Map, Marker } from '@vis.gl/react-google-maps';

function Maps({ address }) {
  // Estado inicial para as coordenadas
  const [position, setPosition] = useState({ lat: -23.55052, lng: -46.633308 }); // Coordenadas iniciais de um local padrão (São Paulo, por exemplo)
  
  // Função para obter coordenadas a partir de um endereço
  async function getCoordinatesForAddress(address) {
    // Acesso à variável de ambiente diretamente de process.env
    const apiKey = process.env.REACT_APP_API_GOOGLE_MAPS;
    const response = await fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}&key=${apiKey}`);
    const data = await response.json();
    
    if (data.status === 'OK') {
      const { lat, lng } = data.results[0].geometry.location;
      setPosition({ lat, lng });
    } else {
      throw new Error('Não foi possível encontrar o endereço');
    }
  }

  // useEffect para chamar getCoordinatesForAddress quando o componente é montado ou quando o endereço muda
  useEffect(() => {
    getCoordinatesForAddress(address).catch(console.error);
  }, [address]);

  return (
    <APIProvider apiKey={process.env.REACT_APP_API_GOOGLE_MAPS}>
      <Map center={position} zoom={11} style={{ width: '100%', height: '100px' }}>
        <Marker position={position} />
      </Map>
    </APIProvider>
  );
}

export default Maps;
