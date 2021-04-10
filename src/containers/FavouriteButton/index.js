import { Component } from "react";
import emptyHearth from "../../assets/dark/hearth.svg";
import fullHearth from "../../assets/dark/full_hearth.svg";
import "./style.css";

class FavouriteButton extends Component {
  constructor(props) {
    super(props);
    this.state = {
      favouriteImg: this.props.isFavourite ? fullHearth : emptyHearth
    };
  }
  mouseHover = () => {
    const { favouriteImg } = this.state;
    if (favouriteImg === emptyHearth) {
      this.setState({ favouriteImg: fullHearth });
    } else {
      this.setState({ favouriteImg: emptyHearth });
    }
  };

  clickFn = (e) => {
    e.stopPropagation();
  };

  render() {
    const { favouriteImg } = this.state;
    return (
      <img
        style={this.props.style}
        alt="Hearth Icon"
        src={favouriteImg}
        className="favourite"
        onMouseEnter={this.mouseHover}
        onMouseLeave={this.mouseHover}
        onClick={(e) => this.clickFn(e)}
      />
    );
  }
}
export default FavouriteButton;
