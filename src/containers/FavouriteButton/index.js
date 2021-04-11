import { PureComponent } from "react";
import "./style.css";

class FavouriteButton extends PureComponent {
  clickFn = (e) => {
    e.stopPropagation();
    this.props.clickHandler();
  };

  render() {
    const { dark, isFavourite, style, className } = this.props;
    const resultImg = isFavourite ? "full_hearth" : "hearth";
    const base = process.env.PUBLIC_URL ? process.env.PUBLIC_URL : "";
    return (
      <img
        style={style}
        alt="Hearth Icon"
        src={`${base}/assets/${dark ? "dark" : "white"}/${resultImg}.svg`}
        className={`favourite ${className} ${
          resultImg === "full_hearth"
            ? "favourite--active"
            : "favourite--disabled"
        }`}
        onMouseEnter={this.mouseEnter}
        onMouseLeave={this.mouseLeave}
        onClick={(e) => this.clickFn(e)}
      />
    );
  }
}
export default FavouriteButton;
