// pages/index.tsx
import React from "react";

const Card: React.FC<{ index: number }> = ({ index }) => {
  return (
    <div className="w-24 h-36 border border-black rounded-lg shadow-lg bg-white relative flex flex-col items-center justify-center">
      <div className="absolute top-2 right-2 text-xs font-bold text-gray-800">
        Bucket {index}
      </div>
      <div className="flex justify-center items-center h-full text-4xl">
        <span className="text-5xl">🔒</span>
      </div>
    </div>
  );
};

const Page: React.FC = () => {
  const rows = 6; // Total number of rows of cards (6 rows of 5 cards)
  const cardsPerRow = 5;

  const cardElements = [];
  for (let i = 1; i <= rows * cardsPerRow; i++) {
    cardElements.push(<Card key={i} index={i} />);
  }

  return (
    <div className="grid grid-cols-5 gap-4 p-6">
      {cardElements.map((card, index) => (
        <div key={index} className="flex justify-center">
          {card}
        </div>
      ))}
    </div>
  );
};

export default Page;
