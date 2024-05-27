import React, { useState, useEffect } from "react";
import { Canvas } from "@react-three/fiber";
import Mars from "../components/Mars";

export default function RegisterAddress() {
  const [address, setAddress] = useState("");
  const [name, setName] = useState("");
  const [lots, setLots] = useState([]);

  useEffect(() => {
    const savedLots = JSON.parse(localStorage.getItem("marsLots")) || [];
    setLots(savedLots);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const phi = Math.random() * Math.PI;
    const theta = Math.random() * 2 * Math.PI;
    const radius = 1.05; // Slightly above the surface
    const x = radius * Math.sin(phi) * Math.cos(theta);
    const y = radius * Math.sin(phi) * Math.sin(theta);
    const z = radius * Math.cos(phi);

    const newLot = {
      id: address,
      name: name,
      position: [x, y, z],
      color: "#" + Math.floor(Math.random() * 16777215).toString(16),
    };

    const updatedLots = [...lots, newLot];
    setLots(updatedLots);
    localStorage.setItem("marsLots", JSON.stringify(updatedLots));
    setAddress("");
    setName("");
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: "2rem",
        backgroundColor: "#f0f0f0",
        borderRadius: "10px",
        boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
        maxWidth: "600px",
        margin: "0 auto",
      }}
    >
      <h1
        style={{
          marginBottom: "1rem",
          fontSize: "2rem",
          color: "#333",
        }}
      >
        Register Address
      </h1>
      <Canvas
        style={{
          width: "100%",
          height: "400px",
          marginBottom: "1rem",
          backgroundColor: "#fff",
          borderRadius: "10px",
        }}
      >
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} />
        <Mars
          lots={lots}
          onLotClick={(lotId) => {
            console.log("Lot clicked:", lotId);
          }}
        />
      </Canvas>
      <form
        onSubmit={handleSubmit}
        style={{
          display: "flex",
          flexDirection: "column",
          width: "100%",
        }}
      >
        <label
          style={{
            marginBottom: "0.5rem",
            fontSize: "1rem",
            color: "#333",
          }}
        >
          Name:
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            style={{
              padding: "0.5rem",
              marginBottom: "1rem",
              borderRadius: "5px",
              border: "1px solid #ccc",
              fontSize: "1rem",
              width: "100%",
            }}
          />
        </label>
        <label
          style={{
            marginBottom: "0.5rem",
            fontSize: "1rem",
            color: "#333",
          }}
        >
          Address (4 digits):
          <input
            type="text"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            maxLength="4"
            required
            style={{
              padding: "0.5rem",
              marginBottom: "1rem",
              borderRadius: "5px",
              border: "1px solid #ccc",
              fontSize: "1rem",
              width: "100%",
            }}
          />
        </label>
        <button
          type="submit"
          style={{
            padding: "0.75rem",
            borderRadius: "5px",
            border: "none",
            backgroundColor: "#007BFF",
            color: "#fff",
            fontSize: "1rem",
            cursor: "pointer",
            transition: "background-color 0.3s",
          }}
        >
          Register
        </button>
      </form>
    </div>
  );
}
