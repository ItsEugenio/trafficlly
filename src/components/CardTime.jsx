import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Divider,
  Chip,
} from "@nextui-org/react";
import { FaRegCalendarAlt } from "react-icons/fa";

function CardTime() {
  return (
    <Card className="max-w-[400px]">
      <CardHeader className="flex gap-3">
        <div className="w-full">
          <h1 className="text-center font-bold">MAYOR TRAFICO DE PERSONAS</h1>
        </div>
      </CardHeader>
      <Divider />
      <CardBody>
        <div className="flex justify-center w-full">
        <FaRegCalendarAlt size={60}/>
        </div>
      </CardBody>
      <Divider />
      <CardFooter>
        <div className="flex justify-center w-full">
          <Chip color="primary" variant="dot" className="m-1">
            VIERNES
          </Chip>
          <Chip color="primary" variant="dot" className="m-1">
            5:00 PM
          </Chip>
        </div>
      </CardFooter>
    </Card>
  );
}

export default CardTime;
