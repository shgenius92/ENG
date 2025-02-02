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

function getRevisionCurrentCardPosition(cardsSet: Set<number>, revisionCurrentCard: number): number {
  const cardsArray = Array.from(cardsSet);
  const position = cardsArray.indexOf(revisionCurrentCard);

  console.log('getRevisionCurrentCardPosition: ', position);
  return position;
}

export default function CardApp() {
  const [currentCard, setCurrentCard] = useState<Card | null>(null);
  const [repetitionCards, setRepetitionCards] = useState(new Set<number>());
  const [progress, setProgress] = useState({ totalSeenCards: 0, totalCards: 0 });
  const [revisionCurrentCard, setRevisionCurrentCard] = useState(-1);
  const [currentPosition, setCurrentPosition] = useState(-1);
  const [isFirstTimeLoaded, setIsFirstTimeLoaded] = useState(false);

  useEffect(() => {
    const storedRepetitionCards = new Set<number>(JSON.parse(localStorage.getItem('repetitionCards') || '[]'));
    setRepetitionCards(storedRepetitionCards);
    const storedRevisionCurrentCard = parseInt(localStorage.getItem('revisionCurrentCard') || -1, 10);
    const newRevisionCurrentCard = (storedRevisionCurrentCard < 0 && storedRepetitionCards.size > 0) ? Array.from(storedRepetitionCards)[0] : storedRevisionCurrentCard;

    setRevisionCurrentCard(newRevisionCurrentCard);
    setCurrentPosition(getRevisionCurrentCardPosition(storedRepetitionCards, newRevisionCurrentCard));

    setIsFirstTimeLoaded(true);
  }, []);

  useEffect(() => {
      if (isFirstTimeLoaded && revisionCurrentCard !== -1) {
        const cardId = Array.from(repetitionCards)[currentPosition];
        fetchCard(cardId);
      }
  }, [isFirstTimeLoaded]);

  useEffect(() => {
        if (revisionCurrentCard == -1) {
          setCurrentCard(null);
        } else if (revisionCurrentCard !== -1) {
            fetchCard(revisionCurrentCard);
        }
  }, [revisionCurrentCard]);

    // Function to fetch the card by id
    const fetchCard = async (cardId: number) => {
      const response = await fetch(`/api/getCard?id=${cardId}`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      });
      const data = await response.json();
      setCurrentCard(data.card);
      setProgress({ totalSeenCards: currentPosition + 1, totalCards: repetitionCards.size });
      setRevisionCurrentCard(data.card.id);

      localStorage.setItem('revisionCurrentCard', JSON.stringify(data.card.id));
      console.log('fetchCard - current revisionCurrentCard: ', data.card.id);
    };

    // Function to compute next position
    function computeNextPosition(cardsSet: Set<number>, position: number): number {
      if (revisionCurrentCard === -1 || position === repetitionCards.size - 1) {
        return 0;
      }
      return position + 1;
    }

    const nextCard = async () => {
      console.log('next() - fetchCard');
      const newPosition = computeNextPosition(repetitionCards, currentPosition);
      setCurrentPosition(newPosition);
      fetchCard(Array.from(repetitionCards)[newPosition]);
    };

  const unMarkForRepetition = async () => {
        console.log('revisionCurrentCard:', revisionCurrentCard);

        // Step 1: Remove the current `revisionCurrentCard` from the `repetitionCards` set
        const updatedRepetitionCards = new Set(repetitionCards);
        updatedRepetitionCards.delete(revisionCurrentCard);


        console.log('old currentPosition:', currentPosition);
        // Step 2: Update the `currentPosition`
        let newPosition = currentPosition;
        if (updatedRepetitionCards.size === 0) {
          newPosition = -1;
        } else {
          const newCardsArray = Array.from(updatedRepetitionCards);
          // Ensure we're not pointing to an invalid position (in case we removed the current card)
          if (newPosition >= newCardsArray.length) {
            newPosition = 0;
          }
        }
        console.log('new currentPosition:', newPosition);

        let newRevisionCurrentCard = (newPosition == -1) ? -1 : Array.from(updatedRepetitionCards)[newPosition];

        // Step 3: Update state with the new set and position
        setRepetitionCards(updatedRepetitionCards);
        setCurrentPosition(newPosition);
        setRevisionCurrentCard(newRevisionCurrentCard);

        // Step 4: Save the updated repetitionCards and revisionCurrentCard to localStorage
        localStorage.setItem('repetitionCards', JSON.stringify(Array.from(updatedRepetitionCards)));
        localStorage.setItem('revisionCurrentCard', JSON.stringify(newRevisionCurrentCard));

  };

  return (
    <div className="bg-gradient-to-r from-blue-400 to-blue-600 min-h-screen text-white flex flex-col items-center justify-center py-8 relative">
      {/* Seen Cards Counter */}
      <div className="absolute top-4 left-4 p-4 bg-opacity-70 bg-gray-800 rounded-xl sm:top-6 sm:left-6">
        <p className="text-sm sm:text-lg font-semibold text-center">
          {currentCard ? `${progress.totalSeenCards} / ${progress.totalCards}` : ('0 / 0')}
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
          onClick={unMarkForRepetition}
          disabled={!currentCard}
          className="px-4 sm:px-6 py-2 sm:py-3 bg-yellow-500 hover:bg-yellow-700 rounded-lg text-base sm:text-lg shadow-md disabled:opacity-50"
        >
          UnMark for revision
        </button>
        <button
                  onClick={nextCard}
                  disabled={!currentCard}
                  className="px-4 sm:px-6 py-2 sm:py-3 bg-blue-500 hover:bg-blue-700 rounded-lg text-base sm:text-lg shadow-md"
                >
                  {'>'}
        </button>
      </div>
    </div>
  );
}
