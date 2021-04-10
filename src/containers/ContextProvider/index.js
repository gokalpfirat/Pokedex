import AppContext from "../../context/AppContext";
import { Component } from "react";

class ContextProvider extends Component {
  constructor() {
    super();
    this.state = {
      loadedPokemons: [],
      loadedPokemonData: {},
      favouritePokemons: [],
      loadedPageNum: 0,
      totalPokemons: 1118,
      addLoadedPokemons: this.addLoadedPokemons,
      increasePageNum: this.increasePageNum,
      addToLoadedPokemonData: this.addToLoadedPokemonData,
      toggleFavourites: this.toggleFavourites,
      removeFavourites: this.removeFavourites
    };
  }
  addLoadedPokemons = (pokemons, callback) => {
    this.setState(
      (prevState) => ({
        loadedPokemons: prevState.loadedPokemons.concat(pokemons),
        loadedPageNum: prevState.loadedPageNum + 1
      }),
      () => {
        if (!callback) return;
        callback();
      }
    );
  };

  addToLoadedPokemonData = (pokemonName, pokemonData) => {
    this.setState((prevState) => {
      return {
        loadedPokemonData: Object.assign({}, prevState.loadedPokemonData, {
          [pokemonName]: pokemonData
        })
      };
    });
  };

  toggleFavourites = (pokemonName) => {
    const favourites = this.state.favouritePokemons;
    const index = favourites.indexOf(pokemonName);
    if (index > -1) {
      this.setState((prevState) => {
        const cloneFavourites = [...prevState.favouritePokemons];
        cloneFavourites.splice(index, 1);
        return {
          favouritePokemons: cloneFavourites
        };
      });
    } else {
      this.setState((prevState) => ({
        favouritePokemons: prevState.favouritePokemons.concat(pokemonName)
      }));
    }
  };

  removeFavourites = () => {
    this.setState({ favouritePokemons: [] });
  };

  increasePageNum = () => {
    this.setState((prevState) => ({
      loadedPageNum: prevState.loadedPageNum + 1
    }));
  };
  render() {
    return (
      <AppContext.Provider value={this.state}>
        {this.props.children}
      </AppContext.Provider>
    );
  }
}
export default ContextProvider;
