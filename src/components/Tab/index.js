const Tab = ({ tabName, onTabChange, selectedTab }) => (
  <div
    className={`pokemon_tabs__title ${
      selectedTab === tabName ? "pokemon_tabs__title--selected" : ""
    }`}
    onClick={() => onTabChange(tabName)}
  >
    {tabName}
  </div>
);
export default Tab;
