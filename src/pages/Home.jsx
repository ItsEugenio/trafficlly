import React from "react";
import NavT from "../components/NavT";
import ButtonSecurityNav from "../components/ButtonSecurityNav";
import { Divider } from "@nextui-org/react";
import ChartHourDaily from "../components/ChartHourDaily";

import CardDateSelect from "../components/CardDateSelect";
import ChartCompare from "../components/ChartCompare";

import CardPeopleChart from "../components/CardPeopleChart";

function Home() {
  const kitTrafficlly = localStorage.getItem("kitTra");
  localStorage.removeItem("fecha");

  return (
    <>
      <NavT />
      <ButtonSecurityNav />

      <div className="flex justify-center mt-12">
        <CardDateSelect />
      </div>

      <Divider className="my-8" />

      <ChartHourDaily lugar="afuera" />
      <ChartHourDaily lugar="adentro" />

      <CardPeopleChart lugar='adentro' />
    </>
  );
}

export default Home;
