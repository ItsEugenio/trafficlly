import React from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Tooltip,
  Button,
} from "@nextui-org/react";
import { MdDelete } from "react-icons/md";
import { HiDocumentReport } from "react-icons/hi";

function TableReports({idKitLocal}) {
  const data = [
    { id: "1111", fecha: "12-06-2024", hora: "12:30" },
    { id: "1111", fecha: "03-06-2024", hora: "15:22" },
    { id: "2222", fecha: "12-06-2024", hora: "19:45" },
    { id: "2222", fecha: "22-06-2024", hora: "13:50" },
    { id: "3333", fecha: "30-06-2024", hora: "08:10" },
    { id: "4444", fecha: "11-06-2024", hora: "12:40" },
  ];

  const dataID = data.filter(item => item.id == idKitLocal)
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
          {dataID.map((item) => (
            <TableRow key={item.id}>
              <TableCell>{item.id}</TableCell>

              <TableCell>{item.fecha}</TableCell>
              <TableCell>{item.hora}</TableCell>
              <TableCell>
                <div className="flex justify-evenly  ">
                  <Tooltip color="danger" content="Borrar Kit">
                    <span className="text-lg text-danger cursor-pointer active:opacity-50">
                      <Button isIconOnly color="undefined">
                        <MdDelete size={30} />
                      </Button>
                    </span>
                  </Tooltip>
                  <Tooltip color="primary" content="Ver Reportes">
                    <span className="text-lg text-sky-400 cursor-pointer active:opacity-50">
                      <Button isIconOnly color="undefined">
                        <HiDocumentReport size={30} />
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
