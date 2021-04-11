import { Component, createRef } from "react";
import { getPokemonList } from "../../api";
import { POKEMON_PER_PAGE } from "../../config/constants";
import PokemonContext from "../../context/PokemonContext";
import InfiniteScroll from "../InfiniteScroll";
import CardList from "../CardList";
import LoadingCircle from "../../components/LoadingCircle";
import InformationBox from "../../components/InformationBox";
import LoadMore from "../../components/LoadMore";

class Homepage extends Component {
  constructor() {
    super();
    this.state = {
      infiniteScrollLoading: false
    };
    // This is used as Intersection Observer element
    this.loadRef = createRef();
  }
  static contextType = PokemonContext;

  // Load Pokemons at Infinity Scroll
  loadMore = async () => {
    const { listType, searchValue } = this.props.pageContext;
    if (
      !this.state.infiniteScrollLoading &&
      !searchValue.length &&
      listType === "all"
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
    const { pageContext } = this.props;
    const { listType, searchValue } = pageContext;
    const { loadedPokemons, totalCount } = this.context;
    // Filterin Lists
    const filteredList = loadedPokemons.filter((pokemon) => {
      return pokemon.name.toLowerCase().includes(searchValue.toLowerCase());
    });

    return (
      loadedPokemons.length > 0 && (
        <InfiniteScroll loadRef={this.loadRef} callback={this.loadMore}>
          <CardList list={filteredList}></CardList>
          {loadedPokemons.length !== totalCount ? (
            <div ref={this.loadRef} style={{ textAlign: "center" }}>
              <LoadingCircle
                loadingState={!searchValue.length && listType === "all"}
              />
            </div>
          ) : (
            <InformationBox>You saw all Pokémons!</InformationBox>
          )}
          {searchValue.length > 0 && (
            <InformationBox>
              <LoadMore
                loadedCount={this.context.loadedPokemons.length}
                totalCount={this.context.totalPokemons}
                loadMore={this.loadMorePokemonsToCache}
                isLoading={this.state.infiniteScrollLoading}
              />
            </InformationBox>
          )}
        </InfiniteScroll>
      )
    );
  }
}
export default Homepage;
