import React, { useState, useEffect } from "react";
import NavT from "../components/NavT";
import CardDateSelect from "../components/CardDateSelect";
import ChartDate from "../components/ChartDate";
import { useNavigate } from "react-router-dom";
import ButtonSecurityNav from "../components/ButtonSecurityNav";
import { isTokenExpired } from "../components/utils/jwtUtil";

function BuscarFecha() {
  const dia = localStorage.getItem("fecha");
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  const [authenticated, setAuthenticated] = useState(false);
  const [dateFind,setDateFind] = useState(true)

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
      {authenticated && (
        <>
          <NavT />
          <ButtonSecurityNav />
          <div className="flex justify-center mt-8">
            <CardDateSelect />
          </div>
          {dia === null ? (
            <div className="h-[42rem] text-center"> 
              <h3 className="mt-8 text-2xl">Selecciona un día</h3>
            </div>
          
          ) : !dateFind ?(
            <>
             <div className="h-[42rem] text-center">
              <h1 className="mt-8 text-xl">No se encontraron registros para el día {dia}</h1>
             </div>
            </>
          ) : (
            <>
            <h1 className="text-center text-2xl mt-6">
              Historial del dia {dia}
            </h1>

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
      )}
    </>
  );
}

export default BuscarFecha;
