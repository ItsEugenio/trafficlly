import React, { useEffect, useState } from "react";
import { LineChart } from "@mui/x-charts/LineChart";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import io from "socket.io-client";
import axios from "axios";

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

const socket = io("https://websockettrafficlly.zapto.org");

const formatDate = (date) => {
  const day = date.getDate().toString().padStart(2, '0');
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const year = date.getFullYear();
  return `${year}-${month}-${day}`;
};

const getCurrentHourIndex = () => {
  const now = new Date();
  return now.getHours();
};

const ChartHourDaily = ({ lugar }) => {
  const [data, setData] = useState(Array(24).fill(0));
  const [loading, setLoading] = useState(true);

  const idKit = localStorage.getItem("kitTra");
  const token = localStorage.getItem("token");
  const formattedDate = formatDate(new Date());

  useEffect(() => {
    if (!idKit || !token) {
      console.error("Missing idKit or token in localStorage");
      setLoading(false);
      return;
    }

    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://trafficllymain.zapto.org/registro?fecha=${formattedDate}&lugar=${lugar}&idKit=${idKit}`,
          {
            headers: {
              Authorization: token,
            }
          }
        );

        console.log("API response:", response.data);

        if (response.data && Array.isArray(response.data)) {
          const filteredData = processResponseData(response.data);
          setData(filteredData);
        } else {
          console.error("Unexpected response format:", response.data);
        }
        setLoading(false);
      } catch (error) {
        console.error("Error al obtener datos:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, [formattedDate, lugar, idKit, token]);

  useEffect(() => {
    socket.on("connect", () => {
      console.log("Conectado al servidor WebSocket");
    });

    const idSub = 12345;
    socket.emit("subscribe", idSub);

    socket.on("notificacion", (data) => {
      const { tipo, personasDentro, personasFuera } = data;
      const currentHourIndex = getCurrentHourIndex();

      if (tipo === "personasDentro" || tipo === "actualizacion") {
        setData(prevData => {
          const newData = [...prevData];
          newData[currentHourIndex] = personasDentro[currentHourIndex];
          return newData;
        });
      }

      if (tipo === "personasFuera" || tipo === "actualizacion") {
        setData(prevData => {
          const newData = [...prevData];
          newData[currentHourIndex] = personasFuera[currentHourIndex];
          return newData;
        });
      }
    });

    return () => {
      socket.off("connect");
      socket.off("notificacion");
    };
  }, []);

  const processResponseData = (data) => {
    const currentHourIndex = getCurrentHourIndex();
    const processedData = Array(24).fill(0);
    data.forEach(item => {
      const hourIndex = hours.indexOf(item.hora);
      if (hourIndex !== -1 && hourIndex <= currentHourIndex) {
        processedData[hourIndex] = item.numero_personas;
      }
    });
    return processedData;
  };

  const chartHoras = hours;

  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <div className="flex justify-center">
        {loading ? (
          <p>Cargando...</p>
        ) : (
          <LineChart
            xAxis={[{ scaleType: "point", curve: "linear", data: chartHoras }]}
            series={[
              {
                curve: "linear",
                label: `Personas que pasan ${lugar} del local`,
                data: data,
                color: "#fd4800",
              },
            ]}
            width={800}
            height={400}
          />
        )}
      </div>
    </ThemeProvider>
  );
};

export default ChartHourDaily;
