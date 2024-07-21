import React from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
  Chip,
} from "@nextui-org/react";
import { HiDocumentReport } from "react-icons/hi";

function ModalReport({
  IDReport,
  IdKit,
  DateReport,
  TimeReport,
  Camara,
  Movimiento,
  Magnetico,
  Imagen,
}) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  return (
    <>
      <Button onPress={onOpen} color="primary" size="lg" className="m-1" variant="ghost">
        <HiDocumentReport size={40} />
      </Button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} backdrop="blur" size="lg">
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1 text-2xl">
                Detalles del reporte: {IDReport}
              </ModalHeader>
              <ModalBody>
                <div className="flex justify-center gap-4">
                  <div className="grid justify-items-center gap-4">
                    <h2>Hora</h2>
                    <Chip color="primary" variant="shadow">
                      {DateReport}
                    </Chip>
                  </div>

                  <div className="grid justify-items-center gap-4">
                    <h2>Fecha</h2>
                    <Chip color="primary" variant="shadow">
                      {TimeReport}
                    </Chip>
                  </div>
                </div>
                <div>
                  <h2 className="text-center mb-2 mt-2">Sensores activados</h2>
                  <div className="grid grid-cols-1 gap-2">
                    <div className="flex justify-center">
                      {Camara === 1 || Camara === true ? (
                        <>
                          <Chip color="warning" variant="shadow">
                            Camara activada
                          </Chip>
                        </>
                      ) : (
                        <></>
                      )}
                    </div>

                    <div className="flex justify-center">
                      {" "}
                      {Movimiento === 1 || Movimiento === true ? (
                        <>
                          <Chip color="warning" variant="shadow">
                            Movimiento detectado
                          </Chip>
                        </>
                      ) : (
                        <></>
                      )}
                    </div>

                    <div className="flex justify-center">
                      {" "}
                      {Magnetico === 1 || Magnetico === true ? (
                        <>
                          <Chip color="warning" variant="shadow">
                            Puerta activada
                          </Chip>
                        </>
                      ) : (
                        <></>
                      )}
                    </div>

                    <div className="flex-row">
                      <h1 className="text-center mt-2">Imagen del reporte</h1>
                      <div className="flex justify-center w-full">
                        <img alt={IDReport} src={Imagen} width="300px" />
                      </div>
                    </div>
                  </div>
                </div>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="flat" onPress={onClose}>
                  Cerrar Detalles
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}

export default ModalReport;
