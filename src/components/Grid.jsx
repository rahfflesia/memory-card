import { useEffect, useState } from "react";
import "./Grid.css";
import Card from "./Card";

export default function Grid({ setScore, setBestScore }) {
  const [pokemonData, setPokemonData] = useState([]);
  const [clickedCards, setClickedCards] = useState([]);

  const imagesUrl =
    "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/";
  const apiUrl = "https://pokeapi.co/api/v2/pokemon/";

  async function fetchData() {
    try {
      const results = await fetch(apiUrl)
        .then((response) => response.json())
        .catch((error) => console.error(error));
      return results;
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    fetchData().then((value) => {
      const formattedArray = value.results.map((object, index) => {
        return {
          ...object,
          pokedexNumber: index + 1,
        };
      });
      setPokemonData(formattedArray);
    });
  }, []);

  function hasCardBeenClicked(pokemonName) {
    for (let i = 0; i < clickedCards.length; i++) {
      if (pokemonName === clickedCards[i]) return true;
    }
    return false;
  }

  function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }

  return (
    <div className="grid">
      {pokemonData.map((object, index) => {
        const pokedexNumber = object.pokedexNumber;
        const pokemonName = object.name;

        return (
          <Card
            onClickedCard={() => {
              if (!hasCardBeenClicked(pokemonName)) {
                setScore((currentScore) => currentScore + 1);
                setClickedCards((array) => [...array, pokemonName]);
                setPokemonData(shuffleArray(pokemonData));
              } else {
                setScore(0);
                setBestScore();
                setClickedCards([]);
                setPokemonData(shuffleArray(pokemonData));
              }
            }}
            pokemonName={pokemonName}
            imageUrl={imagesUrl + pokedexNumber + ".png"}
            key={index}
          ></Card>
        );
      })}
    </div>
  );
}
