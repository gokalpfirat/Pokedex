import { Component } from "react";
import ReactDOM from "react-dom";
import "./style.css";

class ModalProvider extends Component {
  componentDidMount() {
    document.body.style.overflow = "hidden";
  }

  componentWillUnmount() {
    document.body.style.overflow = "auto";
  }

  onOutsideClick = () => {
    this.props.onOutsideClick();
  };

  onCloseButtonClick = (e) => {
    e.stopPropagation();
    this.props.onCloseButtonClick();
  };

  onModalClick = (e) => {
    e.stopPropagation();
  };

  render() {
    return ReactDOM.createPortal(
      <div className="overlay" onClick={this.onOutsideClick}>
        <div className="modal" onClick={(e) => this.onModalClick(e)}>
          {this.props.children}
        </div>
      </div>,
      document.body
    );
  }
}
export default ModalProvider;
