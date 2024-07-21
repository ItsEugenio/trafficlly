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

const hours = [
  "00:00", "01:00", "02:00", "03:00", "04:00", "05:00", "06:00", "07:00",
  "08:00", "09:00", "10:00", "11:00", "12:00", "13:00", "14:00", "15:00",
  "16:00", "17:00", "18:00", "19:00", "20:00", "21:00", "22:00", "23:00"
];

const ChartDate = ({ lugar }) => {
  const [data, setData] = useState([]);
  const date = localStorage.getItem("fecha");
  const idKit = localStorage.getItem("kitTra");
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchData = async () => {
      if (date && idKit && token) {
        try {
          const response = await axios.get(
            `https://trafficllymain.zapto.org/registro?fecha=${date}&lugar=${lugar}&idKit=${idKit}`,
            {
              headers: {
                Authorization: token,
              }
            }
          );

          const filteredData = processResponseData(response.data);
          setData(filteredData);
        } catch (error) {
          console.error("Error al obtener datos:", error);
        }
      }
    };

    fetchData();
  }, [date, lugar, idKit, token]);

  const processResponseData = (data) => {
    const filteredData = {};

    data.forEach(item => {
      if (!filteredData[item.hora] || filteredData[item.hora].numero_personas < item.numero_personas) {
        filteredData[item.hora] = item;
      }
    });

    return Object.values(filteredData).sort((a, b) => {
      return hours.indexOf(a.hora) - hours.indexOf(b.hora);
    });
  };

  const personas = data.map(item => item.numero_personas);
  const horas = data.map(item => item.hora);

  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <div className="flex justify-center">
        <LineChart
          xAxis={[{ scaleType: "point", curve: "linear", data: horas }]}
          series={[
            {
              curve: "linear",
              label: `Personas que pasan ${lugar} del local`,
              data: personas,
              color: "#fd4800",
            }
          ]}
          width={800}
          height={400}
        />
      </div>
    </ThemeProvider>
  );
};

export default ChartDate;
