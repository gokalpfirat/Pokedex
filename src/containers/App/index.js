import { Component, createRef, lazy, Suspense } from "react";
import { getPokemonList, getPokemonTypes } from "../../api";
import CardList from "../CardList";
import Card from "../Card";
import Modal from "../Modal";
import InfiniteScroll from "../InfiniteScroll";
import PokemonLogo from "../../components/PokemonLogo";
import PokemonSearchInput from "../../components/PokemonSearchInput";
import LoadMore from "../../components/LoadMore";
import AppContext from "../../context/AppContext";
import "./style.css";

const AsyncPokemonModal = lazy(() => import("../../components/PokemonModal"));

class App extends Component {
  constructor() {
    super();
    this.state = {
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
    if (!this.state.infiniteScrollLoading && !this.state.searchValue.length) {
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
        this.searchPokemon(this.state.searchValue);
      });
    }
  };

  showModal = (pokemonData) => {
    this.setState({ isModalVisible: true, selectedPokemonData: pokemonData });
  };

  closeModal = () => {
    this.setState({ isModalVisible: false });
  };

  searchPokemon = (value) => {
    const filteredList = this.context.loadedPokemons.filter((pokemon) =>
      pokemon.name.toLowerCase().includes(value.toLowerCase())
    );
    this.setState({ searchValue: value, pokemonList: filteredList });
  };

  onSearchInputChange = (value) => {
    this.searchPokemon(value);
  };

  async componentDidMount() {
    const { addLoadedPokemons } = this.context;
    const pokemons = await getPokemonList(40, this.state.pageNum);
    //const types = await getPokemonTypes();
    //const data = await getPokemonData(1);
    addLoadedPokemons(pokemons, () => {
      this.setState({ pokemonList: this.context.loadedPokemons });
    });
  }
  render() {
    const { pokemonList, isModalVisible } = this.state;
    const pokemonCards = pokemonList.length
      ? pokemonList.map((pokemon, index) => (
          <Card
            pokemonName={pokemon.name}
            key={pokemon.name}
            onClickHandler={this.showModal}
          />
        ))
      : "";
    return (
      <div className="homepage">
        <PokemonLogo />
        <PokemonSearchInput
          placeholder="Enter pokemon name you want to search"
          onChange={this.onSearchInputChange}
        />
        {pokemonList.length ? (
          <InfiniteScroll loadRef={this.loadRef} callback={this.loadMore}>
            <CardList>{pokemonCards}</CardList>
            {isModalVisible ? (
              <Modal onOutsideClick={this.closeModal}>
                <Suspense fallback={""}>
                  <AsyncPokemonModal
                    pokemonData={this.state.selectedPokemonData}
                    onCloseButtonClick={this.closeModal}
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
        {this.state.searchValue.length ? (
          <LoadMore
            loadedCount={this.context.loadedPokemons.length}
            totalCount={this.context.totalPokemons}
            loadMore={this.loadMorePokemonsToCache}
            isLoading={this.state.infiniteScrollLoading}
          />
        ) : (
          ""
        )}
      </div>
    );
  }
}
export default App;
