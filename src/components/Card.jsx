import "./Card.css";

export default function Card({ pokemonName, imageUrl, onClickedCard }) {
  function capitalize(str) {
    let word = "";
    for (let i = 1; i < str.length; i++) {
      word += str[i];
    }

    return str[0].toUpperCase() + word;
  }

  return (
    <>
      <div className="card" onClick={onClickedCard}>
        <div className="image-wrapper">
          <img src={imageUrl} alt="pokemon-img" />
        </div>
        <div className="name-wrapper">
          <span>{capitalize(pokemonName)}</span>
        </div>
      </div>
    </>
  );
}
