import "./style.css";

const PokemonSearchInput = ({ placeholder, onChange }) => (
  <input
    className="search_input"
    placeholder={placeholder}
    onChange={(e) => onChange(e.target.value)}
  />
);
export default PokemonSearchInput;
