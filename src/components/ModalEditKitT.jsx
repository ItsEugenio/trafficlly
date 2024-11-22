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
import { urls } from "./utils/urlsLocal";
import "react-toastify/dist/ReactToastify.css";
import { toast, ToastContainer } from "react-toastify";
function ModalEditKitT({ idKit, name, tipo }) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [nombre, setNombre] = useState("");
  const [password, setPassword] = useState("");

  const token = localStorage.getItem("token");
  const correo = localStorage.getItem("correoSystem");

  const handleNameChange = (event) => {
    setNombre(event.target.value);
  };

  const handlePasswdChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(
        `${urls.backTrafficlly}/kits/${idKit}`,
        {
          nombre,
        },
        {
          headers: {
            Authorization: `${token}`,
          },
        }
      );

      toast.success("Nombre del kit editado");
      setTimeout(() => {
        window.location.assign("/KitsTrafficcly");
      }, 2000);
    } catch (error) {
      if (error.code == "ERR_NETWORK") {
        toast.error("Error de conexion");
      } else {
        toast.error("error al editar");
      }
    }
  };

  const handlePut = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(
        `${urls.backTrafficlly}/usuarios/${correo}`,
        {
          password,
        },
        {
          headers: {
            Authorization: `${token}`,
          },
        }
      );

      
      toast.success("Contraseña actualizada");
      setTimeout(() => {
        window.location.assign("/KitsTrafficcly");
      }, 2000);
    } catch (error) {
      if (error.code == "ERR_NETWORK") {
        toast.error("Error de conexion");
      } else {
        toast.error("error al actualizar");
      }
    }
  };

  return (
    <>
      <Button
        onPress={onOpen}
        size="lg"
        isIconOnly
        variant="ghost"
        color="success"
      >
        <MdEditSquare size={40} />
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
              {tipo === "kit" ? (
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
                        <Button
                          color="success"
                          type="submit"
                          className="m-2"
                          variant="ghost"
                          size="lg"
                        >
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
              ) : (
                <>
                  <ModalHeader className="flex flex-col gap-1 text-xl">
                    Editar contraseña
                  </ModalHeader>
                  <ModalBody>
                    <form onSubmit={handlePut}>
                      <Input
                        className="m-2"
                        endContent={
                          <MdPermIdentity className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
                        }
                        label="Contraseña"
                        placeholder="Ingrese la nueva contraseña"
                        type="text"
                        variant="bordered"
                        value={password}
                        onChange={handlePasswdChange}
                      />
                      <div className="flex justify-center w-full">
                        <Button
                          color="success"
                          type="submit"
                          className="m-2"
                          variant="ghost"
                          size="lg"
                        >
                          Editar Contraseña
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
            </>
          )}
        </ModalContent>
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
      </Modal>
      
    </>
  );
}

export default ModalEditKitT;
