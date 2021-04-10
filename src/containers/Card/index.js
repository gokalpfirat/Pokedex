import { PureComponent, createRef } from "react";
import { getPokemonDataFromName } from "../../api";
import PokemonType from "../../components/PokemonType";
import FavouriteButton from "../FavouriteButton";
import { pokemonTypeColors } from "../../config/constants";
import { leftFillNum } from "../../utils/number";
import { escapeName } from "../../utils/string";
import AppContext from "../../context/AppContext";
import LoadingCircle from "../../components/LoadingCircle";
import "./style.css";

class Card extends PureComponent {
  constructor() {
    super();
    this.state = {
      pokemonData: null
    };
    this.cardRef = createRef();
  }
  static contextType = AppContext;

  // If it's near viewport load pokemon data & show Ghost loader until it fetches
  loadPokemonData = (entries) => {
    if (!this.state.pokemonData) {
      const { pokemonName } = this.props;
      entries.forEach(async (entry) => {
        if (entry.isIntersecting) {
          const pokemonCacheData = this.context.loadedPokemonData[pokemonName];
          if (pokemonCacheData) {
            this.setState({ pokemonData: pokemonCacheData });
          } else {
            const pokemonData = await getPokemonDataFromName(
              this.props.pokemonName
            );
            this.context.addToLoadedPokemonData(
              this.props.pokemonName,
              pokemonData
            );
            this.setState({ pokemonData });
          }
        }
      });
    }
  };

  toggleFavourites = () => {
    const { pokemonName } = this.props;
    this.context.toggleFavourites(pokemonName);
  };
  componentDidMount() {
    const options = {
      root: null,
      rootMargin: "200px",
      threshold: 0.2
    };

    this.observer = new IntersectionObserver(this.loadPokemonData, options);
    this.observer.observe(this.cardRef.current);
  }
  componentWillUnmount() {
    this.observer.disconnect();
  }
  render() {
    const { pokemonName, isFavourite } = this.props;
    const { pokemonData } = this.state;
    const typeColor = pokemonData
      ? pokemonTypeColors[pokemonData.types[0]?.type?.name] ||
        pokemonTypeColors.normal
      : "#000";

    // Gradient style depending on pokemon's main type
    const style = {
      background: `linear-gradient(180deg,rgba(255, 255, 255, 0) 0%,${typeColor} 100%)`
    };
    return (
      <div
        ref={this.cardRef}
        className={`card grow ${!pokemonData ? "card--inactive" : ""}`}
        style={{ cursor: pokemonData ? "pointer" : "wait" }}
        onClick={() => this.props.onClickHandler(pokemonData)}
      >
        <div className="card__overlay" style={style}>
          {pokemonData ? (
            <img
              loading="lazy"
              className="card__image"
              src={pokemonData ? pokemonData.sprites?.front_default : ""}
              alt={""}
            />
          ) : (
            <div style={{ textAlign: "center" }}>
              <LoadingCircle width="96" height="96" />
            </div>
          )}
          <h3 className="card__title">{escapeName(pokemonName)}</h3>
          <h4 className="card__id">
            #{pokemonData ? leftFillNum(pokemonData.id, 4) : ""}
          </h4>
        </div>
        <div className="card__content">
          <div>
            {pokemonData &&
              pokemonData.types.map((data) => (
                <PokemonType key={data.type.name} typeName={data.type.name} />
              ))}
          </div>
          <FavouriteButton
            style={{ height: "26px" }}
            isFavourite={isFavourite}
            clickHandler={this.toggleFavourites}
            dark
          />
        </div>
      </div>
    );
  }
}
export default Card;
