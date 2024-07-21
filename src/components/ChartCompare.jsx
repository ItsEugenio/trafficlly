import * as React from "react";
import { LineChart, lineElementClasses } from "@mui/x-charts/LineChart";

import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

const hours = [
  "00:00",
  "01:00",
  "02:00",
  "03:00",
  "04:00",
  "05:00",
  "06:00",
  "07:00",
  "08:00",
  "09:00",
  "10:00",
  "11:00",
  "12:00",
  "13:00",
  "14:00",
  "15:00",
  "16:00",
  "17:00",
  "18:00",
  "19:00",
  "20:00",
  "21:00",
  "22:00",
  "23:00",
];

const daysIn = [
  5, 8, 5, 7, 3, 6, 4, 5, 5, 6, 5, 8, 12, 15, 4, 8, 2, 6, 5, 3, 1, 9, 5,3,
];

const daysAny = [
  15, 88, 35, 70, 33, 16, 44, 75, 55, 15, 25, 58, 22, 4, 63, 95, 6, 60, 51, 30, 11, 89, 50, 13,
];

function ChartCompare() {
  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
    <div className="flex justify-center">
      <LineChart
        width={800}
        height={400}
        series={[
          { curve: "linear",data: daysIn, label: "Personas que entran",color: "#fdfd00" },
          { curve: "linear",data: daysAny, label: "Personas que pasan",color: "#00f9fd", },
        ]}
        xAxis={[{ scaleType: "point", data: hours }]}
      />
    </div>
    </ThemeProvider>
  );
}

export default ChartCompare;



