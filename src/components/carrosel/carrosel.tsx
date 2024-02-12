import React, { useState, useEffect } from 'react';

interface CarouselProps {
  images: string[];
}

const Carousel: React.FC<CarouselProps> = ({ images }) => {
  const [currentIndex, setCurrentIndex] = useState<number>(0);

  const goToPrevious = () => {
    const isFirstImage = currentIndex === 0;
    const newIndex = isFirstImage ? images.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
  };

  const goToNext = () => {
    const isLastImage = currentIndex === images.length - 1;
    const newIndex = isLastImage ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
  };

  useEffect(() => {
    const timer = setInterval(() => {
      goToNext(); // Muda para a próxima imagem automaticamente
    }, 5000);

    return () => clearInterval(timer); // Limpa o intervalo quando o componente é desmontado ou atualizado
  }, [currentIndex]); // Dependência: executa novamente quando 'currentIndex' muda

  return (
    <div className="carousel">
      <button onClick={goToPrevious}>Prev</button>
      <img src={images[currentIndex]} alt="carousel image" />
      <button onClick={goToNext}>Next</button>
    </div>
  );
};

export default Carousel;
