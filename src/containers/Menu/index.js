import { Component } from "react";
import SearchInput from "../../components/SearchInput";
import Button from "../../components/Button";
import PokemonContext from "../../context/PokemonContext";

class Menu extends Component {
  static contextType = PokemonContext;
  render() {
    const {
      onSearchInputChange,
      searchValue,
      listType,
      switchMode
    } = this.props.pageContext;
    const { favouritePokemons, removeFavourites } = this.context;
    // Rendering Controls
    const controls =
      listType === "all" ? (
        <Button onClick={() => switchMode("favourites")}>My Pokémons</Button>
      ) : (
        <>
          <Button onClick={() => switchMode("all")}>All Pokémons</Button>
          {favouritePokemons.length > 0 ? (
            <>
              {listType === "details" ? (
                <Button onClick={() => switchMode("favourites")}>
                  My Pokémons
                </Button>
              ) : (
                <Button onClick={removeFavourites}>Remove Favourites</Button>
              )}
              {listType === "favourites" && (
                <Button onClick={() => switchMode("details")}>
                  Favourite Details
                </Button>
              )}
            </>
          ) : (
            ""
          )}
        </>
      );
    return (
      <>
        <div className="controls">{controls}</div>
        {(listType === "all" ||
          (listType === "favourites" && favouritePokemons.length > 0)) && (
          <SearchInput
            placeholder="Enter Pokémon name you want to search"
            onChange={onSearchInputChange}
            value={searchValue}
          />
        )}
      </>
    );
  }
}
export default Menu;
