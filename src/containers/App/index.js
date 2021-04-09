import { Component, createRef, lazy, Suspense } from "react";
import { getPokemonList, getPokemonTypes } from "../../api";
import CardList from "../CardList";
import Card from "../Card";
import Modal from "../Modal";
import InfiniteScroll from "../InfiniteScroll";
import "./style.css";

const AsyncPokemonModal = lazy(() => import("../../components/PokemonModal"));

class App extends Component {
  constructor() {
    super();
    this.state = {
      pokemonList: [],
      pageNum: 0,
      isModalVisible: false,
      selectedPokemonData: null
    };
    this.loadRef = createRef();
  }

  loadMore = async () => {
    const pokemons = await getPokemonList(40, this.state.pageNum + 1);
    this.setState((prevState) => ({
      pokemonList: prevState.pokemonList.concat(pokemons),
      pageNum: prevState.pageNum + 1
    }));
  };

  showModal = (pokemonData) => {
    this.setState({ isModalVisible: true, selectedPokemonData: pokemonData });
  };

  closeModal = () => {
    this.setState({ isModalVisible: false });
  };

  async componentDidMount() {
    const pokemons = await getPokemonList(40, this.state.pageNum);
    //const types = await getPokemonTypes();
    //const data = await getPokemonData(1);
    this.setState({ pokemonList: pokemons });
  }
  render() {
    const { pokemonList, isModalVisible } = this.state;
    const pokemonCards = pokemonList.length
      ? pokemonList.map((pokemon, index) => (
          <Card
            pokemonName={pokemon.name}
            pokemonID={index}
            key={pokemon.name}
            onClickHandler={this.showModal}
          />
        ))
      : "";
    return pokemonList.length ? (
      <div className="homepage">
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
      </div>
    ) : (
      ""
    );
  }
}
export default App;
