import { useState, useEffect } from "react";
import { useWindowSize } from "@react-hook/window-size";
import Confetti from "react-confetti";
import Cards from "./Components/Cards";
import captain from "./assets/captain.png";
import batman from "./assets/batman.png";
import goku from "./assets/goku.png";
import raian from "./assets/raian.png";
import wolverine from "./assets/wolverine.png";
import ariel from "./assets/ariel.png";
import gohan from "./assets/gohan.png";
import superman from "./assets/superman.png";
import panther from "./assets/panther.png";

const cardImg = [
  { src: captain, matched: false },
  { src: batman, matched: false },
  { src: goku, matched: false },
  { src: ariel, matched: false },
  { src: wolverine, matched: false },
  { src: raian, matched: false },
  { src: panther, matched: false },
  { src: superman, matched: false },
  { src: gohan, matched: false },
];

function App() {
  const [width, height] = useWindowSize()
  const [cards, setCards] = useState([]);
  const [turns, setTurns] = useState(0);
  const [firstChoice, setFirstChoice] = useState(null);
  const [secChoice, setSecChoice] = useState(null);
  const [disabled, setDisabled] = useState(false);
  const [win, setWin] = useState(false);

  const shuffledCards = () => {
    const shuffled = [...cardImg, ...cardImg]
      .sort(() => Math.random() - 0.5)
      .map((card) => ({ ...card, id: Math.random(), flipped: false }));

    setFirstChoice(null);
    setSecChoice(null);
    setCards(shuffled);
    setTurns(0);
    setWin(false);
  };

  const reset = () => {
    setFirstChoice(null);
    setSecChoice(null);
    setTurns((prevTurns) => prevTurns + 1);
    setDisabled(false);
  };

  const handleChoice = (card) => {
    firstChoice ? setSecChoice(card) : setFirstChoice(card);
  };

  useEffect(() => {
    if (firstChoice && secChoice) {
      setDisabled(true);
      if (firstChoice.src === secChoice.src) {
        console.log("We Got a Match");
        setCards((prevCards) => {
          const updatedCards = prevCards.map((card) =>
            card.src === firstChoice.src ? { ...card, matched: true } : card
          );
          if (updatedCards.every((card) => card.matched)) {
            setWin(true);
          }

          return updatedCards;
        });
        reset();
      } else {
        console.log("Cards do not Match !");
        setTimeout(() => reset(), 1000);
      }
    }
  }, [firstChoice, secChoice]);

  useEffect(() => {
    shuffledCards();
  }, []);

  return (
    <div className="my-5 mx-4">
      {win && <Confetti width={width} height={height} />}
      <h1 className="text-4xl font-bold text-red-300 font-[cursive] text-center">
        Flip Mystic
      </h1>
      <div className="flex justify-center items-center">
        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 mt-6 gap-3">
          {cards.map((card) => (
            <Cards
              key={card.id}
              card={card}
              handleChoice={handleChoice}
              flipped={
                card === firstChoice || card === secChoice || card.matched
              }
              disabled={disabled}
            />
          ))}
        </div>
      </div>
      <div className="flex justify-around items-center mt-4">
        <p className="text-xl">Turns: {turns}</p>
        <button
          className="bg-none border-white border-2 py-[6px] px-4 rounded-[4px] text-white font-bold cursor-pointer text-sm hover:bg-red-300 transition-[background] duration-300 active:scale-105"
          onClick={shuffledCards}
        >
          New Game
        </button>
      </div>
      {win && (
        <div className="fixed inset-0 flex flex-col justify-center items-center bg-black bg-opacity-70">
          <h2 className="text-3xl text-green-500">You Win !</h2>
          <p className="text-xl">Congratulations !</p>
          <button className="text-xl mt-1 " onClick={shuffledCards}>
            Start Again
          </button>
        </div>
      )}
    </div>
  );
}

export default App;
