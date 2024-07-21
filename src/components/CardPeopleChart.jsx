import React from "react";
import { Card, CardHeader, CardBody, Divider } from "@nextui-org/react";
function CardPeopleChart({lugar}) {
  return (
    <Card className="max-w-[400px]">
      <CardHeader className="flex gap-3">
        <div className="flex flex-col">
          <p className="text-md">Personas que pasan {lugar} del negocio</p>
          <p className="text-small text-default-500">Top de personas </p>
        </div>
      </CardHeader>
      <Divider />
      <CardBody>
        <p>Make beautiful websites regardless of your design experience.</p>
      </CardBody>
      <Divider />
    </Card>
  );
}

export default CardPeopleChart;
