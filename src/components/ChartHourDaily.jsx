// src/ChartHourDaily.js
import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import axios from "axios";
import io from "socket.io-client";

import "chart.js/auto";


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
  const day = date.getDate().toString().padStart(2, "0");
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
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
              },
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

  const dataAdentro = {
    labels: hours,
    datasets: [
      {
        label: `Personas que pasan ${lugar} del negocio`,
        data: peopleCounts,
        fill: false,

        backgroundColor: "rgba(253, 72, 0, 0.2)",
        borderColor: "#fd4800",

        borderWidth: 2,
      },
    ],
  };

  const dataAfuera = {
    labels: hours,
    datasets: [
      {
        label: `Personas que pasan ${lugar} del negocio`,
        data: peopleCountsOut,
        fill: false,

        backgroundColor: "rgba(253, 72, 0, 0.2)",
        borderColor: "#fd4800",
        borderWidth: 2,
        pointRadius: 3, // Ajusta el tamaño de los puntos aquí
        pointHoverRadius: 6, // Ajusta el tamaño de los puntos cuando el cursor está sobre ellos
        pointBackgroundColor: "#fd4800",

      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      tooltip: {
        callbacks: {
          label: function (context) {

            let label1 = "Número de personas";

            if (label1) {
              label1 += ": ";

            }
            if (context.parsed.y !== null) {
              label1 += `${context.parsed.y}`;
            }
            return label1;
          },
        },
      },
    },
    scales: {
      x: {
        title: {
          display: true,

          text: "Hora",

        },
      },
      y: {
        title: {
          display: true,

          text: "Número de personas",

        },
        beginAtZero: true,
      },
    },
    elements: {
      point: {
        hitRadius: 20, // Aumenta el área de interacción del punto
      },
    },
  };

  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />

      <div
        style={{ height: "400px", width: "100%" }}
        className="flex justify-center sm:p-4 sm:min-h-[400px] md:p-16 md:min-h-[700px]"
      >

        {lugar === "afuera" ? (
          <Line data={dataAfuera} options={options} />
        ) : (
          <Line data={dataAdentro} options={options} />
        )}
      </div>
    </ThemeProvider>
  );
}
