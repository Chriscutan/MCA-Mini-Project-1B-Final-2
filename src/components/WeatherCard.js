import { Card, Text } from "@tremor/react";
import React from "react";

function WeatherCard({ title, value, topColor, unit }) {
  return (
    <Card
      decoration="top"
      decorationColor={topColor}
      className="!bg-white text-center !max-w-xl !mr-3"
    >
      <Text className="!text-md font-semibold">{title}</Text>
      <Text className="!text-3xl font-bold mt-3 !text-black">
        {value}&nbsp;{unit}
      </Text>
    </Card>
  );
}

export default WeatherCard;
