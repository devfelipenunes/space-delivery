import React, { useState } from "react";
import PlanetScene from "../components/Planet";

export default function EditAddress() {
  const [address, setAddress] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // Logic to handle the address edit
    console.log("Address Edited:", address);
  };

  return (
    <div>
      <h1>Edit Address</h1>
      <PlanetScene planet="earth" />
      <form onSubmit={handleSubmit}>
        <label>
          Address (4 digits):
          <input
            type="text"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            maxLength="4"
            required
          />
        </label>
        <button type="submit">Save</button>
      </form>
    </div>
  );
}
