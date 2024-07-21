import React from "react";
import ReactDOM from "react-dom/client";
import About from "./pages/About.jsx";
import Login from "./pages/Login.jsx";
import KitsTrafficlly from "./pages/KitsTrafficlly.jsx";
import Home from "./pages/Home.jsx";
import Security from "./pages/Security/Security.jsx";
import ReportsKit from "./pages/Security/ReportsKit.jsx";
import BuscarFecha from "./pages/BuscarFecha.jsx";
import HistorialTraffic from "./pages/HistorialTraffic.jsx";

import "./index.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/KitsTrafficcly" element={<KitsTrafficlly />} />
        <Route path="/Home" element={<Home />} />
        <Route path="/BuscarFecha" element={<BuscarFecha />} />
        <Route path="/Estadisticas" element={<HistorialTraffic />} />

        

        <Route path="/app" element={<App />} />
        <Route path="/acerca" element={<About />} />
        <Route path="/Security" element={<Security />} />
        <Route path="/Reportes" element={<ReportsKit />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
