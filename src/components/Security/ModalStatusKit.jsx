import React from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
} from "@nextui-org/react";
import { IoLockClosed } from "react-icons/io5";
import { IoLockOpen } from "react-icons/io5";
import axios from "axios";


function ModalStatusKit({ status, nombre, id }) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const token = localStorage.getItem("token");

  const changeStatus = async (idKit, newStatus) => {
    newStatus === 'activado' ? (newStatus = 'activado') : (newStatus = 'desactivado')
    console.log(newStatus) 
    try {
      const response = await axios.put(
        `https://securitysystem.zapto.org/kits/security/${idKit}`, 
        {
            activate: newStatus
        }
        ,

        {
          headers: {
            Authorization: `${token}`, 
            'Content-Type': 'application/json' 
          },
        }
      );
      console.log('Estado cambiado exitosamente');
      window.location.assign('/Security'); 
    } catch (error) {
      console.log('Error al cambiar el estado del kit', error);
    }
  };

  return (
    <>
      {status === "activado" ? (
        <Button
          onPress={onOpen}
          size="lg"
          isIconOnly
          variant="ghost"
          color="danger"
        >
          <IoLockClosed size={35} />
        </Button>
      ) : (
        <Button
          onPress={onOpen}
          size="lg"
          isIconOnly
          variant="ghost"
          color="success"
        >
          <IoLockOpen size={35} />
        </Button>
      )}

      <Modal isOpen={isOpen} onOpenChange={onOpenChange} backdrop="blur">
        <ModalContent>
          {(onClose) => (
            <>
              {status === "activado" ? (
                <>
                  <ModalHeader className="flex flex-col gap-1">
                    Desactivar kit : {nombre} -- {id}
                  </ModalHeader>
                  <ModalBody>
                    <div className="flex justify-center w-full">
                      <Button
                        color="danger"
                        size="lg"
                        variant="ghost"
                        onClick={() => changeStatus(id, "desactivado")}
                      >
                        Desactivar Kit
                      </Button>
                    </div>
                  </ModalBody>
                  <ModalFooter>
                    <Button color="danger" variant="light" onPress={onClose}>
                      Cacncelar
                    </Button>
                  </ModalFooter>
                </>
              ) : (
                <>
                  <ModalHeader className="flex flex-col gap-1">
                    Activar kit : {nombre} -- {id}
                  </ModalHeader>
                  <ModalBody>
                    <div className="flex justify-center w-full">
                      <Button
                        color="success"
                        size="lg"
                        variant="ghost"
                        onClick={() => changeStatus(id, "activado")}
                      >
                        Activar Kit
                      </Button>
                    </div>
                  </ModalBody>
                  <ModalFooter>
                    <Button color="danger" variant="light" onPress={onClose}>
                      Cacncelar
                    </Button>
                  </ModalFooter>
                </>
              )}
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}

export default ModalStatusKit;
