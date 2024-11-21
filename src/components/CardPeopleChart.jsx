import React, { useEffect, useState } from "react";
import { Card, CardHeader, CardBody, Divider } from "@nextui-org/react";
import axios from "axios";
import io from "socket.io-client";
import { BsFillPeopleFill } from "react-icons/bs";
import { urls } from "./utils/urlsLocal";
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

function CardPeopleChart({lugar}) {
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
            `${urls.backTrafficlly}/registro?fecha=${date}&lugar=${lugar}&idKit=${idKit}`,
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

  // Combinar y ordenar datos de ambos lugares
  const combined = hours.map((hour, index) => ({
    hour,
    countIn: peopleCounts[index],
    countOut: peopleCountsOut[index],
    total: peopleCounts[index] + peopleCountsOut[index],
  }));

  // Filtrar para incluir solo aquellos con conteo total mayor a 1
  const filtered = combined.filter(({ total }) => total > 1);

  // Ordenar de mayor a menor basado en el conteo total
  const sortedFiltered = filtered.sort((a, b) => b.total - a.total);

  console.log(sortedFiltered);

  return (
    <Card className="max-w-[400px]">
      <CardHeader className="flex gap-3">
        <div className="flex flex-col">
          <p className="text-md">Personas en el negocio</p>
          <p className="text-small text-default-500">Top de personas</p>
        </div>
      </CardHeader>
      <Divider />
      <CardBody>
        {sortedFiltered.map((item) => (
          <div key={item.hour} className="flex flex-row justify-center w-full">
            <div>
              <BsFillPeopleFill size={30} />
            </div>
            <div>
              <p>Hora: {item.hour}</p>
            </div>
            <div>
              {lugar === "afuera" ? (
                <p>Fuera: {item.countOut}</p>
              ) : (
                <p>Dentro: {item.countIn}</p>
              )}
            </div>
          </div>
        ))}
      </CardBody>
      <Divider />
    </Card>
  );
}

export default CardPeopleChart;
