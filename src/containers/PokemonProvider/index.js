import PokemonContext from "../../context/PokemonContext";
import { Component } from "react";

class PokemonProvider extends Component {
  constructor() {
    super();
    this.state = {
      loadedPokemons: [],
      loadedPokemonData: {},
      favouritePokemons: [],
      loadedPageNum: 0,
      totalPokemons: 0,
      addLoadedPokemons: this.addLoadedPokemons,
      increasePageNum: this.increasePageNum,
      addToLoadedPokemonData: this.addToLoadedPokemonData,
      toggleFavourites: this.toggleFavourites,
      removeFavourites: this.removeFavourites,
      setTotalPokemonCount: this.setTotalPokemonCount,
      getPokemonType: this.getPokemonType
    };
  }

  setTotalPokemonCount = (count) => {
    this.setState({ totalPokemons: count });
  };

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

  getPokemonType = (pokemonName) => {
    const pokemon = this.state.loadedPokemonData[pokemonName];
    if (pokemon) {
      return pokemon.types[0].type.name;
    }
    return false;
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
      <PokemonContext.Provider value={this.state}>
        {this.props.children}
      </PokemonContext.Provider>
    );
  }
}
export default PokemonProvider;
