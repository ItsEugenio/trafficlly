// src/ChartHourDaily.js
import React, { useEffect, useState } from "react";
import { LineChart } from "@mui/x-charts/LineChart";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import axios from "axios";
import io from "socket.io-client";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

const hours = [
  "00:00",
  "01:00",
  "02:00",
  "03:00",
  "04:00",
  "05:00",
  "06:00",
  "07:00",
  "08:00",
  "09:00",
  "10:00",
  "11:00",
  "12:00",
  "13:00",
  "14:00",
  "15:00",
  "16:00",
  "17:00",
  "18:00",
  "19:00",
  "20:00",
  "21:00",
  "22:00",
  "23:00",
];
const socket = io("https://websockettrafficlly.zapto.org");

const formatDate = (date) => {
  const day = date.getDate().toString().padStart(2, '0');
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const year = date.getFullYear();
  return `${year}-${month}-${day}`;
};

const processResponseData = (data, lugar) => {
  const peopleCounts = Array(24).fill(0);
  data.forEach((record) => {
    if (record.lugar === lugar) {
      const hourIndex = hours.indexOf(record.hora);
      if (hourIndex !== -1) {
        peopleCounts[hourIndex] = record.numero_personas;
      }
    }
  });
  return peopleCounts;
};

export default function ChartHourDaily({ lugar }) {
  const [peopleCounts, setPeopleCounts] = useState(Array(24).fill(0));
  const [peopleCountsOut, setPeopleCountsOut] = useState(Array(24).fill(0));
  const date = formatDate(new Date());
  const idKit = localStorage.getItem("kitTra");
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchData = async (lugar) => {
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

          const filteredData = processResponseData(response.data, lugar);
          if (lugar === "adentro") {
            setPeopleCounts(filteredData);
          } else {
            setPeopleCountsOut(filteredData);
          }
        } catch (error) {
          console.error("Error al obtener datos:", error);
        }
      }
    };

    fetchData("adentro");
    fetchData("afuera");

    socket.on("connect", () => {
      console.log("Conectado al servidor WebSocket");
    });

    const idSub = 12345;
    socket.emit("subscribe", idSub);

    socket.on("notificacion", (data) => {
      const { tipo, personasDentro, personasFuera } = data;

      if (tipo === "actualizacion") {
        setPeopleCounts((prevCounts) => {
          const updatedCounts = [...prevCounts];
          personasDentro.forEach((count, index) => {
            if (count > 0) {
              updatedCounts[index] = count;
            }
          });
          return updatedCounts;
        });

        setPeopleCountsOut((prevCounts) => {
          const updatedCounts = [...prevCounts];
          personasFuera.forEach((count, index) => {
            if (count > 0) {
              updatedCounts[index] = count;
            }
          });
          return updatedCounts;
        });
      } else if (tipo === "personasDentro") {
        setPeopleCounts((prevCounts) => {
          const updatedCounts = [...prevCounts];
          personasDentro.forEach((count, index) => {
            if (count > 0) {
              updatedCounts[index] = count;
            }
          });
          return updatedCounts;
        });
      } else if (tipo === "personasFuera") {
        setPeopleCountsOut((prevCounts) => {
          const updatedCounts = [...prevCounts];
          personasFuera.forEach((count, index) => {
            if (count > 0) {
              updatedCounts[index] = count;
            }
          });
          return updatedCounts;
        });
      }
    });

    return () => {
      socket.off("connect");
      socket.off("notificacion");
    };
  }, [date, idKit, token]);

  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      {lugar === "afuera" ? (
        <div className="flex justify-center">
          <LineChart
            xAxis={[{ scaleType: "point", curve: "linear", data: hours }]}
            series={[
              {
                curve: "linear",
                label: `Personas que pasan ${lugar} del negocio`,
                data: peopleCountsOut,
                color: "#fd4800",
                tooltip: 'none'
              },
            ]}
            width={800}
            height={400}
          />
        </div>
      ) : (
        <div className="flex justify-center">
          <LineChart
            xAxis={[{ scaleType: "point", curve: "linear", data: hours }]}
            series={[
              {
                curve: "linear",
                label: `Personas que pasan ${lugar} del negocio`,
                data: peopleCounts,
                color: "#fd4800",
              },
            ]}
            width={800}
            height={400}
          />
        </div>
      )}
    </ThemeProvider>
  );
}
