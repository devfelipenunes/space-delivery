import React, { useRef, useEffect, useState } from "react";
import { useFrame } from "@react-three/fiber";
import { TextureLoader } from "three";
import * as THREE from "three";

function Earth({ onPointClick }) {
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

  const handleClick = (event) => {
    const { x, y, z } = event.point;
    onPointClick([x, y, z]);
  };

  return (
    <mesh
      ref={earthRef}
      position={[2, 0, 0]}
      onClick={handleClick}
    >
      <sphereGeometry args={[1, 32, 32]} />
      {texture && <meshStandardMaterial map={texture} />}
    </mesh>
  );
}

export default Earth;
