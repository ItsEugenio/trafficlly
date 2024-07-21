// src/ChartDate.js
import React, { useState, useEffect } from "react";
import { Line } from "react-chartjs-2";
import axios from "axios";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import 'chart.js/auto'; // Importar todos los componentes de Chart.js

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

  const chartData = {
    labels: horas,
    datasets: [
      {
        label: `Personas que pasan ${lugar} del negocio`,
        data: personas,
        fill: false,
        backgroundColor: 'rgba(253, 72, 0, 0.2)',
        borderColor: '#fd4800',
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
            let label = context.dataset.label || '';

            if (label) {
              label += ': ';
            }
            if (context.parsed.y !== null) {
              label += `${context.parsed.y} personas a las ${context.label}`;
            }
            return label;
          },
        },
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: 'Hora',
        },
      },
      y: {
        title: {
          display: true,
          text: 'Número de personas',
        },
        beginAtZero: true,
      },
      
    },
    elements: {
      point: {
        hitRadius: 20, // Aumenta el área de interacción del punto
      }
    }
  };

  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      
      <div style={{ height: "400px", width: "100%" }}
        className="flex justify-center sm:p-4 sm:min-h-[400px] md:p-16 md:min-h-[700px]">
        <Line data={chartData} options={options} />
      </div>
    </ThemeProvider>
  );
};

export default ChartDate;
