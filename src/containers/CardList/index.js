import { Component } from "react";
import "./style.css";

class CardList extends Component {
  render() {
    return <div className="card_list">{this.props.children}</div>;
  }
}
export default CardList;
