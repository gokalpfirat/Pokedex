import AppContext from "../../context/AppContext";
import { Component } from "react";

class ContextProvider extends Component {
  constructor() {
    super();
    this.state = {
      loadedPokemons: [],
      favouritePokemons: [],
      loadedPageNum: 0,
      totalPokemons: 1118,
      addLoadedPokemons: this.addLoadedPokemons,
      increasePageNum: this.increasePageNum
    };
  }
  addLoadedPokemons = (pokemons, callback) => {
    this.setState(
      (prevState) => ({
        loadedPokemons: prevState.loadedPokemons.concat(pokemons),
        loadedPageNum: prevState.loadedPageNum + 1
      }),
      () => {
        if (!callback) return;
        callback();
      }
    );
  };

  increasePageNum = () => {
    this.setState((prevState) => ({
      loadedPageNum: prevState.loadedPageNum + 1
    }));
  };
  render() {
    return (
      <AppContext.Provider value={this.state}>
        {this.props.children}
      </AppContext.Provider>
    );
  }
}
export default ContextProvider;
