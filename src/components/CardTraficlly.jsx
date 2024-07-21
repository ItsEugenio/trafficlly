import React from "react";
import { Card, CardBody,Divider } from "@nextui-org/react";

function CardTraficlly() {
  return (
    <div className="flex justify-center m-2 sm:justify-end">
      <Card className="w-56">
        <CardBody className="text-center">
          <p className="mb-2">Consulta las estadisticas de la semana del</p>
          <Divider />
          <p className="mt-2">17-06-2024 al 23-06-2024</p>

        </CardBody>
      </Card>
    </div>
  );
}

export default CardTraficlly;
