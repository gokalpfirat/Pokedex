import { Component } from "react";
import InformationBox from "../../components/InformationBox";
import FavouriteDetails from "../FavouriteDetails";

class Details extends Component {
  render() {
    return (
      <InformationBox>
        <FavouriteDetails />
      </InformationBox>
    );
  }
}
export default Details;
