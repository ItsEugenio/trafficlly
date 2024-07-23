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
          <div className="text-center  ">
            <h1 className="text-3xl mb-12">Reportes del Kit {idKitLocal}</h1>
            <h4 className="text-xl">Puedes ver los detalles de cada Reporte</h4>
            <div className="dark text-foreground bg-background ">
              <TableReports idKitLocal={idKitLocal} />
            </div>
            <div className="h-dvh">

            </div>
          </div>
          {/* <div className="pb-72">
            <TableReports idKitLocal={idKitLocal} />
          </div> */}
        </>
      )}
    </>
  );
}

export default ReportsKit;
