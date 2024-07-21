import React, { useState, useEffect } from "react";
import { Card, CardBody, Divider, DatePicker, Button } from "@nextui-org/react";
import { IoIosSearch } from "react-icons/io";

function CardDateSelect() {
  const [selectedDate, setSelectedDate] = useState(null);
  const [formattedDate, setFormattedDate] = useState("");

  const handleDateChange = (newValue) => {
    setSelectedDate(newValue);

    const day = newValue?.day;
    const month = newValue?.month;
    const year = newValue?.year;

    if (day !== undefined && month !== undefined && year !== undefined) {
      const formattedDay = String(day).padStart(2, "0");
      const formattedMonth = String(month).padStart(2, "0");
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
    localStorage.setItem("fecha", formattedDate);
    window.location.assign("/BuscarFecha");
  };

  return (
    <div>
      <h1 className="text-center text-xl">Ver Historial</h1>
      <div className="flex justify-center m-1 sm:justify-start">
        <Card className="w-64 sm:w-64 md:w-96">
          <CardBody className="text-center">
            <div className="flex justify-center items-center">
              <DatePicker
                value={selectedDate}
                onChange={handleDateChange}
                label="Selecciona la fecha"
                className="max-w-[284px]"
              />
              <Button
                color="primary"
                onClick={irFecha}
                size="md"
                className="ml-4"
                isIconOnly
              >
                <IoIosSearch size={30} />
              </Button>
            </div>
          </CardBody>
        </Card>
      </div>
    </div>
  );
}

export default CardDateSelect;
