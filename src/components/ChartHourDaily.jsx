import React from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend
);

function ChartHourDaily() {
  const days = [
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
  const people = [
    15, 88, 35, 70, 33, 6, 44, 75, 55, 15, 25, 58, 22, 4, 63, 95, 6, 60, 51, 30,
    11, 89, 50, 12,
  ];
  const data = {
    labels: days,
    datasets: [
      {
        label: "Numero de persoans",
        data: people,
        fill: false,
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 2,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Personas que pasan por el Local",
      },
    },
  };

  return (
    <div className="flex justify-center mt-6 ">
      <div className="w-9/12">
        <Line data={data} options={options} />
      </div>
    </div>
  );
}

export default ChartHourDaily;
