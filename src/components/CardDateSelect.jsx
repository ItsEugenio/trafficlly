import React, { useState, useEffect } from "react";
import { Card, CardBody, Divider, DatePicker, Button } from "@nextui-org/react";

function CardDateSelect() {
  const [selectedDate, setSelectedDate] = useState(null);
  const [formattedDate, setFormattedDate] = useState("");

  const handleDateChange = (newValue) => {
    setSelectedDate(newValue);

    const day = newValue?.day;
    const month = newValue?.month;
    const year = newValue?.year;

    if (day !== undefined && month !== undefined && year !== undefined) {
      const formattedDay = String(day).padStart(2, '0');
      const formattedMonth = String(month).padStart(2, '0');
      const formatted = `${year}-${formattedMonth}-${formattedDay}`;
      setFormattedDate(formatted);
    }
  };

  useEffect(() => {
    if (formattedDate) {
      // console.log(formattedDate);
    }
  }, [formattedDate]);

  const irFecha = () => {
    // console.log(formattedDate)
    localStorage.removeItem("fecha");
    localStorage.setItem('fecha', formattedDate);
    window.location.assign('/BuscarFecha');
  };

  return (
    <div className="flex justify-center m-1 sm:justify-start">
      <Card className="w-60">
        <CardBody className="text-center">
          <h2>Busca una fecha</h2>
          <Divider className="mt-2 mb-2" />
          <DatePicker
            value={selectedDate}
            onChange={handleDateChange}
            label="Selecciona la fecha"
            className="max-w-[284px]"
          />

          <Button color="primary" className="mt-4" onClick={irFecha} size="md">
            Buscar
          </Button>
        </CardBody>
      </Card>
    </div>
  );
}

export default CardDateSelect;
