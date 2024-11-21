import React, { useEffect, useState } from "react";
import { LineChart } from "@mui/x-charts/LineChart";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import io from "socket.io-client";
import { urls } from "./utils/urlsLocal";
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
const socket = io(urls.webSocketTrafficlly);


const formatDate = (date) => {
  const day = date.getDate().toString().padStart(2, '0');
  const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Meses empiezan en 0
  const year = date.getFullYear();

  return `${year}-${month}-${day}`;
};

export default function TestChart({ lugar }) {
  const [peopleCounts, setPeopleCounts] = useState(Array(24).fill(0));
  const [peopleCountsOut, setPeopleCountsOut] = useState(Array(24).fill(0));

  useEffect(() => {
    // Conectar al servidor WebSocket
    socket.on("connect", () => {
      console.log("Conectado al servidor WebSocket");
    });

    // ID del cliente (puedes reemplazar esto con el ID real del cliente)
    const idSub = 12345;

    // Emitir el evento 'subscribe' con el idSub
    socket.emit("subscribe", idSub);

    socket.on("notificacion", (data) => {
      const { tipo, horas, personasDentro, personasFuera } = data;
      console.log('dataa',data)

      if (tipo === "actualizacion") {
        // Actualizar el estado inicial de peopleCounts y peopleCountsOut
        setPeopleCounts(personasDentro);
        setPeopleCountsOut(personasFuera);
      } else if (tipo === "personasDentro") {
        // Actualizar peopleCounts según el tipo de notificación
        setPeopleCounts(personasDentro);
      } else if (tipo === "personasFuera") {
        // Actualizar peopleCountsOut según el tipo de notificación
        setPeopleCountsOut(personasFuera);
      }
    });

    // Limpiar la conexión al desmontar el componente
    return () => {
      socket.off("connect");
      socket.off("notificacion");
    };
  }, []);

  const today = new Date();
  const formattedDate = formatDate(today);

  

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



