import React from "react";
import CardTime from "./CardTime";
import CardPeople from "./CardPeople";
function GridCards() {
  return (
    <div
      className='grid grid-cols-1 sm:grid-cols-2 gap-16'
    >
        <CardTime />
        <CardPeople />
    </div>
  );
}

export default GridCards;
