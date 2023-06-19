import React from "react";

function AddedProductCard({ grain, category }) {
  return (
    <div className="bg-green-400 rounded-full text-white px-3 py-2 mr-3">
      <p className="font-semibold text-center">
        {grain} : {category}
      </p>
    </div>
  );
}

export default AddedProductCard;
