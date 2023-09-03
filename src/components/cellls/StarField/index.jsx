// StarField.js
import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Stars } from '@react-three/drei';

const StarField = () => {
  const starFieldRef = useRef();

  // Randomly move stars on every frame
//   useFrame(() => {
    // if (starFieldRef.current) {
    //   starFieldRef.current.rotation.x += 0.0001;
    //   starFieldRef.current.rotation.y += 0.0001;
    // }
//   });

  useFrame((state, delta, xrFrame) => {
    // This function runs at the native refresh rate inside of a shared render-loop
  })

console.log(starFieldRef);

  return (
    <Canvas style={{ position: 'absolute' }}>
      <group ref={starFieldRef}>
        <Stars
        
          radius={100} // The radius of the star field
          depth={50}   // How "deep" the star field appears
          count={10000} // Number of stars
          factor={4}    // Star brightness factor
          speed={20}
        />
      </group>
      {/* Add your additional components here */}
    </Canvas>
  );
};

export default StarField;
