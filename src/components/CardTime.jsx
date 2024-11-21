import React, { useEffect, useState } from "react";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Divider,
  Chip,
} from "@nextui-org/react";
import { FaRegCalendarAlt } from "react-icons/fa";
import axios from "axios";
import { format, startOfWeek, subDays } from "date-fns";

function CardTime({diaPro}) {




  return (
    <Card className="max-w-[350px]">
      <CardHeader className="flex gap-3">
        <div className="w-full">
          <h1 className="text-center font-bold">
          DÍA CON MAYOR PROBABILIDAD DE TRÁFICO DE PERSONAS
          </h1>
        </div>
      </CardHeader>
      <Divider />
      <CardBody>
        <div className="flex justify-center w-full">
          <FaRegCalendarAlt size={60} />
        </div>
      </CardBody>
      
      <CardFooter>
        <div className="flex justify-center w-full">
          <Chip color="primary" variant="dot" className="m-1">
           {diaPro}
          </Chip>
        </div>
      </CardFooter>
    </Card>
  );
}

export default CardTime;
