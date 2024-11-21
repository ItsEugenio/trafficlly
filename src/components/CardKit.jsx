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
import kitImg from "../assets/KitsTraffic.png";
import ModalEditKitT from "./ModalEditKitT";
import ModalDeleteKit from "./Security/ModalDeleteKit";
import { FaPeoplePulling } from "react-icons/fa6";
import { FaPersonThroughWindow } from "react-icons/fa6";

function CardKit({ kits }) {
  console.log("componente Cards", kits);

  const verTrafficcly = (idKitT) => {
    localStorage.setItem("kitTra", idKitT);
    window.location.assign("/home");
  };
  return (
    <>
      {kits.length === 1 ? (
        <div className="grid grid-cols-1 sm:grid-cols-1 gap-16">
          {kits.map((item) => (
            <Card
              className="w-64"
              isPressable
              onPress={() => verTrafficcly(item.id)}
            >
              <CardHeader className="flex gap-3">
                <div className="flex justify-center w-full">
                  <h1 className="text-xl">Kit {item.nombre}</h1>
                </div>
              </CardHeader>

              <CardBody>
                <div className="flex justify-center w-full">
                  <FaPeoplePulling size={130} />
                </div>
              </CardBody>
              <Divider />
              <CardFooter>
                <div className="flex-col justify-center w-full text-center">
                  <h2 className="mb-4">Editar Kit</h2>
                  <ModalEditKitT idKit={item.id} name={item.nombre} tipo='kit'/>
                </div>
                <div className="flex-col justify-center w-full text-center">
                  <h2 className="mb-4">Eliminar Kit</h2>
                  <ModalDeleteKit
                    idKit={item.id}
                    name={item.nombre}
                    Trafficly="true"
                  />
                </div>
              </CardFooter>
            </Card>
          ))}
        </div>
      ) : kits.length >= 2 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-16">
          {kits.map((item) => (
            <Card
              className="w-64"
              isPressable
              onPress={() => verTrafficcly(item.id)}
            >
              <CardHeader className="flex gap-3">
                <div className="flex justify-center w-full">
                  <h1 className="text-xl">Kit {item.nombre}</h1>
                </div>
              </CardHeader>
              <CardBody>
                <div className="flex justify-center w-full">
                  <FaPeoplePulling size={130} />
                </div>
              </CardBody>
              <Divider className="my-4" />
              <CardFooter>
                <div className="flex-col justify-center w-full text-center">
                  <h2 className="mb-4">Editar Kit</h2>
                  <ModalEditKitT idKit={item.id} name={item.nombre} tipo='kit'/>
                </div>
                <div className="flex-col justify-center w-full text-center">
                  <h2 className="mb-4">Eliminar Kit</h2>
                  <ModalDeleteKit
                    idKit={item.id}
                    name={item.nombre}
                    Trafficly="true"
                  />
                </div>
              </CardFooter>
            </Card>
          ))}
        </div>
      ) : (
        <Card className="w-64">
          <CardHeader className="flex gap-3">
            <div className="flex justify-center w-full">
              <h1 className="text-xl text-center">No tienes kits agregados</h1>
            </div>
          </CardHeader>

          <CardBody>
            <div className="flex justify-center w-full">
              <FaPersonThroughWindow size={130} />
            </div>
          </CardBody>
          <Divider />
          <CardFooter>
            <div className="flex-col justify-center w-full text-center">
              <h2 className="mb-4">Agrega uno con el botón de arriba</h2>
            </div>
          </CardFooter>
        </Card>
      )}
    </>
  );
}

export default CardKit;
