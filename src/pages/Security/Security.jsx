import React from "react";
import NavbarSecurity from "../../components/Security/NavbarSecurity";
import TableKits from "../../components/Security/TableKits";
function Security() {
  sessionStorage.removeItem('idKit');

  return (
    <>
      <NavbarSecurity />
      <div className="text-center h-screen">
        <h1>Kits Disponibles</h1>
        <h4>Puedes ver los reportes diponibles o administrar un Kit</h4>
        <TableKits />
      </div>
      
    </>
  );
}

export default Security;
