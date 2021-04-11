import AppContext from "../../context/AppContext";
import { Component } from "react";

class AppProvider extends Component {
  constructor() {
    super();
    this.state = {
      listType: "all",
      searchValue: "",
      switchMode: this.switchMode,
      onSearchInputChange: this.onSearchInputChange
    };
  }

  switchMode = (path) => {
    // Reset Search & Modal Values
    this.setState({ searchValue: "" });
    this.setState({ listType: path });
  };

  onSearchInputChange = (value) => {
    this.setState({ searchValue: value });
  };

  render() {
    return (
      <AppContext.Provider value={this.state}>
        {this.props.children}
      </AppContext.Provider>
    );
  }
}
export default AppProvider;
