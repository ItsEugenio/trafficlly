import React, { useState, useEffect } from "react";
import NavbarSecurity from "../../components/Security/NavbarSecurity";
import TableKits from "../../components/Security/TableKits";
import axios from "axios";

function Security() {
  const [token, setToken] = useState("");
  const [correo, setCorreo] = useState("");
  const [dataKit, setDataKit] = useState([]);

  useEffect(() => {
    setToken(localStorage.getItem("token"));
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      if (token) {
        try {
          const response = await axios.get(`https://trafficllymain.zapto.org/usuarios`, {
            headers: {
              Authorization: `${token}`,
            },
          });
          setCorreo(response.data.correo);
        } catch (error) {
          console.log(error);
        }
      }
    };
    fetchData();
  }, [token]);
  localStorage.setItem("correoSystem", correo);

  useEffect(() => {
    const fetchData = async () => {
      if (token) {
        try {
          const response = await axios.get(
            `https://securitysystem.zapto.org/kits/propietario/${correo}`,
            {
              headers: {
                Authorization: `${token}`,
              },
            }
          );
          console.log('response HTTPS', response)
          setDataKit(response.data.data);
        } catch (error) {
          console.log(error);
        }
      }
    };
    fetchData();
  }, [correo]);

  console.log(dataKit)

  sessionStorage.removeItem("idKit");

  const data = [
    { id: "1111", nombre: "Local Norte", status: "activado" },
    { id: "2222", nombre: "Tacos UP", status: "desactivado" },
    { id: "3333", nombre: "Tia adelita", status: "activado" },
    { id: "4444", nombre: "Miches el maik", status: "intrusion" },
  ];

  return (
    <>
      <NavbarSecurity />
      <div className="text-center h-screen">
        <h1>Kits Disponibles</h1>
        <h4>Puedes ver los reportes disponibles o administrar un Kit</h4>
        <TableKits trafficly={false} dataTableKits={dataKit} />
      </div>
    </>
  );
}

export default Security;
