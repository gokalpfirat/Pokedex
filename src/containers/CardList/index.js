import { Component } from "react";
import Card from "../../containers/Card";
import PokemonContext from "../../context/PokemonContext";
import "./style.css";

class CardList extends Component {
  static contextType = PokemonContext;
  render() {
    const { list } = this.props;
    const { favouritePokemons } = this.context;
    return (
      <div className="card_list">
        {list.length > 0 &&
          list.map((pokemon) => {
            const isFavourite = favouritePokemons.includes(pokemon.name);
            return (
              <Card
                pokemonName={pokemon.name}
                key={pokemon.name}
                isFavourite={isFavourite}
              />
            );
          })}
      </div>
    );
  }
}
export default CardList;
