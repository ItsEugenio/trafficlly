import React from "react";
import NavT from "../components/NavT";
import GridCards from "../components/GridCards";
import {Divider} from "@nextui-org/react";
import ChartHourDaily from "../components/ChartHourDaily";
import ButtonNav from "../components/ButtonNav";
function Home() {
  return (
    <>
      <NavT />
      <ButtonNav />
      <h1 className="text-center mt-14 text-2xl">Personas que pasan por el local</h1>
      <div className="flex justify-center mt-6">
        <GridCards />
      </div>

      <h1 className="text-center mt-8 text-2xl">Personas que entran al local</h1>
      <div className="flex justify-center mt-6">
        <GridCards />
      </div>
      <Divider className="my-8"  />
        <ChartHourDaily />
    </>
  );
}

export default Home;
