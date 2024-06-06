import {
    Card,
    CardHeader,
    CardBody,
    CardFooter,
    Divider,
    Chip,
  } from "@nextui-org/react";
import { BsPeopleFill } from "react-icons/bs";

function CardPeople() {
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
      <BsPeopleFill size={60}/>
      </div>
    </CardBody>
    <Divider />
    <CardFooter>
      <div className="flex justify-center w-full">
        <Chip color="primary" variant="dot" className="m-1">
          20
        </Chip>
      </div>
    </CardFooter>
  </Card>
  )
}

export default CardPeople
