import React, { useState } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
  Input,
  Select,
  SelectItem,
} from "@nextui-org/react";
import { MdEditSquare } from "react-icons/md";
import axios from "axios";

function ModalEditKit({ idKit }) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [nombre, setNombre] = useState("");
  const [selectedSite, setSelectedSite] = useState("");

  const token = localStorage.getItem("token");
  const correo = localStorage.getItem('correoSystem')

  const handleNameChange = (event) => {
    setNombre(event.target.value);
  };
  const handleSiteChange = (value) => {
    setSelectedSite(value.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.put(
        `https://securitysystem.zapto.org/kits/${idKit}`,
        {
          id: idKit,
          nombre,
          status: "activado",
          alta: "true",
          lugar: selectedSite,
          idPropietario: correo,
        },
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

  const sites = [
    { key: "entradaTrasera", label: "Entrada Trasera" },
    { key: "portón", label: "Portón" },
    { key: "pasillo", label: "Pasillo" },
  ];
  return (
    <>
      <Button onPress={onOpen} isIconOnly color="success" variant="ghost" size="lg" className="m-1">
        <MdEditSquare size={40} />
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
                Editar Kit {idKit}
              </ModalHeader>
              <ModalBody>
                <form onSubmit={handleSubmit}>
                  <Input
                    label="ID del kit a modificar"
                    placeholder={idKit}
                    disabled
                    size="lg"
                    className="m-2 mb-4"
                  />
                  <Input
                    label="Nombre del Kit"
                    placeholder="Ingresa el nombre del Kit"
                    size="lg"
                    value={nombre}
                    onChange={handleNameChange}
                    className="m-2 mb-4"
                  />
                  <Select
                    label="Selecciona el lugar del Kit"
                    size="lg"
                    className="m-2"
                    value={selectedSite}
                    onChange={handleSiteChange}
                  >
                    {sites.map((site) => (
                      <SelectItem key={site.key}>{site.label}</SelectItem>
                    ))}
                  </Select>
                  <div className="flex justify-center w-full">
                    <Button
                      color="primary"
                      variant="ghost"
                      type="submit"
                      className="m-2"
                    >
                      Guardar Cambios
                    </Button>
                  </div>
                </form>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="flat" onPress={onClose} size="lg">
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

export default ModalEditKit;
