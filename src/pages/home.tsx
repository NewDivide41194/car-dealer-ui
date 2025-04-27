import { JSX } from "react";
import FilterBar from "../components/filterBar";
import CarDealerList from "../components/listComponent/carDealerList";

const HomePage = ():JSX.Element => {
    return (
        <>
            <FilterBar />
            <CarDealerList />
        </>
    );
}

export default HomePage;