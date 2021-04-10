import Tab from "../../components/Tab";
import "./style.css";

const Tabs = ({ currentTab, onChangeTab, pokemonData }) => (
  <div className="pokemon_tabs">
    <div className="pokemon_tabs__titles">
      <Tab
        tabName="Details"
        onTabChange={onChangeTab}
        selectedTab={currentTab}
      />
      {pokemonData.moves.length ? (
        <Tab
          tabName="Moves"
          onTabChange={onChangeTab}
          selectedTab={currentTab}
        />
      ) : (
        ""
      )}
      <Tab tabName="Stats" onTabChange={onChangeTab} selectedTab={currentTab} />
    </div>
  </div>
);

export default Tabs;
