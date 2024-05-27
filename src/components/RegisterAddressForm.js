import React, { useState } from "react";

const RegisterAddressForm = ({ onAddAddress }) => {
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name && address) {
      onAddAddress(name, address);
      setName("");
      setAddress("");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div style={{ marginBottom: "1rem" }}>
        <label
          style={{
            display: "block",
            fontSize: "0.875rem",
            fontWeight: "bold",
            marginBottom: "0.5rem",
          }}
        >
          Name:
        </label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          style={{
            padding: "0.5rem",
            border: "1px solid #D1D5DB",
            borderRadius: "0.25rem",
            width: "100%",
            boxSizing: "border-box",
          }}
          required
        />
      </div>
      <div style={{ marginBottom: "1rem" }}>
        <label
          style={{
            display: "block",
            fontSize: "0.875rem",
            fontWeight: "bold",
            marginBottom: "0.5rem",
          }}
        >
          Address:
        </label>
        <input
          type="text"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          style={{
            padding: "0.5rem",
            border: "1px solid #D1D5DB",
            borderRadius: "0.25rem",
            width: "100%",
            boxSizing: "border-box",
          }}
          required
        />
      </div>
      <button
        type="submit"
        style={{
          backgroundColor: "#2563EB",
          color: "#FFFFFF",
          padding: "0.5rem 1rem",
          borderRadius: "0.25rem",
          border: "none",
          cursor: "pointer",
        }}
      >
        Register
      </button>
    </form>
  );
};

export default RegisterAddressForm;
