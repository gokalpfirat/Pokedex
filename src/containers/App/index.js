import { Component, lazy, Suspense } from "react";
import Logo from "../../components/Logo";
import Menu from "../Menu";
import AppContext from "../../context/AppContext";
import LoadingCircle from "../../components/LoadingCircle";

import "./style.css";

const AsyncHomepage = lazy(() => import("../Homepage"));
const AsyncFavourites = lazy(() => import("../Favourites"));
const AsyncDetails = lazy(() => import("../Details"));

class App extends Component {
  constructor() {
    super();
    this.state = {};
  }

  static contextType = AppContext;

  render() {
    const { listType } = this.context;
    const renderRoute = () => {
      if (listType === "all") {
        return <AsyncHomepage pageContext={this.context} />;
      } else if (listType === "favourites") {
        return <AsyncFavourites pageContext={this.context} />;
      } else if (listType === "details") {
        return <AsyncDetails pageContext={this.context} />;
      }
    };
    return (
      <div className="homepage">
        <Logo />
        <Menu pageContext={this.context} />
        <Suspense
          fallback={
            <div style={{ textAlign: "center" }}>
              <LoadingCircle />
            </div>
          }
        >
          {renderRoute()}
        </Suspense>
      </div>
    );
  }
}
export default App;
