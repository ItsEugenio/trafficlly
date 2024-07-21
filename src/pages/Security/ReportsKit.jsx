import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import NavbarSecurity from "../../components/Security/NavbarSecurity";
import TableReports from "../../components/Security/TableReports";

function ReportsKit() {
  const idKitLocal = sessionStorage.getItem("idKit");

  const token = localStorage.getItem("token");
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

  return (
    <>
      {authenticated && (
        <>
          <NavbarSecurity />
          <div className="text-center h-screen">
            <h1>Reportes del Kit {idKitLocal}</h1>
            <h4>Puedes ver los detalles de cada Reporte</h4>

            <TableReports idKitLocal={idKitLocal} />
          </div>
        </>
      )}
    </>
  );
}

export default ReportsKit;
