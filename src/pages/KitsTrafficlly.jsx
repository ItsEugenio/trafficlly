import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import NavT from "../components/NavT";
import TableKits from "../components/Security/TableKits";
import CardKit from "../components/CardKit";
import AddKit from "../components/AddKit";
import axios from "axios";
import ButtonSecurityNav from "../components/ButtonSecurityNav";

function KitsTrafficlly() {
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  const [authenticated, setAuthenticated] = useState(false);
  const [data, setData] = useState([]);

  useEffect(() => {
    const isAuthenticated = token !== null;
    setAuthenticated(isAuthenticated);
    console.log("tokeeen", token);

    if (!isAuthenticated) {
      navigate("/");
    }
  }, [navigate, token]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://trafficllymain.zapto.org/kits/usuario/unique`,
          {
            headers: {
              Authorization: `${token}`,
            },
          }
        );
        console.log("respo", response.data);
        setData(response.data);
      } catch (error) {
        console.error("Error al obtener datos:", error);
      }
    };

    fetchData();
  }, [token]);

  return (
    <>
      {authenticated && (
        <>
          <NavT />
          <ButtonSecurityNav />
          <div className="text-center h-dvh">
            <h1 className="text-4xl mb-4 mt-4">Kits Disponibles</h1>
            <h4 className="text-xl">Puedes agregar y ver un Kit Trafficcly</h4>
            <div className="flex justify-center mt-6">
              <AddKit />
            </div>
            {/* <TableKits trafficly={true} dataTableKits={data} /> */}
            <div className="flex justify-center mt-4">
              <CardKit kits={data} />
            </div>
          </div>
        </>
      )}
    </>
  );
}

export default KitsTrafficlly;
