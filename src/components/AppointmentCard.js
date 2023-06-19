import { Badge, Card, Text } from "@tremor/react";
import moment from "moment";
import React from "react";

function AppointmentCard({ id, farmerName, empEmail, address, problem, time }) {
  return (
    <Card
      decoration="top"
      decorationColor="indigo"
      className="!bg-white max-w-md mt-3"
    >
      <Badge className="!bg-gray-200 !text-green-600 font-semibold">
        Appointment Reference: {id}
      </Badge>
      <Text className="text-lg font-semibold mt-2">
        Appointment booked by: {farmerName}
      </Text>
      <Text className="text-lg font-semibold mt-2">
        Employee booked: {empEmail}
      </Text>
      <Text className="text-lg font-semibold mt-2">
        Farmer Address: {address}
      </Text>
      <Text className="text-lg font-semibold mt-2">Probelem: {problem}</Text>
      <Text className="text-lg font-semibold mt-2">
        Booking time: {moment(time).format("LT")}
      </Text>
    </Card>
  );
}

export default AppointmentCard;
