import React from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Chip,
  Tooltip,
  Button,
} from "@nextui-org/react";
import { MdDelete } from "react-icons/md";
import { HiDocumentReport } from "react-icons/hi";
import { MdEditSquare } from "react-icons/md";
import ModalDeleteKit from "./ModalDeleteKit";
import ModalEditKit from "./ModalEditKit";
import ModalStatusKit from "./ModalStatusKit";

export default function TableKits({ trafficly, dataTableKits }) {
  const data = dataTableKits;
  const verReportes = (idKit) => {
    sessionStorage.setItem("idKit", idKit);
    window.location.assign("/Reportes");
  };

  const verTrafficcly = (idKitT) => {
    localStorage.setItem("kitTra", idKitT);
    window.location.assign("/home");
  };

  // console.log('Table',data)

  return (
    <>
      {trafficly ? (
        <div className="p-6">
          <Table aria-label="Example static collection table">
            <TableHeader>
              <TableColumn className="text-center">ID</TableColumn>
              <TableColumn className="text-center">NOMBRE</TableColumn>
              <TableColumn className="text-center">ADMINISTRAR</TableColumn>
            </TableHeader>
            <TableBody>
              {data.map((item) => (
                <TableRow key={item.id}>
                  <TableCell>{item.id}</TableCell>
                  <TableCell>{item.nombre}</TableCell>
                  <TableCell>
                    <Button
                      onClick={() => verTrafficcly(item.id)}
                      color="primary"
                      size="lg"
                      variant="ghost"
                    >
                      Trafficlly
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      ) : (
        <div className="p-6">
          <Table aria-label="Example static collection table">
            <TableHeader>
              <TableColumn className="text-center">ID</TableColumn>
              <TableColumn className="text-center">NOMBRE</TableColumn>
              <TableColumn className="text-center">STATUS</TableColumn>
              <TableColumn className="text-center">ADMINISTRAR</TableColumn>
            </TableHeader>
            <TableBody>
              {data.map((item) => (
                <TableRow key={item.id}>
                  <TableCell>{item.id}</TableCell>
                  <TableCell>{item.nombre}</TableCell>
                  <TableCell>
                    <Chip
                      size="md"
                      color={
                        item.status === "intrusion"
                          ? "primary"
                          : item.status === "activado"
                          ? "success"
                          : "danger"
                      }
                    >
                      {item.status}
                    </Chip>
                  </TableCell>
                  <TableCell>
                    <div className="flex justify-evenly">
                      <Tooltip color="danger" content="Borrar Kit">
                        <span className="text-lg text-danger cursor-pointer active:opacity-50">
                          <ModalDeleteKit idKit={item.id} />
                        </span>
                      </Tooltip>

                      <Tooltip color="success" content="Editar Kit">
                        <span className="text-lg text-green-500 cursor-pointer active:opacity-50">
                          <ModalEditKit idKit={item.id} />
                        </span>
                      </Tooltip>
                      <Tooltip color="primary" content="Ver Reportes">
                        <span className="text-lg text-sky-400 cursor-pointer active:opacity-50">
                          <Button
                            isIconOnly
                            onClick={() => verReportes(item.id)}
                            color="primary"
                          >
                            <HiDocumentReport size={30} />
                          </Button>
                        </span>
                      </Tooltip>
                      {item.status === "activado" ? (
                        <Tooltip
                          content='desactivar'
                          color='danger'
                        >
                          <span className="text-lg text-danger cursor-pointer active:opacity-50">
                            <ModalStatusKit status={item.status} nombre={item.nombre} id={item.id} />
                          </span>
                        </Tooltip>
                      ) : (
                        <Tooltip
                          content='activar'
                          color='primary'
                        >
                          <span className="text-lg text-danger cursor-pointer active:opacity-50">
                            <ModalStatusKit status={item.status} nombre={item.nombre} id={item.id} />
                          </span>
                        </Tooltip>
                      )}
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}
    </>
  );
}
