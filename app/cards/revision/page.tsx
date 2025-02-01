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

let currentPosition = 0;

function computeNextPosition(cardsSet: Set<number>, position: number): number {
  const cards = Array.from(cardsSet);
  let result = 0;
  if (position >= 0 && position < cards.length - 1) {
    result = position + 1;
  } else {
    result = 0;
  }

  localStorage.setItem('revisionCurrentCard', JSON.stringify(cards[result]));
  return result;
}

function getRevisionCurrentCardPosition(cardsSet: Set<number>, revisionCurrentCard: number): number {
  const cardsArray = Array.from(cardsSet);
  const position = cardsArray.indexOf(revisionCurrentCard);

  return position;
}

export default function CardApp() {
  const [currentCard, setCurrentCard] = useState<Card | null>(null);
  const [repetitionCards, setRepetitionCards] = useState(new Set<number>());
  const [progress, setProgress] = useState({ totalSeenCards: 0, totalCards: 0 });
  let revisionCurrentCard = 0;

  useEffect(() => {
    // Fetch data from localStorage
    const storedRepetitionCards = new Set<number>(JSON.parse(localStorage.getItem('repetitionCards') || '[]'));
    setRepetitionCards(storedRepetitionCards);
    revisionCurrentCard = parseInt(localStorage.getItem('revisionCurrentCard') || '0', 10);
    // if revisionCurrentCard = NAN, should update it with the card position = 0
    currentPosition = getRevisionCurrentCardPosition(storedRepetitionCards, revisionCurrentCard);

    console.log('revisionCurrentCard: ', revisionCurrentCard);
    console.log('storedRepetitionCards.size: ', storedRepetitionCards.size);
    console.log('currentPosition: ', currentPosition);
    console.log('storedRepetitionCards: ', storedRepetitionCards);
    // If there are seen cards, get the last one
    if (storedRepetitionCards.size > 0) {
      console.log('card to retrieve: ', Array.from(storedRepetitionCards)[currentPosition]);
      const fetchNextCard = async () => {
        console.log('card to retrieve: ', Array.from(storedRepetitionCards)[currentPosition]);
        const response = await fetch(`/api/getCard?id=${Array.from(storedRepetitionCards)[currentPosition]}`, {
          method: 'GET',
          headers: { 'Content-Type': 'application/json' },
        });

        const data = await response.json();

        if (data.card) {
          setCurrentCard(data.card);
        }
      };
      fetchNextCard();

      setProgress({
        totalSeenCards: currentPosition + 1,
        totalCards: storedRepetitionCards.size,
      });
    }
  }, []);

  const nextCard = async () => {
    currentPosition = computeNextPosition(repetitionCards, currentPosition);
    const response = await fetch(`/api/getCard?id=${Array.from(repetitionCards)[currentPosition]}`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
    });
    const data = await response.json();

    setCurrentCard(data.card);
    setProgress({ totalSeenCards: (currentPosition + 1), totalCards: (repetitionCards.size) });
  };

  const unMarkForRepetition = async () => {  // Make the function async
    if (currentCard?.id) {
      const updatedRepetitionCards = new Set(repetitionCards);
      console.log("updatedRepetitionCards: ", updatedRepetitionCards);

      updatedRepetitionCards.delete(currentCard.id);
      console.log("updatedRepetitionCards after: ", updatedRepetitionCards);

      setRepetitionCards(updatedRepetitionCards);
      localStorage.setItem('repetitionCards', JSON.stringify([...updatedRepetitionCards]));

      if (updatedRepetitionCards.size === 1) {
        currentPosition = 0;
        revisionCurrentCard = Array.from(updatedRepetitionCards)[currentPosition];
      } else if (updatedRepetitionCards.size === 0) {
        revisionCurrentCard = -1;
      } else {
        currentPosition = updatedRepetitionCards.size > currentPosition ? currentPosition : currentPosition - 1;
        revisionCurrentCard = Array.from(updatedRepetitionCards)[currentPosition]
      }
      localStorage.setItem('revisionCurrentCard', JSON.stringify(revisionCurrentCard));

      // Recalculate the progress after removing the card
      const newTotalCards = updatedRepetitionCards.size;
      const newTotalSeenCards = currentPosition;

      // Await the fetch request
      const response = await fetch(`/api/getCard?id=${Array.from(updatedRepetitionCards)[currentPosition]}`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      });

      // Await the .json() to resolve the response
      const data = await response.json();

      setCurrentCard(data.card);  // Now set the card

      setProgress({
        totalSeenCards: newTotalSeenCards,
        totalCards: newTotalCards,
      });
    }
  };

  return (
    <div className="bg-gradient-to-r from-blue-400 to-blue-600 min-h-screen text-white flex flex-col items-center justify-center py-8 relative">
      {/* Seen Cards Counter */}
      <div className="absolute top-4 left-4 p-4 bg-opacity-70 bg-gray-800 rounded-xl sm:top-6 sm:left-6">
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
          onClick={nextCard}
          className="px-4 sm:px-6 py-2 sm:py-3 bg-blue-500 hover:bg-blue-700 rounded-lg text-base sm:text-lg shadow-md"
        >
          {'>'}
        </button>
        <button
          onClick={unMarkForRepetition}
          disabled={!currentCard}
          className="px-4 sm:px-6 py-2 sm:py-3 bg-yellow-500 hover:bg-yellow-700 rounded-lg text-base sm:text-lg shadow-md disabled:opacity-50"
        >
          UnMark for revision
        </button>
      </div>
    </div>
  );
}
