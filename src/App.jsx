import { useState } from "react";
import "./App.css";
import SingleCard from "./component/SingleCard.jsx";

const cardImages = [
  { "src": "/public/img/front/hm.jpg" },
  { "src": "/public/img/front/boo.jpg" },
  { "src": "/public/img/front/chixyaxya-shok.jpg" },
  { "src": "/public/img/front/chixyaxya-smile.jpg" },
  { "src": "/public/img/front/chixyaxya.jpg" },
  { "src": "/public/img/front/crying.jpg" },
  { "src": "/public/img/front/make-up.png" },
  { "src": "/public/img/front/sleeping.jpg" },

];

function App() {
  // установить карты
  const [cards, setCards] = useState([]);
  // количество шагов
  const [turns, setTurns] = useState(0);

  const [choiceOne, setChoiceOne] = useState(null);
  const [choiceTwo, setChoiceTwo] = useState(null);

  // дублируем и перемешиваем карты
  const shuffleCards = () => {
    // когда вызываем функцию генерируется перемешанные карты,
    //  обновляется состояние благодаря переданному shuffleCards
    const shuffleCards = [...cardImages, ...cardImages]
      .sort(() => Math.random() - 0.5)
      .map((card) => ({ ...card, id: Math.random() }));

    setCards(shuffleCards);
    // каждый раз начиная игру, вызываем эту функцию
    setTurns(0);
  };

  // console.log(cards, turns);
  

  return (
    <>
      <div className="App">
        <h1>Memory game</h1>
        <button onClick={shuffleCards}>New game</button>

        <div className="card-grid">
          {cards.map((card) => (
           <SingleCard key={card.id} card={card}/>
          ))}
        </div>
      </div>
    </>
  );
}

export default App;
