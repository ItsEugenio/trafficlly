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
import { IoIosAddCircle } from "react-icons/io";
import axios from "axios";

function ModalAddKitSecurity() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [idkit, setIdkit] = useState(0);
  const [nombre, setNombre] = useState("");
  const [selectedSite, setSelectedSite] = useState("");

  const token = localStorage.getItem("token");
  const correo = localStorage.getItem('correoSystem')


  const handleIdChange = (event) => {
    const value = parseInt(event.target.value);
    setIdkit(isNaN(value) ? "" : value); 
  };

  const handleNameChange = (event) => {
    setNombre(event.target.value);
  };
  const handleSiteChange = (value) => {
    setSelectedSite(value.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        `https://securitysystem.zapto.org/kits`,
        {
          id: idkit,
          nombre,
          status: "desactivado",
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
    { key: "porton", label: "Porton" },
    { key: "pasillo", label: "Pasillo" },
  ];
  return (
    <>
      <Button onPress={onOpen} isIconOnly color="success">
        <IoIosAddCircle size={30} />
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
                Agregar Kit
              </ModalHeader>
              <ModalBody>
                <form onSubmit={handleSubmit}>
                  <Input
                    label="ID Kit"
                    placeholder='Ingresa el id del Kit' // add onChange
                    value={idkit}
                    onChange={handleIdChange}
                    size="lg"
                    className="m-2"
                    type="number"
                    
                  />
                  <Input
                    label="Nombre del Kit"
                    placeholder="Ingresa el nombre del Kit"
                    size="lg"
                    value={nombre}
                    onChange={handleNameChange}
                    className="m-2"
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
                      Agregar Kit
                    </Button>
                  </div>
                </form>
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

export default ModalAddKitSecurity;



