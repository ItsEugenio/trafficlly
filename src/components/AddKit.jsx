import React from "react";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Divider,
  Link,
  Image,
  Button,
} from "@nextui-org/react";
import ModalAddKit from "./ModalAddKit";
function AddKit() {
  return (
    <Card className="w-56">
      
     
      <CardBody>
        <div className="flex justify-center items-center w-full">
        <h2 className="text-center mr-4">Agregar un kit</h2>
          <ModalAddKit />
        </div>
      </CardBody>
    </Card>
  );
}

export default AddKit;
