import React from "react";

function NewsCard({ image, author, desc, date, visitUrl }) {
  return (
    <div
      className={
        !image
          ? "hidden"
          : `max-w-3xl flex flex-col items-center justify-center mx-auto mt-5 border border-gray-300 rounded-lg p-3 bg-gray-100 hover:scale-105 transition-all duration-200 ease-out`
      }>
      <div>
        <img
          src={image}
          alt="pic"
          height={300}
          width={500}
          className={`rounded-lg object-contain`}
        />
      </div>

      <div>
        <p className="text-sm mt-4">{desc}</p>
        <p className="text-sm mt-3">
          published by {author} on {date}
        </p>
        <a className="text-sm text-blue-600" href={visitUrl}>
          {visitUrl}
        </a>
      </div>
    </div>
  );
}

export default NewsCard;
