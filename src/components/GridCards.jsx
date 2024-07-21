import React from "react";
import CardTime from "./CardTime";
import CardPeople from "./CardPeople";

function GridCards({diaTime,diaConcu,horaConcu,personasConcu}) {
 
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols2  gap-12">
      <CardTime diaPro={diaTime}/>
      <CardPeople dia={diaConcu} hora={horaConcu} personas={personasConcu} />
    </div>
  );
}

export default GridCards;
