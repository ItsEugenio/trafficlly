import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import About from "./pages/About.jsx";
import Login from "./pages/Login.jsx";
import Home from "./pages/Home.jsx";
import "./index.css";
import { NextUIProvider } from "@nextui-org/react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <NextUIProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/Home" element={<Home />} />

          <Route path="/app" element={<App />} />
          <Route path="/acerca" element={<About />} />
          
        </Routes>
      </BrowserRouter>
    </NextUIProvider>
  </React.StrictMode>
);
