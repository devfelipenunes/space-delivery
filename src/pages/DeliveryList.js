import React, { useState, useEffect } from "react";

export default function DeliveryList() {
  const [deliveries, setDeliveries] = useState([]);

  useEffect(() => {
    const savedDeliveries =
      JSON.parse(localStorage.getItem("deliveries")) || [];

    setDeliveries(savedDeliveries);
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h1 style={{ fontSize: "24px", marginBottom: "20px" }}>Delivery List</h1>
      {deliveries?.length > 0 ? (
        <ul style={{ listStyle: "none", padding: 0 }}>
          {deliveries?.map((delivery, index) => (
            <li
              key={index}
              style={{
                border: "1px solid #ccc",
                borderRadius: "5px",
                padding: "10px",
                marginBottom: "10px",
              }}
            >
              <h2 style={{ fontSize: "20px", marginBottom: "5px" }}>
                Delivery {index + 1}
              </h2>
              <p style={{ margin: 0 }}>Food: {delivery.food.name}</p>
              <p style={{ margin: 0 }}>
                Mars Lot Name: {delivery?.marsLot?.name}
              </p>
            </li>
          ))}
        </ul>
      ) : (
        <p>No deliveries yet.</p>
      )}
    </div>
  );
}
