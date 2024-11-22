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
import { AiOutlineFieldNumber } from "react-icons/ai";
import { MdAddchart } from "react-icons/md";

import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { urls } from "./utils/urlsLocal";
function ModalAddKit() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [id, setId] = useState("");
  const [nombre, setNombre] = useState("");

  const token = localStorage.getItem("token");

  const handleIdChange = (event) => {
    setId(event.target.value);
  };

  const handleNameChange = (event) => {
    setNombre(event.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const idKit = parseInt(id, 10);

    try {
      if (!idKit || !nombre) {
        toast.warn("Recuerda llenar todos los campos");
      } else {
        const response = await axios.post(
          `${urls.backTrafficlly}/kits`,
          {
            id: idKit,
            nombre,
          },
          {
            headers: {
              Authorization: `${token}`,
            },
          }
        );
        toast.success("Kit agregado con éxito");
        setTimeout(() => {
          window.location.assign("/KitsTrafficcly");
        }, 2000);
      }
    } catch (error) {
      if (error.code == "ERR_NETWORK") {
        toast.error("Error de conexion");
      } else {
        toast.error("Error al agregar el kit");
      }
    }
  };

  return (
    <>
      <Button
        onPress={onOpen}
        isIconOnly
        color="success"
        size="lg"
        variant="ghost"
      >
        <MdAddchart size={38} />
      </Button>
      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        placement="top-center"
        backdrop="blur"
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Agregar Kit de Trafficlly
              </ModalHeader>
              <ModalBody>
                <form onSubmit={handleSubmit}>
                  <Input
                    className="m-2"
                    autoFocus
                    endContent={
                      <AiOutlineFieldNumber className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
                    }
                    label="Id del Kit"
                    placeholder="Ingresa el id del Kit"
                    variant="bordered"
                    type="number"
                    value={id}
                    onChange={handleIdChange}
                  />
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
                    <Button color="success" type="submit" className="m-2">
                      Agregar Kit
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
     
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
        transition:Bounce
      />
    </>
  );
}

export default ModalAddKit;
