import { Component, createRef, Fragment, lazy, Suspense } from "react";
import { getPokemonList } from "../../api";
import { POKEMON_PER_PAGE } from "../../config/constants";
import CardList from "../CardList";
import Card from "../Card";
import ModalProvider from "../ModalProvider";
import InfiniteScroll from "../InfiniteScroll";
import Logo from "../../components/Logo";
import SearchInput from "../../components/SearchInput";
import LoadMore from "../../components/LoadMore";
import AppContext from "../../context/AppContext";
import Button from "../../components/Button";
import LoadingCircle from "../../components/LoadingCircle";
import InformationBox from "../../components/InformationBox";

import "./style.css";

const AsyncPokemonModal = lazy(() => import("../../components/PokemonModal"));

class App extends Component {
  constructor() {
    super();
    this.state = {
      listType: "all",
      isModalVisible: false,
      selectedPokemonData: null,
      searchValue: "",
      infiniteScrollLoading: false
    };
    this.loadRef = createRef();
  }

  static contextType = AppContext;

  loadMore = async () => {
    if (
      !this.state.infiniteScrollLoading &&
      !this.state.searchValue.length &&
      this.state.listType === "all"
    ) {
      this.setState({ infiniteScrollLoading: true });
      const { addLoadedPokemons, loadedPageNum } = this.context;
      const { pokemons } = await getPokemonList(
        POKEMON_PER_PAGE,
        loadedPageNum
      );
      addLoadedPokemons(pokemons, () => {
        this.setState({
          infiniteScrollLoading: false
        });
      });
    }
  };

  loadMorePokemonsToCache = async () => {
    if (!this.state.infiniteScrollLoading) {
      this.setState({ infiniteScrollLoading: true });
      const { addLoadedPokemons, loadedPageNum } = this.context;
      const { pokemons } = await getPokemonList(
        POKEMON_PER_PAGE,
        loadedPageNum
      );
      addLoadedPokemons(pokemons, () => {
        this.setState({
          infiniteScrollLoading: false
        });
      });
    }
  };

  showModal = (pokemonData) => {
    this.setState({ isModalVisible: true, selectedPokemonData: pokemonData });
  };

  closeModal = () => {
    this.setState({ isModalVisible: false });
  };

  switchMode = () => {
    const { listType } = this.state;
    // Reset Search Value
    this.setState({ searchValue: "" });
    if (listType === "all") {
      this.setState({ listType: "favourites" });
    } else {
      this.setState({
        listType: "all"
      });
    }
  };

  onSearchInputChange = (value) => {
    this.setState({ searchValue: value });
  };

  async componentDidMount() {
    const {
      addLoadedPokemons,
      loadedPageNum,
      setTotalPokemonCount
    } = this.context;
    if (loadedPageNum === 0) {
      const { pokemons, count } = await getPokemonList(
        POKEMON_PER_PAGE,
        this.state.pageNum
      );
      setTotalPokemonCount(count);
      addLoadedPokemons(pokemons);
    }
  }

  render() {
    const { isModalVisible, listType, searchValue } = this.state;
    const {
      loadedPokemons,
      favouritePokemons,
      removeFavourites
    } = this.context;
    // Filterin Lists
    const filteredList =
      listType === "all"
        ? loadedPokemons.filter((pokemon) => {
            return pokemon.name
              .toLowerCase()
              .includes(searchValue.toLowerCase());
          })
        : favouritePokemons
            .filter((pokemon) => pokemon.includes(searchValue.toLowerCase()))
            .map((pokemon) => ({
              name: pokemon
            }));
    // Rendering Cards
    const pokemonCards = filteredList.length
      ? filteredList.map((pokemon) => {
          const isFavourite = favouritePokemons.includes(pokemon.name);
          return (
            <Card
              pokemonName={pokemon.name}
              key={pokemon.name}
              onClickHandler={this.showModal}
              isFavourite={isFavourite}
            />
          );
        })
      : "";
    // Rendering Controls
    const controls =
      listType === "all" ? (
        <Button onClick={this.switchMode}>My Pokemons</Button>
      ) : (
        <>
          <Button onClick={this.switchMode}>All Pokemons</Button>
          <Button onClick={removeFavourites}>Remove Favourites</Button>
        </>
      );
    return (
      <div className="homepage">
        <Logo />
        <div className="controls">{controls}</div>
        <SearchInput
          placeholder="Enter pokemon name you want to search"
          onChange={this.onSearchInputChange}
          value={searchValue}
        />
        {filteredList.length ? (
          <InfiniteScroll loadRef={this.loadRef} callback={this.loadMore}>
            <CardList>{pokemonCards}</CardList>
            {isModalVisible ? (
              <ModalProvider onOutsideClick={this.closeModal}>
                <Suspense fallback={<LoadingCircle />}>
                  <AsyncPokemonModal
                    pokemonData={this.state.selectedPokemonData}
                    onCloseButtonClick={this.closeModal}
                    favouriteFn={this.context.toggleFavourites}
                    isFavourite={this.context.favouritePokemons.includes(
                      this.state.selectedPokemonData.name
                    )}
                  />
                </Suspense>
              </ModalProvider>
            ) : (
              ""
            )}
            <div ref={this.loadRef} style={{ textAlign: "center" }}>
              <LoadingCircle
                loadingState={
                  !this.state.searchValue.length &&
                  this.state.listType === "all"
                }
              />
            </div>
          </InfiniteScroll>
        ) : listType === "favourites" ? (
          <InformationBox>You have no favourite pokemons!</InformationBox>
        ) : (
          ""
        )}
        {searchValue.length && listType === "all" ? (
          <InformationBox>
            <LoadMore
              loadedCount={this.context.loadedPokemons.length}
              totalCount={this.context.totalPokemons}
              loadMore={this.loadMorePokemonsToCache}
              isLoading={this.state.infiniteScrollLoading}
            />
          </InformationBox>
        ) : (
          ""
        )}
      </div>
    );
  }
}
export default App;
