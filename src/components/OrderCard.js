import { Badge, Card, Text } from "@tremor/react";
import moment from "moment";
import React, { useEffect, useState } from "react";

function OrderCard({ id, name, email, items, time, date }) {
  const [groupedItemsInBasket, setGroupedItemsInBasket] = useState([]);

  useEffect(() => {
    const groupedItems = items.reduce((results, item) => {
      (results[item.id] = results[item.id] || []).push(item);
      return results;
    }, {});
    setGroupedItemsInBasket(groupedItems);
  }, [items]);

  return (
    <div>
      <Card
        decoration="top"
        decorationColor="purple"
        className="!bg-white w-fit"
      >
        <Badge className="!bg-green-500 !text-white">Ordered By: {name}</Badge>
        <Text className="mt-3 font-semibold">User email: {email}</Text>
        <Text className="mt-3 font-semibold">
          Ordered at: {moment(time).format("LT")}
        </Text>
        <Text className="mt-3 font-bold">Ordered Products:</Text>
        {Object.entries(groupedItemsInBasket).map(([key, items]) => (
          <Badge className="mt-3 !bg-green-500 !text-white">
            {items[0].productName}
          </Badge>
        ))}
      </Card>
    </div>
  );
}

export default OrderCard;
