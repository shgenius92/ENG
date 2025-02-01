'use client';
import { useState, useEffect } from 'react';

// Define the type for the card


type Card = {
  id: number;
  example_en: string;
  example_vi: string;
  word: string;
  type: string;
  ipa: string;
  ipa_example: string;
  vi: string;
};

export default function CardApp() {
  const defaultLotSize = 100; // TODO: to be deleted

  const [currentCard, setCurrentCard] = useState<Card | null>(null);
  const [seenCards, setSeenCards] = useState(new Set<number>());
  const [repetitionCards, setRepetitionCards] = useState(new Set<number>());
  const [progress, setProgress] = useState({ totalSeenCards: 0, totalCards: 0 });
  const [currentBucketVar, setCurrentBucketVar] = useState(0);

  useEffect(() => {
    // Fetch data from localStorage
    const storedSeenCards = new Set<number>(JSON.parse(localStorage.getItem('seenCards') || '[]'));
    const storedRepetitionCards = new Set<number>(JSON.parse(localStorage.getItem('repetitionCards') || '[]'));
    const storedCurrentBucket = parseInt(localStorage.getItem('currentBucket') || '0', 10);
    setSeenCards(storedSeenCards);
    setRepetitionCards(storedRepetitionCards);
    setCurrentBucketVar(storedCurrentBucket);

    // If there are seen cards, get the last one
    if (storedSeenCards.size > 0) {
      const lastSeenCardId = Array.from(storedSeenCards)[storedSeenCards.size - 1];
      console.log(`Last seen card ID: ${lastSeenCardId}`);

      const fetchLastCard = async () => {
        const response = await fetch(`/api/getCard?id=${lastSeenCardId}`, {
          method: 'GET',
          headers: { 'Content-Type': 'application/json' },
        });

        const data = await response.json();

        if (data.card) {
          setCurrentCard(data.card);
        }
      };
      fetchLastCard();
    }

    setProgress({
          totalSeenCards: storedSeenCards.size,
          totalCards: defaultLotSize,
        });
  }, []);

  const fetchCard = async () => {
    const response = await fetch('/api/getCard', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ seenCardIds: [...seenCards], currentBucket: currentBucketVar}),
    });
    const data = await response.json();

    console.log('API response:', data);

    if (data.message === 'All cards read!') {
      alert('You have read all the cards!');
      return;
    }

    setCurrentCard(data.card);
    setProgress(data.progress);
    console.log('Card set:', data.card);

    const updatedSeenCards = new Set(seenCards);
    updatedSeenCards.add(data.card.id);
    setSeenCards(updatedSeenCards);
    localStorage.setItem('seenCards', JSON.stringify([...updatedSeenCards]));
  };

  const markForRepetition = () => {
    if (currentCard?.id) {
      const updatedRepetitionCards = new Set(repetitionCards);
      updatedRepetitionCards.add(currentCard.id);
      setRepetitionCards(updatedRepetitionCards);
      localStorage.setItem('repetitionCards', JSON.stringify([...updatedRepetitionCards]));
    }
  };

  const resetCards = () => {
    setSeenCards(new Set());
    setCurrentCard(null);
    setProgress({
      totalSeenCards: 0,
      totalCards: 0,
    });
    localStorage.setItem('seenCards', JSON.stringify([]));
    localStorage.setItem('repetitionCards', JSON.stringify([]));
  };

  return (
    <div className="bg-gradient-to-r from-blue-400 to-blue-600 min-h-screen text-white flex flex-col items-center justify-center py-8 relative">
      {/* Seen Cards Counter */}
      <div className="absolute top-4 left-4 p-4 bg-opacity-70 bg-gray-800 rounded-xl sm:top-6 sm:left-6">
        <p className="text-sm sm:text-lg font-semibold">
          Bucket {currentBucketVar}
        </p>
        <p className="text-sm sm:text-lg font-semibold text-center">
          {progress.totalSeenCards} / {progress.totalCards}
        </p>
      </div>

      {/* App Title */}
      <div className="text-2xl sm:text-3xl font-bold mb-6 sm:mb-8 text-center">
        Flashcards App
      </div>

      {/* Card Container */}
      <div className="w-80 h-80 sm:w-96 sm:h-96 bg-white rounded-xl shadow-lg overflow-hidden transform transition-all relative">
        {currentCard ? (
          <div className="w-full h-full flex flex-col justify-center items-center p-4 bg-gray-100 rounded-xl relative">
            {/* Additional Information (Top Left) */}
            <div className="absolute top-5 inset-x-0 flex justify-center">
              <div className="">
                {/* Word, IPA, and Translation */}
                <div className="flex flex-wrap items-center justify-center space-x-3">
                  <span className="text-base sm:text-lg text-purple-600">
                    {currentCard.word} {currentCard.type}
                  </span>
                  <span className="text-base sm:text-lg text-green-600">
                    {currentCard.ipa}
                  </span>
                  <span className="text-base sm:text-lg text-red-600">
                    {'>'} {currentCard.vi}
                  </span>
                </div>
              </div>
            </div>

            {/* Main Card Content */}
            <div className="flex-grow flex flex-col justify-center mt-4">
              <h2 className="text-xl font-semibold text-blue-500 mb-4 text-justify">
                {currentCard.example_vi}
              </h2>
              <p className="text-lg text-gray-800 text-justify">{currentCard.example_en}</p>
              <h3 className="text-base text-green-600">{currentCard.ipa_example}</h3>
            </div>
          </div>
        ) : (
          <div className="w-full h-full flex justify-center items-center text-gray-500 text-center">
            <p>No card selected. Click 'Get New Card' to start.</p>
          </div>
        )}
      </div>

      {/* Buttons */}
      <div className="mt-8 sm:mt-10 space-y-4 sm:space-y-0 sm:space-x-4 flex flex-col sm:flex-row justify-center items-center">
        <button
          onClick={fetchCard}
          className="px-4 sm:px-6 py-2 sm:py-3 bg-blue-500 hover:bg-blue-700 rounded-lg text-base sm:text-lg shadow-md"
        >
          Get New Card
        </button>
        <button
          onClick={markForRepetition}
          disabled={!currentCard}
          className="px-4 sm:px-6 py-2 sm:py-3 bg-yellow-500 hover:bg-yellow-700 rounded-lg text-base sm:text-lg shadow-md disabled:opacity-50"
        >
          Mark for Repetition
        </button>
      </div>

      {/* Restart Button */}
      <div className="mt-6 sm:mt-8">
        <button
          onClick={resetCards}
          className="px-4 sm:px-6 py-2 sm:py-3 bg-red-500 hover:bg-red-700 rounded-lg text-base sm:text-lg shadow-md"
        >
          Restart
        </button>
      </div>
    </div>
  );
}
