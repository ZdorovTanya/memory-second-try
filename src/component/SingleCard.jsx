import "./SingleCard.css";

function SingleCard({ card, handleChoice, flipped, disabled }) {

  const handleClick = () => {
    if (!disabled){
        handleChoice(card) 
    }
  };

  return (
    <div className="card">
      <div className={flipped ? "flipped" : ""}>
        <img className="front" src={card.src} alt="лицевая сторона" />
        <img
          className="back"
          src="/public/img/card-back.jpg"
          onClick={handleClick}
          alt="рубашка"
        />
      </div>
    </div>
  );
}

export default SingleCard;
