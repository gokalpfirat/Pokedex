import { PureComponent } from "react";
import "./style.css";

class FavouriteButton extends PureComponent {
  clickFn = (e) => {
    e.stopPropagation();
    this.props.clickHandler();
  };

  render() {
    const { dark, isFavourite } = this.props;
    const resultImg = isFavourite ? "full_hearth" : "hearth";
    return (
      <img
        style={this.props.style}
        alt="Hearth Icon"
        src={`assets/${dark ? "dark" : "white"}/${resultImg}.svg`}
        className={
          "favourite " + this.props.className ? this.props.className : ""
        }
        onMouseEnter={this.mouseEnter}
        onMouseLeave={this.mouseLeave}
        onClick={(e) => this.clickFn(e)}
      />
    );
  }
}
export default FavouriteButton;
