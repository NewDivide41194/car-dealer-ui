import { JSX } from "react";
import CitySelector from "./citySelector";
import RatingSlider from "./ratingSlider";
import SortingSelector from "./sortingSelector";

const FilterBar = (): JSX.Element => {
  return (
    <div className="flex flex-row items-center justify-between p-4 flex-wrap">
      <div className="flex flex-row items-center">
        <CitySelector />
        <RatingSlider />
      </div>
      <div className="ms-4 flex flex-row items-center flex-wrap bg-gray-100 dark:bg-gray-800 rounded-lg p-2">
        <SortingSelector />
      </div>
    </div>
  );
}

export default FilterBar;