import React from 'react';
import { useSpring, animated } from 'react-spring';

const AnimatedText = () => {
  const styles = useSpring({
    opacity: 1,
    from: { opacity: 0 },
  });

  return (
    <animated.div style={styles}>
      <h1>Sua Palavra Animada</h1>
    </animated.div>
  );
};

export default AnimatedText;