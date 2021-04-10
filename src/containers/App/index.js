import { Component, createRef, Fragment, lazy, Suspense } from "react";
import { getPokemonList } from "../../api";
import { POKEMON_PER_PAGE } from "../../config/constants";
import CardList from "../../components/CardList";
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

// Lazy load Modal, it won't be loaded until needed!
const AsyncPokemonModal = lazy(() => import("../PokemonModal"));

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
    // This is used as Intersection Observer element
    this.loadRef = createRef();
  }

  static contextType = AppContext;

  // Load Pokemons at Infinity Scroll
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

  // Load Pokemons to cache if search is not found
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
    this.setState({ isModalVisible: false, selectedPokemonData: null });
  };

  switchMode = () => {
    const { listType } = this.state;
    // Reset Search & Modal Values
    this.setState({ searchValue: "" });
    this.setState({ isModalVisible: false, selectedPokemonData: null });
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
      removeFavourites,
      totalCount
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
        <Button onClick={this.switchMode}>My Pokémons</Button>
      ) : (
        <>
          <Button onClick={this.switchMode}>All Pokémons</Button>
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
            {loadedPokemons.length !== totalCount ? (
              <div ref={this.loadRef} style={{ textAlign: "center" }}>
                <LoadingCircle
                  loadingState={
                    !this.state.searchValue.length &&
                    this.state.listType === "all"
                  }
                />
              </div>
            ) : (
              <InformationBox>You saw all Pokémons!</InformationBox>
            )}
          </InfiniteScroll>
        ) : listType === "favourites" ? (
          <InformationBox>You have no favourite pokémons!</InformationBox>
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
