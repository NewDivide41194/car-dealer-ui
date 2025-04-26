import CitySelector from "./cityFilter";
import RatingSlider from "./ratingSlider";
import SortingSelector from "./sortingSelector";

const FilterBar = () => {
  return (
    <div className="flex flex-row items-center justify-between p-4">
     <div className="flex flex-row items-center">
     <CitySelector/>
      <RatingSlider/>
     </div> 
     <div className="flex flex-row items-center">
      <SortingSelector label="Porpularity"/>
      <SortingSelector label="Rating"/>

     </div>
    </div>
  );
} 

export default FilterBar;