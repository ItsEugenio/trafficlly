import React, { useState, useEffect } from "react";
import NavT from "../components/NavT";
import CardDateSelect from "../components/CardDateSelect";
import ChartDate from '../components/ChartDate'

function BuscarFecha() {

  return (
    <>
      <NavT />
      <div className="flex justify-center">
        <CardDateSelect />
      </div>
      
    
      <ChartDate lugar='afuera' />
      <ChartDate lugar='adentro' />
    </>
  );
}

export default BuscarFecha;
