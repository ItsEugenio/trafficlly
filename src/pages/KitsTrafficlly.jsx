import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import NavT from "../components/NavT";
import TableKits from "../components/Security/TableKits";
import CardKit from "../components/CardKit";
import AddKit from "../components/AddKit";
import axios from "axios";
import ButtonSecurityNav from "../components/ButtonSecurityNav";
import { urls } from "../components/utils/urlsLocal";
import { isTokenExpired } from "../components/utils/jwtUtil";

function KitsTrafficlly() {
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  const [authenticated, setAuthenticated] = useState(false);
  const [data, setData] = useState([]);

  useEffect(() => {
    const isAuthenticated = token !== null;
    setAuthenticated(isAuthenticated);
    if (!isAuthenticated) {
      navigate("/");
    }
  }, [navigate, token]);

  useEffect(() => {
    if (isTokenExpired(token)) {
      console.log("Token caducado.");
      navigate("/");
    }
  }, []);


  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${urls.backTrafficlly}/kits/usuario/unique`,
          {
            headers: {
              Authorization: `${token}`,
            },
          }
        );
        setData(response.data);
        console.log("dataKits", response.data);
      } catch (error) {
        toast.error("Error de conexion");
      }
    };

    fetchData();
  }, [token]);

  return (
    <>
      {/* {authenticated && ( */}
        <>
          <NavT />
          <ButtonSecurityNav />
          <div>
            <h1 className="text-center text-4xl mb-4 mt-4">Kits Disponibles</h1>
            <h4 className="text-center text-xl">
              Puedes agregar y ver un Kit Trafficcly
            </h4>

            <div className="flex justify-center mt-6">
              <AddKit />
            </div>

            <div className="flex justify-center mt-4 pb-72 dark text-foreground bg-background ">
              <CardKit kits={data} />
            </div>
            <div className="h-dvh"></div>
          </div>
        </>
      {/* )} */}
    </>
  );
}

export default KitsTrafficlly;
