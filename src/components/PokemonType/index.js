import { PureComponent } from "react";
import "./style.css";

class PokemonType extends PureComponent {
  render() {
    const { typeName } = this.props;
    return (
      <div className={`pokemon_type pokemon_type--${typeName}`}>{typeName}</div>
    );
  }
}
export default PokemonType;
