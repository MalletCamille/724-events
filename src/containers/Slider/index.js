import { Fragment, useEffect, useState } from "react";
import { useData } from "../../contexts/DataContext";
import { getMonth } from "../../helpers/Date";
import "./style.scss";

const Slider = () => {
  const { data } = useData();
  const [index, setIndex] = useState(0);
  // Tri des événements par date (focus)
  const byDateDesc = data?.focus.sort((evtA, evtB) =>
    new Date(evtA.date) < new Date(evtB.date) ? -1 : 1
  );
  
  // Fonction pour passer à la prochaine carte après un délai
  const nextCard = () => {
    // Utilisation de setTimeout pour décaler le changement d'index
    // Utilisation de la fonction setIndex avec une fonction callback
    setTimeout(() => { 
      if (byDateDesc) {
        setIndex((index + 1) % byDateDesc.length); // ici j'ai rajouté l'opérateur modulo pour rester dans le tableau byDateDesc. 
    // Ca crée une loop et ça supprime le state 3 et donc la slide blanche //  
      }
    }, 5000);  
  };
  
  // Utilisation de useEffect pour exécuter nextCard après chaque rendu du composant
  useEffect(() => {
    nextCard();
  });

  return (
    <div className="SlideCardList">
      {byDateDesc?.map((event, idx) => (
        <Fragment key={`slide${event.title}`}>
          <div
            className={`SlideCard SlideCard--${index === idx ? "display" : "hide"}`}
          >
            <img src={event.cover} alt="forum" />
            <div className="SlideCard__descriptionContainer">
              <div className="SlideCard__description">
                <h3>{event.title}</h3>
                <p>{event.description}</p>
                <div>{getMonth(new Date(event.date))}</div>
              </div>
            </div>
          </div>
          <div className="SlideCard__paginationContainer">
            <div className="SlideCard__pagination">
              {byDateDesc.map((radioEvent, radioIdx) => (
                <input
                  key={`radio${radioEvent.title}`}
                  type="radio"
                  name="radio-button"
                  checked={index === radioIdx} // ici on remplace idx par index car idx correspond à l'index de la diapositive dans le tableau byDateDesc et pas à l'index en cours //
                  readOnly
                />
              ))}
            </div>
          </div>
        </Fragment>
      ))}
    </div>
  );
}

export default Slider;
