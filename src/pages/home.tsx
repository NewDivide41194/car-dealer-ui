import { JSX } from "react";
import { DefaultCarDealerList, FilterBar } from "../components";

const HomePage = (): JSX.Element => {
  return (
    <>
      <FilterBar />
      <DefaultCarDealerList />
    </>
  );
};

export default HomePage;
