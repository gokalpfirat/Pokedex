import { Component } from "react";

class InfiniteScroll extends Component {
  cb = (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        this.props.callback();
      }
    });
  };
  componentDidMount() {
    const options = {
      root: null,
      rootMargin: "600px",
      threshold: 0
    };

    const observer = new IntersectionObserver(this.cb, options);
    observer.observe(this.props.loadRef.current);
  }
  render() {
    return <>{this.props.children}</>;
  }
}

export default InfiniteScroll;
