import { Component, createRef, Fragment, lazy, Suspense } from "react";
import { getPokemonList } from "../../api";
import CardList from "../CardList";
import Card from "../Card";
import Modal from "../Modal";
import InfiniteScroll from "../InfiniteScroll";
import PokemonLogo from "../../components/PokemonLogo";
import PokemonSearchInput from "../../components/PokemonSearchInput";
import LoadMore from "../../components/LoadMore";
import AppContext from "../../context/AppContext";
import Button from "../../components/Button";
import InformationBox from "../../components/InformationBox";

import "./style.css";

const AsyncPokemonModal = lazy(() => import("../../components/PokemonModal"));

class App extends Component {
  constructor() {
    super();
    this.state = {
      listType: "all",
      pokemonList: [],
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
      const pokemons = await getPokemonList(40, loadedPageNum);
      addLoadedPokemons(pokemons, () => {
        this.setState({
          pokemonList: this.context.loadedPokemons,
          infiniteScrollLoading: false
        });
      });
    }
  };

  loadMorePokemonsToCache = async () => {
    if (!this.state.infiniteScrollLoading) {
      this.setState({ infiniteScrollLoading: true });
      const { addLoadedPokemons, loadedPageNum } = this.context;
      const pokemons = await getPokemonList(40, loadedPageNum);
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
    const { addLoadedPokemons, loadedPageNum } = this.context;
    if (loadedPageNum === 0) {
      const pokemons = await getPokemonList(40, this.state.pageNum);
      addLoadedPokemons(pokemons, () => {
        this.setState({ pokemonList: this.context.loadedPokemons });
      });
    } else {
      this.setState({ pokemonList: this.context.loadedPokemons });
    }
  }

  render() {
    const { pokemonList, isModalVisible, listType, searchValue } = this.state;
    // Search Results
    const filteredList =
      listType === "all"
        ? this.context.loadedPokemons.filter((pokemon) =>
            pokemon.name.toLowerCase().includes(searchValue.toLowerCase())
          )
        : this.context.favouritePokemons
            .filter((pokemon) => pokemon.includes(searchValue.toLowerCase()))
            .map((pokemon) => ({
              name: pokemon
            }));
    const pokemonCards = filteredList.length
      ? filteredList.map((pokemon) => {
          const isFavourite = this.context.favouritePokemons.includes(
            pokemon.name
          );
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
          <Button onClick={this.context.removeFavourites}>
            Remove Favourites
          </Button>
        </>
      );
    return (
      <div className="homepage">
        <PokemonLogo />
        <div className="controls">{controls}</div>
        <PokemonSearchInput
          placeholder="Enter pokemon name you want to search"
          onChange={this.onSearchInputChange}
        />
        {pokemonList.length ? (
          <InfiniteScroll loadRef={this.loadRef} callback={this.loadMore}>
            <CardList>{pokemonCards}</CardList>
            {isModalVisible ? (
              <Modal onOutsideClick={this.closeModal}>
                <Suspense
                  fallback={
                    <img
                      src="https://i.stack.imgur.com/kOnzy.gif"
                      alt="Loading"
                      width="100"
                      height="100"
                    />
                  }
                >
                  <AsyncPokemonModal
                    pokemonData={this.state.selectedPokemonData}
                    onCloseButtonClick={this.closeModal}
                    favouriteFn={this.context.toggleFavourites}
                    isFavourite={this.context.favouritePokemons.includes(
                      this.state.selectedPokemonData.name
                    )}
                  />
                </Suspense>
              </Modal>
            ) : (
              ""
            )}
            <div ref={this.loadRef}></div>
          </InfiniteScroll>
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
