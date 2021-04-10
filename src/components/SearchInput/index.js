import "./style.css";

const SearchInput = ({ placeholder, onChange, value }) => (
  <input
    className="search_input"
    placeholder={placeholder}
    value={value}
    onChange={(e) => onChange(e.target.value)}
  />
);
export default SearchInput;
