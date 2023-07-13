import { useEffect, useState } from "react";
import "./App.css";
import SingleCard from "./component/SingleCard.jsx";
// import Modal from "./component/Modal/Modal.jsx";
import "./component/Modal/Modal.css";

const cardImages = [
  { src: "/public/img/front/hm.jpg", matched: false },
  { src: "/public/img/front/boo.jpg", matched: false },
  { src: "/public/img/front/chixyaxya-shok.jpg", matched: false },
  { src: "/public/img/front/chixyaxya-smile.jpg", matched: false },
  { src: "/public/img/front/chixyaxya.jpg", matched: false },
  { src: "/public/img/front/crying.jpg", matched: false },
  { src: "/public/img/front/make-up.png", matched: false },
  { src: "/public/img/front/sleeping.jpg", matched: false },
];

function App() {
  // установить карты
  const [cards, setCards] = useState([]);
  // количество шагов
  const [turns, setTurns] = useState(0);
  const [match, setMatch] = useState(0);

  const [choiceOne, setChoiceOne] = useState(null);
  const [choiceTwo, setChoiceTwo] = useState(null);

  const [disabled, setDisabled] = useState(false);

  // победа попап
  const [modal, setModal] = useState(false);

  const toggleModal = () => {
    setModal(!modal);
  };

  if (modal) {
    document.body.classList.add("active-modal");
  } else {
    document.body.classList.remove("active-modal");
  }

  // дублируем и перемешиваем карты
  const shuffleCards = () => {
    // когда вызываем функцию генерируется перемешанные карты,
    //  обновляется состояние благодаря переданному shuffleCards
    const shuffleCards = [...cardImages, ...cardImages]
      .sort(() => Math.random() - 0.5)
      .map((card) => ({ ...card, id: Math.random() }));

    setChoiceOne(null);
    setChoiceTwo(null);
    setCards(shuffleCards);
    // каждый раз начиная игру, вызываем эту функцию
    setTurns(0);
    setMatch(0);
  };

  // console.log(cards, turns);
  // обработка выбора
  // если value нет,то это первый выбор, а если есть, то 2й
  const handleChoice = (card) => {
    choiceOne ? setChoiceTwo(card) : setChoiceOne(card);
  };

  // автоматическое начало игры
  useEffect(() => {
    shuffleCards();
  }, [modal]);

  // сравнение двух выбранных карт
  useEffect(() => {
    if (choiceOne && choiceTwo) {
      setDisabled(true);
      if (choiceOne.src === choiceTwo.src) {
        console.log("match");
        countMatch();
        setCards((prevCards) => {
          return prevCards.map((card) => {
            // меняем значение в массиве на true с помощью нового массива
            if (card.src === choiceTwo.src) {
              return { ...card, matched: true };
            } else {
              return card;
            }
          });
        });
        resetTurn();
      } else {
        console.log("no match");
        setTimeout(() => resetTurn(), 1000);
      }
    }
  }, [choiceOne, choiceTwo]);

  // счетчик совпадений
  const countMatch = () => {
    setMatch((prevMatch) => prevMatch + 1);
  };

  // useEffect(() => {
  //   if (match === cardImages.length) {
  //     alert("YOU WON");
  //   }
  // }, [match]);

  // перезапуск и инкремент счетчика
  const resetTurn = () => {
    setChoiceOne(null);
    setChoiceTwo(null);
    setTurns((prevTurns) => prevTurns + 1);
    setDisabled(false);
  };

  return (
    <>
      <div className="App">
        <h1>MEMERY GAME</h1>
        <button className="btn" onClick={shuffleCards}>
          NEW GAME
        </button>

        <div className="card-grid">
          {cards.map((card) => (
            <SingleCard
              key={card.id}
              card={card}
              handleChoice={handleChoice}
              flipped={card === choiceOne || card === choiceTwo || card.matched}
              disabled={disabled}
            />
          ))}
        </div>

        <div className="cont__row">
          <p>TURNS: {turns}</p>
          <p>MATCH: {match}</p>
        </div>
      </div>

      {match === cardImages.length && (
        <div className="modal">
          <div onClick={toggleModal} className="overlay"></div>
          <div className="modal-content">
            <h2>Congratulations!</h2>
            <p>
              You found a match for all meme dogs. In order to collect {match}{" "}
              parkcards you needed {turns} turns.
            </p>
            <button className="close-modal" onClick={toggleModal}>
              x
            </button>
          </div>
        </div>
      )}
    </>
  );
}

export default App;
