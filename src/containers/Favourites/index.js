import { Component } from "react";
import PokemonContext from "../../context/PokemonContext";
import InformationBox from "../../components/InformationBox";
import CardList from "../CardList";

class Favourites extends Component {
  static contextType = PokemonContext;
  render() {
    const { pageContext } = this.props;
    const { searchValue } = pageContext;
    const { favouritePokemons } = this.context;
    // Filterin Lists
    const filteredList = favouritePokemons
      .filter((pokemon) => pokemon.includes(searchValue.toLowerCase()))
      .map((pokemon) => ({
        name: pokemon
      }));
    return (
      <>
        <CardList list={filteredList}></CardList>
        {searchValue.length > 0 && filteredList.length === 0 && (
          <InformationBox>No pokémons found at your favourites!</InformationBox>
        )}
        {filteredList.length === 0 && searchValue.length === 0 && (
          <InformationBox>You have no favourite pokémons!</InformationBox>
        )}
      </>
    );
  }
}
export default Favourites;
