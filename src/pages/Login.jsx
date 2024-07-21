import React, { useState } from "react";
import InputComponent from "../components/InputComponent";
import axios from "axios";
import NavT from "../components/NavT";
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  CardFooter,
  Divider,
  Tabs,
  Tab,
  Link,
  Input,
} from "@nextui-org/react";
import { toast } from "react-toastify";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import '../App.css'

function Login() {
  const [selected, setSelected] = React.useState("login");
  localStorage.removeItem("kitTra");

  const [inputValues, setInputValues] = useState({
    correo: "",
    password: "",
  });

  const [inputRegisterV, setInputRegisterV] = useState({
    telefono: "",
    nombres: "",
    apellidos: "",
    correo: "",
    password: "",
    domicilio: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setInputValues({
      ...inputValues,
      [name]: value,
    });
  };

  const handleRegister = (e) => {
    const { name, value } = e.target;
    setInputRegisterV({
      ...inputRegisterV,
      [name]: value,
    });
  };

  const handleSave = async () => {
    try {
      const datosForms = inputValues;
      const { correo, password } = datosForms;

      const response = await axios.post(
        "https://trafficllymain.zapto.org/auth/login",
        {
          correo,
          password,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      toast.success("Bienvenido");
      setTimeout(() => {
        const token = response.data.token;
        if (token) {
          localStorage.setItem("token", token);
          window.location.assign("/KitsTrafficcly");
        }
      }, 2000);
    } catch (error) {
      console.log("Error en la página de login:", error);
      toast.error("Correo o Contraseña incorrectas");
    }
  };

  const saveRegister = async () => {
    const datosForms = inputRegisterV;
    const { telefono, nombres, apellidos, correo, password, domicilio } =
      datosForms;
    try {
      const response = await axios.post(
        "https://trafficllymain.zapto.org/usuarios",
        {
          telefono,
          nombres,
          apellidos,
          correo,
          password,
          domicilio,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      alert("todo bien");
      setSelected("login");
    } catch (error) {
      console.log("Error al registrar usuario", error);
      toast.error("Error al crear el usuario");
    }
  };

  return (
    <>
      <NavT />
      <div className="flex w-full h-dvh flex-wrap md:flex-nowrap gap-4 ">
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

        <div className="flex flex-col w-full items-center sm: mb-36 md:mt-20">
          <Card className="max-w-full w-[340px]">
            <CardBody className="overflow-hidden">
              <Tabs
                fullWidth
                size="md"
                aria-label="Tabs form"
                selectedKey={selected}
                onSelectionChange={setSelected}
              >
                <Tab key="login" title="Iniciar Sesion">
                  <form className="flex flex-col gap-4">
                    <h2 className="text-center">Iniciar Sesion</h2>
                    <div className="flex justify-center w-full ">
                      <InputComponent
                        label="Correo"
                        name="correo"
                        value={inputValues.correo}
                        placeholder="Ingresa tu correo"
                        onChange={handleInputChange}
                      />
                    </div>
                    <div className="flex justify-center w-full">
                      <InputComponent
                        label="Contraseña"
                        name="password"
                        type="password"
                        value={inputValues.password}
                        placeholder="Ingresa tu contraseña"
                        onChange={handleInputChange}
                      />
                    </div>
                    <p className="text-center text-small">
                      No tienes cuenta?{" "}
                      <Link size="sm" onPress={() => setSelected("sign-up")}>
                        Registrarse
                      </Link>
                    </p>
                    <div className="flex gap-2 justify-end">
                      <Button
                        fullWidth
                        color="primary"
                        onClick={() => handleSave()}
                      >
                        Iniciar Sesion
                      </Button>
                    </div>
                  </form>
                </Tab>
                <Tab key="sign-up" title="Registrarse">
                  <form className="flex flex-col gap-4 ">
                    <div className="flex justify-center w-full ">
                      <InputComponent
                        label="Telefono"
                        name="telefono"
                        value={inputRegisterV.telefono}
                        type="text"
                        placeholder="Ingresa tu telefono"
                        onChange={handleRegister}
                      />
                    </div>
                    <div className="flex justify-center w-full ">
                      <InputComponent
                        label="Nombres"
                        name="nombres"
                        value={inputRegisterV.nombres}
                        type="text"
                        placeholder="Ingresa tus nombres"
                        onChange={handleRegister}
                      />
                    </div>
                    <div className="flex justify-center w-full ">
                      <InputComponent
                        label="Apellidos"
                        name="apellidos"
                        value={inputRegisterV.apellidos}
                        type="text"
                        placeholder="Ingresa tus apellidos"
                        onChange={handleRegister}
                      />
                    </div>
                    <div className="flex justify-center w-full ">
                      <InputComponent
                        label="Correo"
                        name="correo"
                        value={inputRegisterV.correo}
                        placeholder="Ingresa tu correo"
                        onChange={handleRegister}
                      />
                    </div>
                    <div className="flex justify-center w-full">
                      <InputComponent
                        label="Contraseña"
                        name="password"
                        type="password"
                        value={inputRegisterV.password}
                        placeholder="Ingresa tu contraseña"
                        onChange={handleRegister}
                      />
                    </div>
                    <div className="flex justify-center w-full ">
                      <InputComponent
                        label="Domicilio"
                        name="domicilio"
                        value={inputRegisterV.domicilio}
                        type="text"
                        placeholder="Ingresa tu domicilio"
                        onChange={handleRegister}
                      />
                    </div>
                    <p className="text-center text-small">
                      Ya tienes una cuenta?{" "}
                      <Link size="sm" onPress={() => setSelected("login")}>
                        Iniciar sesion
                      </Link>
                    </p>
                    <div className="flex gap-2 justify-end">
                      <Button
                        fullWidth
                        color="primary"
                        onClick={() => saveRegister()}
                      >
                        Registrarse
                      </Button>
                    </div>
                  </form>
                </Tab>
              </Tabs>
            </CardBody>
          </Card>
        </div>
      </div>
    </>
  );
}

export default Login;
