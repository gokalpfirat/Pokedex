import { escapeName } from "../../utils/string";
import "./style.css";
const PokemonData = ({ currentTab, pokemonData }) => {
  // Show random 3 moves every time
  const randomMoveIndex = [];
  const randomMoveCount =
    pokemonData.moves.length >= 3 ? 3 : pokemonData.moves.length;
  while (randomMoveIndex.length < randomMoveCount) {
    var r = Math.floor(Math.random() * pokemonData.moves.length);
    if (randomMoveIndex.indexOf(r) === -1) randomMoveIndex.push(r);
  }

  // Pokemon Data Mappings
  const tabValues = {
    Details: {
      Height: `${pokemonData.height / 10} m`,
      Weight: `${pokemonData.weight / 10} kg`,
      "Base Exp.": pokemonData.base_experience
    },
    Stats: {
      HP: pokemonData.stats[0].base_stat,
      Attack: pokemonData.stats[1].base_stat,
      Defence: pokemonData.stats[2].base_stat,
      "Sp. Atk": pokemonData.stats[3].base_stat,
      "Sp. Def": pokemonData.stats[4].base_stat,
      Speed: pokemonData.stats[5].base_stat
    }
  };
  if (pokemonData.moves.length) {
    tabValues.Moves = {
      "Random Move 1": escapeName(
        pokemonData.moves[randomMoveIndex[0]].move.name
      ),
      "Random Move 2": escapeName(
        pokemonData.moves[randomMoveIndex[1]].move.name
      ),
      "Random Move 3": escapeName(
        pokemonData.moves[randomMoveIndex[2]].move.name
      ),
      "Total Move": pokemonData.moves.length
    };
  }
  return (
    <div className="pokemon_data">
      {Object.keys(tabValues[currentTab]).map((title) => (
        <div className="pokemon_data__col" key={title}>
          <div className="pokemon_data__title">{title}</div>
          <div className="pokemon_data__value">
            {tabValues[currentTab][title]}
          </div>
        </div>
      ))}
    </div>
  );
};
export default PokemonData;
