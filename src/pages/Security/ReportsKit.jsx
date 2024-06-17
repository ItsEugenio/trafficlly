import React from "react";
import NavbarSecurity from "../../components/Security/NavbarSecurity";
import TableReports from "../../components/Security/TableReports";

function ReportsKit() {
    const idKitLocal = sessionStorage.getItem('idKit')

  return (
    <>
      <NavbarSecurity />
      <div className="text-center h-screen">
        <h1>Reportes del Kit {idKitLocal}</h1>
        <h4>Puedes ver los detalles de cada Reporte</h4>

        <TableReports idKitLocal={idKitLocal}/>

      </div>
    </>
  );
}

export default ReportsKit;
