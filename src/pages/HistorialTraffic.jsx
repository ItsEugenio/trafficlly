import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import GridCards from "../components/GridCards";
import ChartWeek from "../components/ChartWeek";
import NavT from "../components/NavT";
import { format, startOfWeek, subDays, isSunday } from "date-fns";
import axios from "axios";
import ButtonSecurityNav from "../components/ButtonSecurityNav";
import { urls } from "../components/utils/urlsLocal";
import { isTokenExpired } from "../components/utils/jwtUtil";
function HistorialTraffic() {
  const [lastSunday, setLastSunday] = useState("");
  const token = localStorage.getItem("token");
  const [diaPro, setDiaPro] = useState("");
  const [diaConc, setDiaConc] = useState("");
  const [horaC, setHorac] = useState("");
  const [personasC, setPersonasC] = useState(0);

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
    const today = new Date();

    let lastSundayDate;
    if (isSunday(today)) {
      lastSundayDate = today;
    } else {
      const startOfThisWeek = startOfWeek(today, { weekStartsOn: 1 }); // assuming week starts on Monday
      lastSundayDate = subDays(startOfThisWeek, 1);
    }
    const formattedDate = format(lastSundayDate, "yyyy-MM-dd");
    setLastSunday(formattedDate);
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      if (token && lastSunday) {
        try {
          const response = await axios.get(
            `${urls.backTrafficlly}/probabilidades?fecha=${lastSunday}`,
            {
              headers: {
                Authorization: `${token}`,
              },
            }
          );
          setDiaPro(response.data[0].dia);
        } catch (error) {
          console.log(error);
        }
      }
    };
    fetchData();
  }, [token, lastSunday]);

  useEffect(() => {
    const fetchData = async () => {
      if (token && lastSunday) {
        try {
          const response = await axios.get(
            `${urls.backTrafficlly}/concurrencias?fecha=${lastSunday}&lugar=ambos`,
            {
              headers: {
                Authorization: `${token}`,
              },
            }
          );
          setDiaConc(response.data[0].dia);
          setHorac(response.data[0].hora);
          setPersonasC(response.data[0].numero_personas);
        } catch (error) {
          console.log(error);
        }
      }
    };
    fetchData();
  }, [token, lastSunday]);

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
          <h1 className="text-center mt-14 text-4xl mb-12">Estadísticas</h1>
          <div className="flex justify-center mt-6">
            <GridCards
              diaTime={diaPro}
              diaConcu={diaConc}
              horaConcu={horaC}
              personasConcu={personasC}
            />
          </div>

          <h1 className="text-center mt-14 text-2xl">
            Personas que pasan por el local
          </h1>
          <ChartWeek lugar="afuera" />
          <h1 className="text-center mt-8 text-2xl">
            Personas que entran al local
          </h1>
          <ChartWeek lugar="adentro" />
        </>
      )}
    </>
  );
}

export default HistorialTraffic;
