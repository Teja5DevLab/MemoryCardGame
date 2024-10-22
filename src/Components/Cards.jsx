import cover from "../assets/cover.png";
import "./Cards.css";

const Cards = ({ card, handleChoice, flipped, disabled }) => {
  const handleClick = () => {
    if (!disabled) {
      handleChoice(card);
    }
  };
  return (
    <div className="relative">
      <div className={flipped ? "flipped" : ""}>
        <img
          className="front w-40 h-40 block border-2 border-gray-300 rounded-md"
          src={card.src}
          alt="Front"
        />
        <img
          className="back w-40 h-40 block border-2 border-white rounded-md cursor-pointer"
          onClick={handleClick}
          src={cover}
          alt="Back"
        />
      </div>
    </div>
  );
};

export default Cards;
