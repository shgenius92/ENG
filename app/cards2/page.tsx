'use client';
import React from "react";

const App = () => {
  // Mock data: 90 cards with unique IDs and titles
  const cards = Array.from({ length: 90 }, (_, i) => ({
    id: i + 1,
    title: `Card ${i + 1}`,
  }));

  // Generate 30 buckets, each containing 3 cards
  const buckets = Array.from({ length: 30 }, (_, i) => ({
    id: i + 1,
    cards: cards.slice(i * 3, i * 3 + 3),
  }));

  return (
    <div className="p-6 min-h-screen bg-gradient-to-r from-green-100 to-blue-200 flex flex-col items-center">
      <h1 className="text-3xl font-extrabold text-center mb-6">Card Buckets</h1>

      {/* Buckets */}
      <div className="grid grid-cols-5 gap-6">
        {buckets.map((bucket) => (
          <div
            key={bucket.id}
            className="relative w-28 h-48 bg-transparent rounded-lg flex flex-col justify-start items-center"
          >
            {/* Stack the 3 cards */}
            {bucket.cards.map((card, index) => (
              <div
                key={card.id}
                className={`absolute w-28 h-40 bg-gradient-to-b from-gray-100 to-gray-300 rounded-lg shadow-lg border border-gray-300 p-4 flex flex-col justify-between items-center text-center transform`}
                style={{
                  top: `${index * 8}px`, // Offset to simulate stacking
                  left: `${index * 4}px`,
                  boxShadow: `${index === 0 ? '0px 8px 15px rgba(0, 0, 0, 0.2)' : ''}`,
                }}
              >
                {/* Card Content */}
                <div className="flex justify-center items-center w-full h-full text-sm text-gray-700 font-semibold">
                  {/* Card Text */}
                  <div className="w-full h-full flex justify-center items-center bg-white p-4 rounded-lg border border-gray-300 shadow-md">
                    <p className="text-sm font-medium text-gray-800">Card Content</p>
                  </div>
                </div>

                {/* Bucket Number & Design - Only on the 3rd card */}
                {index === 2 && (
                  <div className="absolute top-0 left-1/2 transform -translate-x-1/2 text-lg font-bold text-blue-600 bg-white p-1 rounded-full shadow-md mb-2">
                    Bucket {bucket.id}
                  </div>
                )}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;
