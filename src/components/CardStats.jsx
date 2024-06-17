import React from "react";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Divider,
  Link,
  Chip,
} from "@nextui-org/react";

function CardStats() {
  return (
    <Card className="max-w-[400px]">
      <CardHeader className="flex gap-3">
        <div className="flex flex-col">
          <p className="text-md">NextUI</p>
          
        </div>
      </CardHeader>
      <Divider />
      <CardBody>
        <p>ICON</p>
      </CardBody>
      <Divider />
      <CardFooter>
      <Chip color="primary" variant="dot">Flat</Chip>
      <Chip color="primary" variant="shadow">Faded</Chip>
      </CardFooter>
    </Card>
  );
}

export default CardStats;


