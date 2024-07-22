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
import { MdDelete } from "react-icons/md";
import axios from "axios";

function ModalDeleteKit({ idKit, name, Trafficly }) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const token = localStorage.getItem("token");

  const deleteKitTraffic = async (idKit) => {
    try {
      const response = await axios.delete(
        `https://trafficllymain.zapto.org/kits/${idKit}`,
        {
          headers: {
            Authorization: `${token}`,
          },
        }
      );

      console.log("Datos guardados correctamente.");
      window.location.assign("/KitsTrafficcly");
    } catch (error) {
      console.log("Error al guardar los datos.");
    }
  };

  const deleteKitSecurity = async (idKit) => {
    try {
      const response = await axios.delete(
        `https://securitysystem.zapto.org/kits/${idKit}`,
        {
          headers: {
            Authorization: `${token}`,
          },
        }
      );

      console.log("Datos guardados correctamente.");
      window.location.assign("/Security");
    } catch (error) {
      console.log("Error al guardar los datos.");
    }
  };

  return (
    <>
      <Button onPress={onOpen} size="lg" isIconOnly variant="ghost" color="danger" className="m-1">
        <MdDelete size={40} />
      </Button>
      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        isDismissable={false}
        isKeyboardDismissDisabled={true}
        backdrop="blur"
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1 text-center text-2xl">
                Eliminar Kit {idKit}
              </ModalHeader>
              <ModalBody>
                <div className="flex justify-center w-full">
                  {Trafficly === "true" ? (
                    <>
                      <div className="flex-col justify-center">
                        <h1 className="text-center mb-4">Nombre : {name}</h1>
                        <div className="flex justify-center w-full">
                          <Button
                            color="danger"
                            size="lg"
                            variant="ghost"
                            onClick={() => deleteKitTraffic(idKit)}
                          >
                            Eliminar Kit
                          </Button>
                        </div>
                      </div>
                    </>
                  ) : (
                    <Button
                    color="danger"
                    size="lg"
                    variant="ghost"
                    onClick={() => deleteKitSecurity(idKit)}
                  >
                    Eliminar Kit
                  </Button>
                  )}
                </div>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Cerrar Ventana
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}

export default ModalDeleteKit;
