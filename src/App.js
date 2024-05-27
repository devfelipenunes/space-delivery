import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import RegisterAddress from "./pages/RegisterAddress";
import EditAddress from "./pages/EditAddress";
import Delivery from "./pages/Delivery";
import Menu from "./components/Menu";
import DeliveryList from "./pages/DeliveryList";

function App() {
  return (
    <Router>
      <Menu />
      <Routes>
        <Route
          path="/register"
          element={<RegisterAddress />}
        />
        <Route
          path="/edit"
          element={<EditAddress />}
        />
        <Route
          path="/delivery"
          element={<Delivery />}
        />
        <Route
          path="/deliveryList"
          element={<DeliveryList />}
        />
        <Route
          path="/"
          element={<h1>Welcome to Space Delivery</h1>}
        />
      </Routes>
    </Router>
  );
}

export default App;
