const cards = [
  { id: 1, question: 'What is the capital of France?', answer: 'Paris' },
    { id: 2, question: 'What is the color of the sky?', answer: 'Blue' },
    { id: 3, question: 'What is 2 + 2?', answer: '4' },
    { id: 4, question: 'What is the largest planet in our solar system?', answer: 'Jupiter' },
    { id: 5, question: 'What is the square root of 64?', answer: '8' },
    { id: 6, question: 'Who wrote the play "Romeo and Juliet"?', answer: 'William Shakespeare' },
    { id: 7, question: 'What is the chemical symbol for water?', answer: 'H2O' },
    { id: 8, question: 'What is the smallest country in the world?', answer: 'Vatican City' },
    { id: 9, question: 'Who painted the Mona Lisa?', answer: 'Leonardo da Vinci' },
    { id: 10, question: 'What is the capital of Japan?', answer: 'Tokyo' },
];

export async function POST(req) {
  const body = await req.json();
  const seenCardIds = body.seenCardIds || [];

  // Filter out cards that have already been seen
  const remainingCards = cards.filter((card) => !seenCardIds.includes(card.id));

  // Calculate progress (percentage of cards seen)
  const progress = {
    totalSeenCards: seenCardIds.length + 1,
    totalCards: cards.length
  }

  if (remainingCards.length === 0) {
    return new Response(
      JSON.stringify({ message: 'All cards read!', progress }),
      {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  }

  // Select a random unseen card
  const randomCard = remainingCards[Math.floor(Math.random() * remainingCards.length)];

  return new Response(
    JSON.stringify({ card: randomCard, progress }),
    {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    }
  );
}
