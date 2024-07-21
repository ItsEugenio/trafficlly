import React, { useState, useEffect } from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Tooltip,
  Button,
  Divider,
} from "@nextui-org/react";

import { HiDocumentReport } from "react-icons/hi";
import ModalDeleteReport from "./ModalDeleteReport";
import ModalReport from "./ModalReport";
import axios from "axios";
import { io } from "socket.io-client";

const SERVER_URL = "https://websocketsecurity.zapto.org";

const socket = io(SERVER_URL);

function TableReports({ idKitLocal }) {
  const [token, setToken] = useState("");
  const [data, setData] = useState([]);
  const [newReport, setNewReport] = useState([]);

  useEffect(() => {
    setToken(localStorage.getItem("token"));
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      if (token) {
        try {
          const response = await axios.get(
            `https://securitysystem.zapto.org/reportes/kit/${idKitLocal}`,
            {
              headers: {
                Authorization: `${token}`,
              },
            }
          );
          setData(
            response.data.data.map((reporte) => ({
              ...reporte,
              fecha: reporte.fecha.slice(0, 10),
            }))
          );
        } catch (error) {
          console.log(error);
        }
      }
    };
    fetchData();
  }, [token]);

  useEffect(() => {
    socket.on("connect", () => {
      console.log("Conectado al servidor WebSocket");
    });
    
    socket.on("websocketEvent", (data) => {
      console.log("Evento recibido desde el servidor");
      if (data.fecha) {
        data.fecha = data.fecha.slice(0, 10);
      }
      setNewReport([data])
    });
    
    socket.on("disconnect", () => {
      console.log("Desconectado del servidor WebSocket");
    });

    return () => {
      socket.off("connect");
    };
  }, []);

  console.log("New Report", newReport);

  return (
    <div className="p-6">
      <Table>
        <TableHeader>
          <TableColumn className="text-center">ID</TableColumn>
          <TableColumn className="text-center">FECHA</TableColumn>
          <TableColumn className="text-center">HORA</TableColumn>
          <TableColumn className="text-center">ADMINISTRAR</TableColumn>
        </TableHeader>

        <TableBody>
          {data.map((item) => (
            <TableRow key={item.id}>
              <TableCell>{item.id}</TableCell>

              <TableCell>{item.fecha}</TableCell>
              <TableCell>{item.hora}</TableCell>
              <TableCell>
                <div className="flex justify-evenly  ">
                  <Tooltip color="danger" content="Borrar Reporte">
                    <span className="text-lg text-danger cursor-pointer active:opacity-50">
                      <Button isIconOnly color="undefined">
                        <ModalDeleteReport IDReport={item.id} />
                      </Button>
                    </span>
                  </Tooltip>
                  <Tooltip color="primary" content="Ver Reportes">
                    <span className="text-lg text-sky-400 cursor-pointer active:opacity-50">
                      <Button isIconOnly color="undefined">
                        <ModalReport
                          IDReport={item.id}
                          IdKit={item.idKit}
                          DateReport={item.fecha}
                          TimeReport={item.hora}
                          Camara={item.camara}
                          Movimiento={item.movimiento}
                          Magnetico={item.magnetico}
                          Imagen={item.imagen}
                        />
                      </Button>
                    </span>
                  </Tooltip>
                </div>
              </TableCell>
            </TableRow>
          ))}
          {newReport.map((item) => (
            <TableRow key={item.id}>
              <TableCell>{item.id}</TableCell>

              <TableCell>{item.fecha}</TableCell>
              <TableCell>{item.hora}</TableCell>
              <TableCell>
                <div className="flex justify-evenly  ">
                  <Tooltip color="danger" content="Borrar Reporte">
                    <span className="text-lg text-danger cursor-pointer active:opacity-50">
                      <Button isIconOnly color="undefined">
                        <ModalDeleteReport IDReport={item.id} />
                      </Button>
                    </span>
                  </Tooltip>
                  <Tooltip color="primary" content="Ver Reportes">
                    <span className="text-lg text-sky-400 cursor-pointer active:opacity-50">
                      <Button isIconOnly color="undefined">
                        <ModalReport
                          IDReport={item.id}
                          IdKit={item.idKit}
                          DateReport={item.fecha}
                          TimeReport={item.hora}
                          Camara={item.camara}
                          Movimiento={item.movimiento}
                          Magnetico={item.magnetico}
                          Imagen={item.imagen}
                        />
                      </Button>
                    </span>
                  </Tooltip>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

export default TableReports;
