const Tab = ({ tabName, onTabChange, selectedTab }) => (
  <div
    className={`pokemon_data__title ${
      selectedTab === tabName ? "pokemon_data__title--selected" : ""
    }`}
    onClick={() => onTabChange(tabName)}
  >
    {tabName}
  </div>
);
export default Tab;
