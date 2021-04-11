import { Component } from "react";
import PokemonType from "../../components/PokemonType";
import AppContext from "../../context/AppContext";
import "./style.css";

class FavouriteDetails extends Component {
  static contextType = AppContext;
  render() {
    const { favouritePokemons, getPokemonType } = this.context;
    const pokemonTypes = {};
    favouritePokemons.forEach((pokemon) => {
      const type = getPokemonType(pokemon);
      if (pokemonTypes[type]) {
        pokemonTypes[type] += 1;
      } else {
        pokemonTypes[type] = 1;
      }
    });
    return (
      <>
        <h3 className="favourite_detail__title">Favourite Pokémon Details</h3>
        <p className="favourite_detail__text">
          You have total <strong>{favouritePokemons.length}</strong> Pokémon.
        </p>
        {Object.keys(pokemonTypes).map((type) => (
          <div className="favourite_detail__type" key={type}>
            <u>{pokemonTypes[type]}</u>&nbsp;&nbsp;
            <PokemonType typeName={type} />
            Type Pokémon
          </div>
        ))}
      </>
    );
  }
}
export default FavouriteDetails;
