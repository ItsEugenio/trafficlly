import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
} from "@nextui-org/react";
import { FaRegUser } from "react-icons/fa";
import ModalEditKitT from "./ModalEditKitT";
import ModalDeleteKit from "./Security/ModalDeleteKit";

function ModalUser() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const cerrarSesion = () => {
    localStorage.removeItem("token");
    window.location.assign("/");
  };
  return (
    <>
      <Button
        onPress={onOpen}
        size="xs"
        isIconOnly
        variant="ghost"
        color="success"
      >
        <FaRegUser size={30} />
      </Button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} placement="top">
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Ajuste de Cuenta
              </ModalHeader>
              <ModalBody>
              <div className="flex flex-col items-center">
                <h2 className="mb-2 mt-2">Cerrar Cuenta</h2>
                  <Button color="primary" variant="flat" onClick={cerrarSesion}>
                    Cerrar Sesión
                  </Button>
                </div>
                <div className="flex flex-col items-center">
                  <h2 className="mb-2 mt-2">Editar contraseña</h2>
                  <ModalEditKitT idKit="1" name="N" tipo="user" />
                </div>
                <div className="flex flex-col items-center">
                  <h2 className="mb-2 mt-2">Eliminar cuenta</h2>
                  <ModalDeleteKit idKit="1" name="N" Trafficly="user" />
                </div>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Cerrar
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}

export default ModalUser;
