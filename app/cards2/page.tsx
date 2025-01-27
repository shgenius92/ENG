import React from "react";
import { Lock } from "lucide-react";

const CardPage = () => {
  // Create an array with 30 buckets
  const buckets = Array.from({ length: 30 }, (_, index) => index + 1);

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="container mx-auto flex flex-wrap justify-start">
        {buckets.map((bucket) => (
          <div
            key={bucket}
            className="bg-white rounded-lg shadow-md flex flex-col items-center justify-center m-2 w-32 h-40"
          >
            <div className="w-full p-2 flex justify-center bg-gray-100 rounded-t-lg">
              <h2 className="text-xs font-semibold text-center text-gray-700">Bucket {bucket}</h2>
            </div>

            <div className="flex items-center justify-center flex-grow">
              <Lock className="text-gray-500 h-8 w-8" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CardPage;
