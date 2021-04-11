import { createContext } from "react";

const PokemonContext = createContext({
  loadedPokemons: [],
  loadedPokemonData: {},
  favouritePokemons: [],
  loadedPageNum: 0,
  totalPokemons: 0,
  addLoadedPokemons: () => {},
  increasePageNum: () => {},
  addToLoadedPokemonData: () => {},
  toggleFavourites: () => {},
  removeFavourites: () => {}
});

export default PokemonContext;
