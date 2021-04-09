import "./style.css";

const PokemonData = ({ pokemonData }) => (
  <div className="pokemon_data">
    <div className="pokemon_data__titles">
      <div className="pokemon_data__title pokemon_data__title--selected">
        Details
      </div>
      <div className="pokemon_data__title">Moves</div>
      <div className="pokemon_data__title">Stats</div>
    </div>
  </div>
);

export default PokemonData;
