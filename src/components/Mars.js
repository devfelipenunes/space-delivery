import React, { useRef, useEffect, useState } from "react";
import { useFrame } from "@react-three/fiber";
import { TextureLoader } from "three";
import { Html } from "@react-three/drei";

function Mars({ lots, onLotClick }) {
  const marsRef = useRef();
  const [texture, setTexture] = useState(null);

  useEffect(() => {
    new TextureLoader().load(
      "https://www.solarsystemscope.com/textures/download/2k_mars.jpg",
      (loadedTexture) => {
        setTexture(loadedTexture);
      }
    );
  }, []);

  useFrame(() => {
    if (marsRef.current) {
      marsRef.current.rotation.y += 0.015;
    }
  });

  return (
    <mesh
      ref={marsRef}
      position={[0, 0, 0]}
    >
      <sphereGeometry args={[1, 32, 32]} />
      {texture && <meshStandardMaterial map={texture} />}
      {lots.map((lot, index) => (
        <React.Fragment key={index}>
          <mesh
            position={lot.position}
            scale={[5, 5, 5]}
            onClick={() => onLotClick(lot.id)}
          >
            <sphereGeometry args={[0.05, 32, 32]} />
            <meshStandardMaterial color={lot.color} />
          </mesh>
          <Html
            position={[
              lot.position[0],
              lot.position[1] + 0.6,
              lot.position[2] + -0.3,
            ]}
            style={{
              color: "white",
              background: "rgba(0, 0, 0, 0.5)",
              padding: "2px 4px",
              borderRadius: "4px",
              whiteSpace: "nowrap",
            }}
          >
            {lot.name}
          </Html>
        </React.Fragment>
      ))}
    </mesh>
  );
}

export default Mars;
