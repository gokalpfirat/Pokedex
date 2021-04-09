import "./style.css";
import { Component } from "react";
import { getPokemonImage } from "../../utils/mapper";
import { getPokemonDataFromName } from "../../api";
import PokemonType from "../../components/PokemonType";
import FavouriteButton from "../FavouriteButton";
import { pokemonTypeColors } from "../../config/constants";
import { leftFillNum } from "../../utils/number";

class Card extends Component {
  constructor() {
    super();
    this.state = {
      pokemonData: null
    };
  }
  async componentDidMount() {
    const pokemonData = await getPokemonDataFromName(this.props.pokemonName);
    this.setState({ pokemonData });
  }
  render() {
    const { pokemonName, pokemonID } = this.props;
    const { pokemonData } = this.state;
    const typeColor = pokemonData
      ? pokemonTypeColors[pokemonData.types[0]?.type?.name] ||
        pokemonTypeColors.normal
      : "#000";
    const style = {
      background: `linear-gradient(180deg,rgba(255, 255, 255, 0) 0%,${typeColor} 100%)`
    };
    return (
      <div
        className="card grow"
        onClick={() => this.props.onClickHandler(pokemonData)}
      >
        <div className="card__overlay" style={style}>
          <img
            loading="lazy"
            className="card__image"
            src={pokemonData ? getPokemonImage(pokemonData) : ""}
          />
          <h3 className="card__title">{pokemonName}</h3>
          <h4 className="card__id">#{leftFillNum(pokemonID, 4)}</h4>
        </div>
        <div className="card__content">
          <div>
            {pokemonData &&
              pokemonData.types.map((data) => (
                <PokemonType key={data.type.name} typeName={data.type.name} />
              ))}
          </div>
          <FavouriteButton style={{ height: "26px" }} />
        </div>
      </div>
    );
  }
}
export default Card;
