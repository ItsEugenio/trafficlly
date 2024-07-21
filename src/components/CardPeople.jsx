import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Divider,
  Chip,
} from "@nextui-org/react";
import { BsPeopleFill } from "react-icons/bs";

function CardPeople({dia,hora,personas}) {
  return (
    <Card className="max-w-[350px]">
      <CardHeader className="flex gap-3">
        <div className="w-full">
          <h1 className="text-center font-bold">
            HORA Y DÍA CON MAYOR TRAFICO DE PERSONAS DE LA SEMANA PASADA
          </h1>
        </div>
      </CardHeader>
      <Divider />
      <CardBody>
        <div className="flex justify-center w-full">
          <BsPeopleFill size={60} />
        </div>
      </CardBody>
    
      <CardFooter>
        <div className="flex justify-center w-full">
          <Chip color="primary" variant="dot" className="m-1">
            {dia}
          </Chip>
          <Chip color="primary" variant="dot" className="m-1">
            {hora}
          </Chip>
          <Chip color="primary" variant="dot" className="m-1">
            {personas}
          </Chip>
        </div>
      </CardFooter>
    </Card>
  );
}

export default CardPeople;
