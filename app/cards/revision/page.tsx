'use client';
import { useState, useEffect, useRef } from 'react';

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

function getCardPosition(cardsSet: Set<number>, revisionCurrentCard: number): number {
  const cardsArray = Array.from(cardsSet);
  const position = cardsArray.indexOf(revisionCurrentCard);

  return position;
}

export default function CardApp() {
  const [currentCard, setCurrentCard] = useState<Card | null>(null);
  const [repetitionCards, setRepetitionCards] = useState<Set<number> | null>(null);
  const [progress, setProgress] = useState({ totalSeenCards: 0, totalCards: 0 });
  const [currentPosition, setCurrentPosition] = useState<number | null>(null);

  useEffect(() => {
    const storedRepetitionCards = localStorage.getItem('repetitionCards');
    const parsedRepetitionCards: Set<number> | null = (storedRepetitionCards === null || storedRepetitionCards === "[]") ? null : new Set(JSON.parse(storedRepetitionCards));

    // Fetch the value from localStorage
    // TODO rename RevisionCurrentCard to CurrentCardId
    const storedRevisionCurrentCard = localStorage.getItem('revision.currentCard');

    let parsedRevisionCurrentCard = null;
    let newCurrentPosition = null;
    // case when storedRevisionCurrentCard == null and parsedRepetitionCards == null => null (default) value
      // no currentPosition == null (default) value
    // case when storedRevisionCurrentCard == null and parsedRepetitionCards !== null => possible at the beginning
      // currentPosition == 0
    // case when storedRevisionCurrentCard !== null and parsedRepetitionCards == null => not possible
    // case when storedRevisionCurrentCard !== null and parsedRepetitionCards !== null => possible
      // currentPosition == getCardPosition(parsedRepetitionCards, parsedRevisionCurrentCard);

    if (storedRevisionCurrentCard && storedRevisionCurrentCard !== "null" && parsedRepetitionCards) {
        console.log('case when storedRevisionCurrentCard !== null and parsedRepetitionCards !== null');
        parsedRevisionCurrentCard = parseInt(storedRevisionCurrentCard, 10);
        newCurrentPosition = getCardPosition(parsedRepetitionCards, parsedRevisionCurrentCard);
    } else {
        if (parsedRepetitionCards) {
            console.log('case when storedRevisionCurrentCard == null and parsedRepetitionCards !== null');
            newCurrentPosition = 0;
            parsedRevisionCurrentCard = Array.from(parsedRepetitionCards)[newCurrentPosition];
        } else {
            console.log('case when storedRevisionCurrentCard == null and parsedRepetitionCards == null');
        }
    }

    console.log('parsedRevisionCurrentCard: ', parsedRevisionCurrentCard);
    console.log('newCurrentPosition: ', newCurrentPosition);

    if (newCurrentPosition != null && parsedRevisionCurrentCard != null)
        fetchCard(parsedRevisionCurrentCard);

    setRepetitionCards(parsedRepetitionCards);
    setCurrentPosition(newCurrentPosition);
    setProgress({ totalSeenCards: (newCurrentPosition != null) ? newCurrentPosition + 1 : 0, totalCards: (parsedRepetitionCards) ? parsedRepetitionCards.size : 0 });
  }, []);

  // Function to compute next position
    function computeNextPosition(cardsSet: Set<number>, position: number): number {
      if (position === cardsSet.size - 1) {
        return 0;
      }
      return position + 1;
    }

    // Function to fetch the card by id
    const fetchCard = async (cardId: number) => {

      console.log('fetchCard - cardId: ', cardId);

      const response = await fetch(`/api/getCard?id=${cardId}`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      });
      const data = await response.json();
      setCurrentCard(data.card);
    };

    const nextCard = async () => {
        if (repetitionCards && currentPosition) {
            console.log('nextCard - repetitionCards: ', repetitionCards);
            console.log('nextCard - currentPosition: ', currentPosition);
            console.log('nextCard - computeNextPosition(repetitionCards, currentPosition): ', computeNextPosition(repetitionCards, currentPosition));

            // TODO: condition useless
            if (currentCard) {
              const nextPosition = computeNextPosition(repetitionCards, currentPosition);
              const nextCardId = Array.from(repetitionCards)[nextPosition];
              fetchCard(nextCardId);

              setCurrentPosition(nextPosition);
              setProgress({ totalSeenCards: nextPosition + 1, totalCards: repetitionCards.size });

              localStorage.setItem('revision.currentCard', JSON.stringify(nextCardId));
            }
        }
    };

  const unMarkForRepetition = async () => {
    // delete the currentCard from repetitionCards
    if (currentCard) {
        const updatedRepetitionCards = new Set(repetitionCards);
        updatedRepetitionCards.delete(currentCard.id);
        console.log('unMarkForRepetition - repetitionCards - before: ', repetitionCards);
        console.log('unMarkForRepetition - repetitionCards - after: ', updatedRepetitionCards);

        // compute the nextPosition
        let nextPosition = currentPosition;
        if (updatedRepetitionCards.size === 0) {
          nextPosition = null;
        } else {
          if (nextPosition !== null && nextPosition >= updatedRepetitionCards.size) {
            nextPosition = 0;
          }
        }

        console.log('unMarkForRepetition - currentPosition: ', currentPosition);
        console.log('unMarkForRepetition - nextPosition: ', nextPosition);

        // fetch card
        let nextCardId = null;
        if (nextPosition != null) {
          nextCardId = Array.from(updatedRepetitionCards)[nextPosition];
          fetchCard(nextCardId);
        } else {
          setCurrentCard(null);
        }

        // Update states
        setRepetitionCards(updatedRepetitionCards);
        setProgress({ totalSeenCards: (nextPosition != null) ? nextPosition + 1 : 0, totalCards: (updatedRepetitionCards) ? updatedRepetitionCards.size : 0 });

        // Store in localStorage: repetitionCards / revision.currentCard
        localStorage.setItem('repetitionCards', JSON.stringify(Array.from(updatedRepetitionCards)));
        localStorage.setItem('revision.currentCard', JSON.stringify(nextCardId));
    }
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
            <p>No card marked for revision yet.</p>
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
                  disabled={!currentCard || repetitionCards?.size == 1}
                  className="px-4 sm:   px-6 py-2 sm:py-3 bg-blue-500 hover:bg-blue-700 rounded-lg text-base sm:text-lg shadow-md"
                >
                  {'>'}
        </button>
      </div>
    </div>
  );
}
