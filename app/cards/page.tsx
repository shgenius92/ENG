'use client';
import { useState, useEffect } from 'react';

// Define the type for the card
type Card = {
  id: number;
  question: string;
  answer: string;
};

export default function CardApp() {
  const [currentCard, setCurrentCard] = useState<Card | null>(null);
  const [seenCards, setSeenCards] = useState(new Set());
  const [repetitionCards, setRepetitionCards] = useState(new Set());
  const [progress, setProgress] = useState({totalSeenCards: "?", totalCards: "?"});

  useEffect(() => {
    const storedSeenCards = new Set(JSON.parse(localStorage.getItem('seenCards') || '[]'));
    const storedRepetitionCards = new Set(JSON.parse(localStorage.getItem('repetitionCards') || '[]'));
    setSeenCards(storedSeenCards);
    setRepetitionCards(storedRepetitionCards);
  }, []);

  const fetchCard = async () => {
    const response = await fetch('/api/getCard', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ seenCardIds: [...seenCards] }),
    });
    const data = await response.json();

    if (data.message === 'All cards read!') {
      alert('You have read all the cards!');
      return;
    }

    setCurrentCard(data.card);
    setProgress(data.progress);

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
      alert('Card marked for repetition!');
    }
  };

  const resetCards = () => {
    setSeenCards(new Set());
    setRepetitionCards(new Set());
    setCurrentCard(null);
    setProgress({
                    totalSeenCards: "?",
                    totalCards: "?"
                  })
    localStorage.setItem('seenCards', JSON.stringify([]));
    localStorage.setItem('repetitionCards', JSON.stringify([]));
  };

  return (
    <div className="bg-gradient-to-r from-blue-400 to-blue-600 min-h-screen text-white flex flex-col items-center justify-center py-8 relative">
      {/* Seen Cards Counter */}
      <div className="absolute top-4 left-4 p-4 bg-opacity-70 bg-gray-800 rounded-xl">
        <p className="text-lg font-semibold">
          Seen: {progress.totalSeenCards} / {progress.totalCards}
        </p>
      </div>

      {/* App Title */}
      <div className="text-3xl font-bold mb-8">Flashcards App</div>

      {/* Card Container */}
      <div className="w-96 h-96 bg-white rounded-xl shadow-lg overflow-hidden transform transition-all">
        {currentCard ? (
          <div className="w-full h-full flex flex-col justify-center items-center p-4 bg-gray-100 rounded-xl">
            <h2 className="text-2xl font-semibold text-blue-500 mb-4">{currentCard.question}</h2>
            <p className="text-xl text-gray-800">{currentCard.answer}</p>
          </div>
        ) : (
          <div className="w-full h-full flex justify-center items-center text-gray-500">
            <p>No card selected. Click 'Get New Card' to start.</p>
          </div>
        )}
      </div>

      {/* Buttons */}
      <div className="mt-8 space-x-4 flex justify-center items-center">
        <button
          onClick={fetchCard}
          className="px-6 py-3 bg-blue-500 hover:bg-blue-700 rounded-lg text-lg"
        >
          Get New Card
        </button>
        <button
          onClick={markForRepetition}
          disabled={!currentCard}
          className="px-6 py-3 bg-yellow-500 hover:bg-yellow-700 rounded-lg text-lg disabled:opacity-50"
        >
          Mark for Repetition
        </button>
      </div>

      {/* Restart Button */}
      <div className="mt-8">
        <button
          onClick={resetCards}
          className="px-6 py-3 bg-red-500 hover:bg-red-700 rounded-lg text-lg"
        >
          Restart
        </button>
      </div>
    </div>
  );
}
