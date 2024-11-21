import React, { useState, useEffect } from "react";
import NavbarSecurity from "../../components/Security/NavbarSecurity";
import TableKits from "../../components/Security/TableKits";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { urls } from "../../components/utils/urlsLocal";
function Security() {
  const [token, setToken] = useState("");
  const [correo, setCorreo] = useState("");
  const [dataKit, setDataKit] = useState([]);

  const navigate = useNavigate();
  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    const isAuthenticated = token !== null;
    setAuthenticated(isAuthenticated);
    console.log("tokeeen", token);

    if (!isAuthenticated) {
      navigate("/");
    }
  }, [navigate, token]);

  useEffect(() => {
    setToken(localStorage.getItem("token"));
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      if (token) {
        try {
          const response = await axios.get(
            `${urls.backTrafficlly}/usuarios`,
            {
              headers: {
                Authorization: `${token}`,
              },
            }
          );
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
            `${urls.backSystem}/kits/propietario/${correo}`,
            {
              headers: {
                Authorization: `${token}`,
              },
            }
          );
          
          setDataKit(response.data.data);
        } catch (error) {
          console.log(error);
        }
      }
    };
    fetchData();
  }, [correo]);

  console.log(dataKit);

  sessionStorage.removeItem("idKit");

  const data = [
    { id: "1111", nombre: "Local Norte", status: "activado" },
    { id: "2222", nombre: "Tacos UP", status: "desactivado" },
    { id: "3333", nombre: "Tia adelita", status: "activado" },
    { id: "4444", nombre: "Miches el maik", status: "intrusion" },
  ];

  return (
    <>
      {authenticated && (
        <>
          <NavbarSecurity />
          <div className="text-center h-screen">
            <h1 className="text-4xl mb-8">Kits Disponibles</h1>
            <h4 className="text-xl">Puedes ver los reportes disponibles o administrar un Kit</h4>
            <TableKits trafficly={false} dataTableKits={dataKit} />
          </div>
        </>
      )}
    </>
  );
}

export default Security;
