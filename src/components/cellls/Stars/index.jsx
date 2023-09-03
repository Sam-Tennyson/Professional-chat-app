// Stars.js
import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';

const Stars = ({ position }) => {
  const ref = useRef();

  // Randomly move stars on every frame
  useFrame(() => {
    if (ref.current) {
      ref.current.position.x += Math.random() * 0.01 - 0.005;
      ref.current.position.y += Math.random() * 0.01 - 0.005;
    }
  });

  return (
    <mesh ref={ref} position={position}>
      <sphereBufferGeometry args={[0.1, 8, 8]} />
      <meshBasicMaterial color="white" />
    </mesh>
  );
};

export default Stars;
