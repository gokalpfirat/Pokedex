import Tabs from "../../containers/Tabs";
import PokemonType from "../PokemonType";
import { pokemonTypeColors } from "../../config/constants";
import { leftFillNum } from "../../utils/number";
import FavouriteButton from "../../containers/FavouriteButton";
import "./style.css";

const PokemonModal = ({
  pokemonData,
  onCloseButtonClick,
  isFavourite,
  favouriteFn
}) => {
  const style = {
    background:
      pokemonTypeColors[pokemonData.types[0]?.type?.name] ||
      pokemonTypeColors.normal
  };
  return (
    <div style={style} className="pokemon_modal">
      <div className="pokemon_modal__topbar">
        <FavouriteButton
          className="pokemon_modal__favourite"
          isFavourite={isFavourite}
          clickHandler={() => favouriteFn(pokemonData.name)}
        />
        <button
          className="pokemon_modal__close"
          onClick={(e) => onCloseButtonClick(e)}
        >
          X
        </button>
      </div>
      <img
        className="pokemon_modal__image"
        alt={pokemonData.name}
        src={pokemonData.sprites.other["official-artwork"]["front_default"]}
      />
      <div className="pokemon_modal__main_info">
        <p className="pokemon_modal__id">#{leftFillNum(pokemonData.id, 4)}</p>
        <p className="pokemon_modal__name">{pokemonData.name}</p>
      </div>
      <div className="pokemon_modal__types">
        {pokemonData &&
          pokemonData.types.map((data) => (
            <PokemonType key={data.type.name} typeName={data.type.name} />
          ))}
      </div>
      <Tabs pokemonData={pokemonData} />
    </div>
  );
};

export default PokemonModal;
