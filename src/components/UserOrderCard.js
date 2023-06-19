import { Badge, Card, Text } from "@tremor/react";
import moment from "moment";
import React, { useEffect, useState } from "react";

function UserOrderCard({ id, items, time, name }) {
  const [groupedItemsInBasket, setGroupedItemsInBasket] = useState([]);

  useEffect(() => {
    const groupedItems = items.reduce((results, item) => {
      (results[item.id] = results[item.id] || []).push(item);
      return results;
    }, {});
    setGroupedItemsInBasket(groupedItems);
  }, [items]);

  console.log(groupedItemsInBasket);
  return (
    <Card
      decoration="top"
      decorationColor="green"
      className="!bg-white !max-w-md mt-5">
      <Badge className="!bg-green-400 !text-white">Order Reference: {id}</Badge>
      <Text className="mt-3 !text-bold">Ordered by: {name}</Text>
      <Text className="mt-3 !text-bold">
        Ordered at: {moment(time).format("LT")}
      </Text>
      <Text className="mt-3 !text-bold">Ordered products:</Text>
      <div className="flex items-center mr-3 flex-wrap">
        {Object.entries(groupedItemsInBasket).map(([key, items]) => (
          <Badge className="mt-3 !bg-green-500 !text-white">
            {items[0].productName}
          </Badge>
        ))}
      </div>
    </Card>
  );
}

export default UserOrderCard;
