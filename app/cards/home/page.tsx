'use client';
import React from "react";
import Link from "next/link";

const Card: React.FC<{ index: number }> = ({ index }) => {
  const handleCardClick = () => {
    // Set currentBucket in localStorage and navigate to /card
    localStorage.setItem('currentBucket', index.toString());
    localStorage.setItem('seenCards', JSON.stringify([]));
  };

  return (
    <Link href="/cards/cards">
      <div
        onClick={handleCardClick}
        className="w-24 h-32 border border-black rounded-lg shadow-lg bg-white relative flex flex-col items-center justify-center cursor-pointer"
      >
        <div className="absolute top-2 text-xs font-bold text-gray-800">
          Bucket {index}
        </div>
        <div className="flex justify-center items-center h-full text-4xl">
          <span className="text-3xl">🔓</span>
        </div>
      </div>
    </Link>
  );
};

const Page: React.FC = () => {
  const totalCards = 34; // Total number of cards

  const cardElements = [];
  for (let i = 1; i <= totalCards; i++) {
    cardElements.push(<Card key={i} index={i} />);
  }

  return (
    <div className="grid grid-cols-4 sm:grid-cols-4 md:grid-cols-4 lg:grid-cols-5 gap-2 p-6">
      {cardElements.map((card, index) => (
        <div key={index} className="flex justify-center">
          {card}
        </div>
      ))}
    </div>
  );
};

export default Page;
