import { Component } from "react";
import Tabs from "../../components/Tabs";
import PokemonType from "../../components/PokemonType";
import PokemonData from "../../components/PokemonData";
import { pokemonTypeColors } from "../../config/constants";
import { leftFillNum } from "../../utils/number";
import FavouriteButton from "../FavouriteButton";
import "./style.css";

class PokemonModal extends Component {
  constructor() {
    super();
    this.state = {
      currentTab: "Details"
    };
  }
  changeTab = (tabName) => {
    this.setState({ currentTab: tabName });
  };
  render() {
    const {
      pokemonData,
      onCloseButtonClick,
      isFavourite,
      favouriteFn
    } = this.props;
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
        <Tabs currentTab={this.state.currentTab} onChangeTab={this.changeTab} />
        <PokemonData
          pokemonData={pokemonData}
          currentTab={this.state.currentTab}
        />
      </div>
    );
  }
}

export default PokemonModal;
