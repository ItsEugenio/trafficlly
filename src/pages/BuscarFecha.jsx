import React, { useState, useEffect } from "react";
import NavT from "../components/NavT";
import CardDateSelect from "../components/CardDateSelect";
import ChartDate from "../components/ChartDate";
import { useNavigate } from "react-router-dom";

function BuscarFecha() {
  const dia = localStorage.getItem("fecha");
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    const isAuthenticated = token !== null;
    setAuthenticated(isAuthenticated);
    console.log("tokeeen", token);

    if (!isAuthenticated) {
      navigate("/");
    }
  }, [navigate, token]);

  return (
    <>
      {authenticated && (
        <>
          <NavT />
          <div className="flex justify-center">
            <CardDateSelect />
          </div>

          <h1 className="text-center text-2xl mt-6">Historial del dia {dia}</h1>

          <h2 className="text-center mt-12 text-2xl">
            Personas que pasan fuera del negocio
          </h2>

          <ChartDate lugar="afuera" />
          <h2 className="text-center mt-12 text-2xl">
            Personas que entran al negocio
          </h2>

          <ChartDate lugar="adentro" />
        </>
      )}
    </>
  );
}

export default BuscarFecha;
