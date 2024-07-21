import React, { useState } from "react";
import axios from "axios";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
  Input,
} from "@nextui-org/react";
import { MdPermIdentity } from "react-icons/md";
import { MdEditSquare } from "react-icons/md";

function ModalEditKitT({idKit,name}) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [nombre, setNombre] = useState("");

  const token = localStorage.getItem("token");



  const handleNameChange = (event) => {
    setNombre(event.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();


    try {
    
      const response = await axios.put(
        `https://trafficllymain.zapto.org/kits/${idKit}`,
        {
          nombre,
        },
        {
          headers: {
            Authorization: `${token}`,
          },
        }
      );

      console.log("Datos guardados correctamente.");
      window.location.assign('/KitsTrafficcly')

    } catch (error) {
      console.log("Error al guardar los datos.");
    }
  };

  return (
    <>
      <Button onPress={onOpen} size="lg" isIconOnly variant="ghost" color="success" > 
        <MdEditSquare size={40} />
      </Button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} placement="top-center"  backdrop="blur">
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1 text-xl">
              Editar Kit de Trafficlly : {name}
              </ModalHeader>
              <ModalBody>
                <form onSubmit={handleSubmit}>
                    <h1 className="text-center ">Nombre actual : {name}</h1>
                  <Input
                    className="m-2"
                    endContent={
                      <MdPermIdentity className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
                    }
                    label="Nombre del Kit"
                    placeholder="Ingresa el nombre del Kit"
                    type="text"
                    variant="bordered"
                    value={nombre}
                    onChange={handleNameChange}
                  />
                  <div className="flex justify-center w-full">
                    <Button color="success" type="submit" className="m-2" variant="ghost" size="lg">
                      Editar Kit
                    </Button>
                  </div>
                </form>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="flat" onPress={onClose}>
                  Cancelar
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}

export default ModalEditKitT;



