import { Component } from "react";
import Tab from "../../components/Tab";
import "./style.css";

class Tabs extends Component {
  constructor() {
    super();
    this.state = {
      currentTab: "Details"
    };
  }
  changeTab = (tabName) => {
    this.setState({ currentTab: tabName });
  };
  render() {
    const { pokemonData } = this.props;
    return (
      <div className="pokemon_data">
        <div className="pokemon_data__titles">
          <Tab
            tabName="Details"
            onTabChange={this.changeTab}
            selectedTab={this.state.currentTab}
          />
          <Tab
            tabName="Moves"
            onTabChange={this.changeTab}
            selectedTab={this.state.currentTab}
          />
          <Tab
            tabName="Stats"
            onTabChange={this.changeTab}
            selectedTab={this.state.currentTab}
          />
        </div>
      </div>
    );
  }
}

export default Tabs;
