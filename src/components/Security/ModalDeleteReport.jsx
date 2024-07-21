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

function ModalDeleteReport({IDReport}) {
    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    const token = localStorage.getItem("token");

    const deleteReport = async (id) =>{
      try {
        const response = await axios.delete(
          `https://securitysystem.zapto.org/reportes/${id}`,
          {
            headers: {
              Authorization: `${token}`,
            },
          }
        );
        window.location.assign("/Reportes");
      } catch (error) {
        console.log("Error al eliminar el reporte.");
      }
   
    }
    return (
      <>
        <Button onPress={onOpen} isIconOnly color="danger">
          <MdDelete size={30} />
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
                <ModalHeader className="flex flex-col gap-1 text-center">
                  Eliminar Reporte {IDReport}
                </ModalHeader>
                <ModalBody>
                  <div className="flex justify-center w-full">
                    <Button color="danger" size="lg" variant="ghost" onClick={() => deleteReport(IDReport)}>
                      Eliminar Reporte
                    </Button>
                  </div>
                </ModalBody>
                <ModalFooter>
                  <Button color="danger" variant="flat" onPress={onClose}>
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

export default ModalDeleteReport
