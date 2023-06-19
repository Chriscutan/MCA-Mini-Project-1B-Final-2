import { AreaChart, Card, Title } from "@tremor/react";
import React from "react";

function HumidityChart({ results }) {
  const hourly = results?.hourly?.time.map((time) =>
    new Date(time)
      .toLocaleString("en-US", { hour: "numeric", hour12: false })
      .slice(0, 24)
  );

  const data = hourly?.map((hour, i) => ({
    Time: Number(hour),
    Humidity: results.hourly.relativehumidity_2m[i],
  }));

  const dataFormatter = (number) => `${number}`;
  return (
    <Card className="!mt-5 !bg-gray-100">
      <Title className="!text-black font-bold">Humidity v/s Time</Title>
      <AreaChart
        className=" !bg-gray-100 mt-5"
        data={data}
        showLegend
        index="Time"
        categories={["Humidity"]}
        colors={["rose"]}
        minValue={0}
        yAxisWidth={40}
        valueFormatter={dataFormatter}
      />
    </Card>
  );
}

export default HumidityChart;
