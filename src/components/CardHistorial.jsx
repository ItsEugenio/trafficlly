import React from "react";
import { Card, CardBody, Divider } from "@nextui-org/react";

function CardHistorial() {
  return (
    <div className="flex justify-center m-2 ">
      <a href="/Historial">
        <Card className="w-72 h-12 text-center">
          <h3>Ver historial de la semana pasada</h3>
        </Card>
      </a>
    </div>
  );
}

export default CardHistorial;
