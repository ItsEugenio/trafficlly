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

export default function TableKits() {
  const data = [
    { id: "1111", name: "Local Norte", status: "activado" },
    { id: "2222", name: "Tacos UP", status: "desactivado" },
    { id: "3333", name: "Tia adelita", status: "activado" },
    { id: "4444", name: "Miches el maik", status: "intrusion" },
  ];

  const verReportes = (idKit) => {
    sessionStorage.setItem("idKit", idKit);
    window.location.assign("/Reportes");
  };
  return (
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
              <TableCell>{item.name}</TableCell>
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
                <div className="flex justify-evenly  ">
                  <Tooltip color="danger" content="Borrar Kit">
                    <span className="text-lg text-danger cursor-pointer active:opacity-50">
                      <MdDelete size={30} />
                    </span>
                  </Tooltip>
                  <Tooltip color="primary" content="Ver Reportes">
                    <span className="text-lg text-sky-400 cursor-pointer active:opacity-50">
                      <Button
                        isIconOnly
                        onClick={() => verReportes(item.id)}
                        color="undefined"
                      >
                        <HiDocumentReport size={30} />
                      </Button>
                    </span>
                  </Tooltip>
                  <Tooltip color="success" content="Editar Kit">
                    <span className="text-lg text-green-500 cursor-pointer active:opacity-50">
                      <MdEditSquare size={30} />
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
