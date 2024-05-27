import React from "react";
import { Link } from "react-router-dom";

const Menu = () => {
  return (
    <nav
      style={{
        backgroundColor: "#4B5563",
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "1rem",
      }}
    >
      <div style={{ display: "flex", alignItems: "center" }}>
        <p>ICON</p>
      </div>
      <div style={{ display: "flex", alignItems: "center" }}>
        <Link
          to="/delivery"
          style={{ margin: "0 1rem", color: "white", textDecoration: "none" }}
        >
          Delivery
        </Link>
        <Link
          to="/register"
          style={{ margin: "0 1rem", color: "white", textDecoration: "none" }}
        >
          Register Address
        </Link>
        <Link
          to="/deliveryList"
          style={{ margin: "0 1rem", color: "white", textDecoration: "none" }}
        >
          DeliveryList
        </Link>
      </div>
    </nav>
  );
};

export default Menu;
