import React, { useRef, useEffect, useState } from "react";
import { useFrame } from "@react-three/fiber";
import { TextureLoader } from "three";
import * as THREE from "three";

function Earth({ lots, onLotClick }) {
  const earthRef = useRef();
  const [texture, setTexture] = useState(null);

  useEffect(() => {
    new TextureLoader().load(
      "https://www.solarsystemscope.com/textures/download/2k_earth_daymap.jpg",
      (loadedTexture) => {
        setTexture(loadedTexture);
      }
    );
  }, []);

  useFrame(() => {
    if (earthRef.current) {
      earthRef.current.rotation.y += 0.005;
    }
  });

  return (
    <mesh
      ref={earthRef}
      position={[2, 0, 0]}
    >
      <sphereGeometry args={[1, 32, 32]} />
      {texture && <meshStandardMaterial map={texture} />}
      {lots.map((lot, index) => (
        <mesh
          key={index}
          position={lot.position}
          onClick={() => onLotClick(lot.id)}
        >
          <sphereGeometry args={[0.05, 32, 32]} />
          <meshStandardMaterial color={lot.color} />
        </mesh>
      ))}
    </mesh>
  );
}

export default Earth;
