import { createContext } from "react";

const AppContext = createContext({
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

export default AppContext;
