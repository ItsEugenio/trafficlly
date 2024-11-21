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
import { urls } from "../utils/urlsLocal";

function ModalDeleteKit({ idKit, name, Trafficly }) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const token = localStorage.getItem("token");
  const correo = localStorage.getItem("correoSystem");

  const deleteKitTraffic = async (idKit) => {
    try {
      const response = await axios.delete(
        `${urls.backTrafficlly}/kits/${idKit}`,
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
      const response = await axios.delete(`${urls.backSystem}/kits/${idKit}`, {
        headers: {
          Authorization: `${token}`,
        },
      });

      console.log("Datos guardados correctamente.");
      window.location.assign("/Security");
    } catch (error) {
      console.log("Error al guardar los datos.");
    }
  };

  const deleteUser = async (correo) => {
    try {
      const response = await axios.delete(
        `${urls.backTrafficlly}/usuarios/${correo}`,
        {
          headers: {
            Authorization: `${token}`,
          },
        }
      );

      console.log("Datos guardados correctamente.");
      window.location.assign("/");
    } catch (error) {
      console.log("Error al guardar los datos.");
    }
  };

  return (
    <>
      <Button
        onPress={onOpen}
        size="lg"
        isIconOnly
        variant="ghost"
        color="danger"
        className="m-1"
      >
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
                {Trafficly === "user" ? (
                  <>Eliminar cuenta</>
                ) : (
                  <>Eliminar Kit {idKit}</>
                )}
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
                  ) : Trafficly === "user" ? (
                    <Button
                      color="danger"
                      size="lg"
                      variant="ghost"
                      onClick={() => deleteUser(correo)}
                    >
                      Eliminar Cuenta
                    </Button>
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
