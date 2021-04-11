import { createContext } from "react";

const AppContext = createContext({
  listType: "",
  searchValue: "",
  switchMode: () => {},
  onSearchInputChange: () => {}
});

export default AppContext;
