import React, { useState, useEffect } from "react";
import NavT from "../components/NavT";
import ButtonSecurityNav from "../components/ButtonSecurityNav";
import { useNavigate } from "react-router-dom";

import ChartHourDaily from "../components/ChartHourDaily";

import CardDateSelect from "../components/CardDateSelect";

import { isTokenExpired } from "../components/utils/jwtUtil";

function Home() {
  localStorage.removeItem("fecha");

  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    const isAuthenticated = token !== null;
    setAuthenticated(isAuthenticated);

    if (!isAuthenticated) {
      navigate("/");
    }
  }, [navigate, token]);

  useEffect(() => {
    if (isTokenExpired(token)) {
      console.log("Token caducado.");
      navigate("/");
    }
  }, []);

  return (
    <>
      {/* {authenticated && ( */}
        <>
          <NavT />
          <ButtonSecurityNav />

          <div className="flex justify-center mt-14 mb-6">
            <CardDateSelect />
          </div>

          <h1 className="text-center mt-12 text-4xl">Tráfico Diario </h1>

          <h2 className="text-center mt-12 text-2xl">
            Personas que pasan fuera del negocio
          </h2>
          <ChartHourDaily lugar="afuera" />

          <h2 className="text-center text-2xl">
            Personas que entran al negocio
          </h2>
          <ChartHourDaily lugar="adentro" />
        </>
      {/* )} */}
    </>
  );
}

export default Home;
