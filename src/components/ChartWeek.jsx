import React, { useState, useEffect } from "react";
import { Bar } from "react-chartjs-2";
import axios from "axios";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import "chart.js/auto"; // Importa todos los componentes necesarios desde Chart.js
import { urls } from "./utils/urlsLocal";
const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

function ChartWeek({ lugar }) {
  const [data, setData] = useState({});
  const [idKitWeek, setIdKitWeek] = useState("");
  const [tokenWeek, setTokenWeek] = useState("");

  useEffect(() => {
    setIdKitWeek(localStorage.getItem("kitTra"));
    setTokenWeek(localStorage.getItem("token"));
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      console.log('id',idKitWeek,'to',tokenWeek)
      if (idKitWeek && tokenWeek) {
        try {
          const response = await axios.get(
            `${urls.backTrafficlly}/registro/week?lugar=${lugar}&idKit=12345`,
            {
              headers: { Authorization: tokenWeek },
            }
          );
          setData(response.data);
          console.log('res',response.data)
        } catch (error) {
          console.error("Error al obtener datos:", error);
        }
      }
    };

    fetchData();
  }, [lugar, idKitWeek, tokenWeek]);

  // Extracción y formateo de datos
  const weekData = data.weekData || {};
  const labels = Object.keys(weekData);
  const values = Object.values(weekData);

  // Configuración del gráfico
  const chartData = {
    labels,
    datasets: [
      {
        label: `Tráfico de la semana ${lugar}`,
        data: values,
        backgroundColor: "#00b1fd",
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false, // Permite que la gráfica ajuste su tamaño
    plugins: {
      legend: { position: "top" },
      title: {
        display: true,
        text: `Tráfico de la semana ${lugar}`,
      },
    },
    scales: {
      x: {
        ticks: {
          autoSkip: true, // Evita que las etiquetas del eje X se superpongan
          maxRotation: 45, // Rota las etiquetas para que quepan en pantallas pequeñas
          minRotation: 30,
        },
      },
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <div className="flex justify-center">
        <div className="w-full max-w-4xl px-4 py-2">
          <Bar
            data={chartData}
            options={chartOptions}
            width={null} // Ajusta el ancho del gráfico a su contenedor
            height={400} // Ajusta la altura del gráfico
          />
        </div>
      </div>
    </ThemeProvider>
  );
}

export default ChartWeek;
