import PokemonData from "../PokemonData";
import PokemonType from "../PokemonType";
import { pokemonTypeColors } from "../../config/constants";
import { leftFillNum } from "../../utils/number";
import "./style.css";
import emptyHearth from "../../assets/white/hearth.svg";
import fullHearth from "../../assets/white/full_hearth.svg";
import { Component } from "react";

class PokemonModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      favouriteImg: this.props.isFavourite ? fullHearth : emptyHearth
    };
  }
  mouseHover = () => {
    const { favouriteImg } = this.state;
    if (favouriteImg === emptyHearth) {
      this.setState({ favouriteImg: fullHearth });
    } else {
      this.setState({ favouriteImg: emptyHearth });
    }
  };
  render() {
    const { pokemonData, onCloseButtonClick, isFavourite } = this.props;
    const { favouriteImg } = this.state;
    const style = {
      background:
        pokemonTypeColors[pokemonData.types[0]?.type?.name] ||
        pokemonTypeColors.normal
    };
    return (
      <div style={style} className="pokemon_modal">
        <div className="pokemon_modal__topbar">
          <img
            src={favouriteImg}
            className="pokemon_modal__favourite"
            onMouseEnter={this.mouseHover}
            onMouseLeave={this.mouseHover}
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
        <PokemonData pokemonData={pokemonData} />
      </div>
    );
  }
}

export default PokemonModal;
