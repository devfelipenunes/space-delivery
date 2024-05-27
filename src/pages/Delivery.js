import React, { useState, useEffect } from "react";
import { Canvas } from "@react-three/fiber";
import Mars from "../components/Mars";
import Earth from "../components/Earth";
import * as THREE from "three";
import Modal from "react-modal";
import { Link, useNavigate } from "react-router-dom";

const foods = [
  {
    id: 1,
    name: "Pizza",
    image:
      "https://www.minhareceita.com.br/app/uploads/2022/12/pizza-de-pepperoni-caseira-portal-minha-receita.jpg",
  },
  {
    id: 2,
    name: "Burger",
    image:
      "https://img.freepik.com/fotos-gratis/hamburguer-saboroso-isolado-no-fundo-branco-fastfood-de-hamburguer-fresco-com-carne-e-queijo_90220-1063.jpg?size=338&ext=jpg&ga=GA1.1.1700460183.1712448000&semt=sph",
  },
  {
    id: 3,
    name: "Sushi",
    image:
      "https://ik.imagekit.io/fredmaiaarantes/FoodSite/taresushi/IMG-20200804-WA0092_a5d1mTRcn.jpg?ik-sdk-version=javascript-1.4.3&updatedAt=1644879450443&tr=w-1628%2Ch-1228%2Cfo-auto",
  },
];

Modal.setAppElement("#root");

export default function Delivery() {
  const [marsLots, setMarsLots] = useState([]);
  const [selectedMarsLot, setSelectedMarsLot] = useState(null);
  const [selectedEarthPoint, setSelectedEarthPoint] = useState(null);
  const [selectedFood, setSelectedFood] = useState(null);
  const [availableLocations, setAvailableLocations] = useState([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [deliveries, setDeliveries] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    const savedMarsLots = JSON.parse(localStorage.getItem("marsLots")) || [];
    setMarsLots(savedMarsLots);

    const savedDeliveries =
      JSON.parse(localStorage.getItem("deliveries")) || [];
    setDeliveries(savedDeliveries);
  }, []);

  const handleMarsLotClick = (id) => {
    console.log("Selected Mars Lot:", id);
    setSelectedMarsLot(id);

    const selectedLot = marsLots.find((lot) => {
      return lot.id === id; // Certifique-se de que estamos verificando o ID correto aqui
    });

    const newDelivery = {
      marsLot: selectedLot,
      food: selectedFood,
    };

    const updatedDeliveries = [...deliveries, newDelivery];
    setDeliveries(updatedDeliveries);
    localStorage.setItem("deliveries", JSON.stringify(updatedDeliveries));

    closeModal();
    console.log("New Delivery:", newDelivery);
    navigate("/deliveryList");
  };

  const handleEarthPointClick = (point) => {
    setSelectedEarthPoint(point);
  };

  const handleFoodSelect = (food) => {
    setSelectedFood(food);
    const locations = marsLots.map((lot) => lot.id);
    setAvailableLocations(locations);
    openModal();
  };

  const renderLine = () => {
    if (selectedMarsLot && selectedEarthPoint) {
      const marsLot = marsLots.find((lot) => lot.id === selectedMarsLot);

      if (marsLot) {
        const points = [
          new THREE.Vector3(...marsLot.position),
          new THREE.Vector3(...selectedEarthPoint),
        ];
        const geometry = new THREE.BufferGeometry().setFromPoints(points);
        const material = new THREE.LineBasicMaterial({ color: 0x0000ff });
        return (
          <line
            geometry={geometry}
            material={material}
          />
        );
      }
    }
    return null;
  };

  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: "1rem",
      }}
    >
      <h1>Delivery</h1>
      <div>
        <h2>Select Food</h2>
        {foods.map((food) => (
          <div
            key={food.id}
            onClick={() => handleFoodSelect(food)}
            style={{
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexDirection: "column",
              border: "1px solid #ccc",
              borderRadius: 5,
              padding: 10,
              margin: 10,
              backgroundColor: "#f9f9f9",
              boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
              width: 100,
            }}
          >
            <img
              src={food.image}
              alt={food.name}
              style={{
                width: 50,
                height: 50,
                borderRadius: "50%", // Torna a imagem circular
                marginBottom: 10,
              }}
            />
            <p style={{ margin: 0 }}>{food.name}</p>
          </div>
        ))}
      </div>

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={{
          overlay: {
            backgroundColor: "rgba(0, 0, 0, 0.5)",
          },
          content: {
            backgroundColor: "#fff",
            border: "none",
            borderRadius: 5,
            maxWidth: 300,
            maxHeight: 400,
            margin: "auto",
            padding: 20,
          },
        }}
      >
        {selectedFood && (
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              flexDirection: "row",
              border: "1px solid #ccc",
              borderRadius: 5,
              padding: 10,
              margin: 10,
              backgroundColor: "#f9f9f9",
            }}
          >
            <img
              src={selectedFood.image}
              alt={selectedFood.name}
              style={{ width: 50, height: 50 }}
            />
            <h2> {selectedFood.name}</h2>
          </div>
        )}
        {marsLots.length > 0 ? (
          <>
            <h2>Select Destination on Mars</h2>
            <Canvas style={{ width: 300, height: 300 }}>
              <ambientLight intensity={0.5} />
              <pointLight position={[10, 10, 10]} />
              <Mars
                lots={marsLots}
                onLotClick={handleMarsLotClick}
              />
            </Canvas>
          </>
        ) : (
          <>
            <p>No Mars Lots found.</p>
            <button>
              <Link to="/register">Create Mars Lot</Link>
            </button>
          </>
        )}
        <button onClick={closeModal}>Close</button>
      </Modal>
      {/* <Canvas>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} />
        <Mars
          lots={marsLots}
          onLotClick={handleMarsLotClick}
        />
        <Earth onPointClick={handleEarthPointClick} />
        {renderLine()}
      </Canvas> */}
    </div>
  );
}
