import React, { useState, useEffect } from "react";
import { LineChart } from "@mui/x-charts/LineChart";
import axios from "axios";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

const days = [
  "Lunes",
  "Martes",
  "Miercoles",
  "Jueves",
  "Viernes",
  "Sabado",
  "Domingo",
];

const dataChart = [15, 88, 35, 70, 33, 6, 44];

function ChartWeek({ lugar }) {
  const [data, setData] = useState([]);
  const [idKitWeek, setIdKitWeek] = useState("");
  const [tokenWeek, setTokenWeek] = useState("");

  useEffect(() => {
    setIdKitWeek(localStorage.getItem("kitTra"));
    setTokenWeek(localStorage.getItem("token"));
  }, []);
  useEffect(() => {
    const fetchData = async () => {
      if (idKitWeek && tokenWeek) {
        try {
          const response = await axios.get(
            `https://trafficllymain.zapto.org/registro/week?lugar=${lugar}&idKit=12345`,
            {
              headers: {
                Authorization: tokenWeek,
              },
            }
          );
          setData(response.data);
          
        } catch (error) {
          console.error("Error al obtener datos:", error);
        }
      }
    };

    fetchData();
  }, [lugar, idKitWeek, tokenWeek]);

  const personas = data.weekData;
  const personasFormated = [];
  for (let day in personas) {
    if (personas.hasOwnProperty(day)) {
      personasFormated.push(personas[day]);
    }
  }
 

  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <div className="flex justify-center">
        <LineChart
          xAxis={[{ scaleType: "point", curve: "linear", data: days }]}
          series={[
            {
              curve: "linear",
              label: `Trafico de la semana ${lugar} del local`,
              data: personasFormated,
              color: "#00b1fd",
            },
          ]}
          width={800}
          height={400}
        />
      </div>
    </ThemeProvider>
  );
}

export default ChartWeek;
