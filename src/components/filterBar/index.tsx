import { JSX, memo } from "react";
import { lazy, Suspense } from "react";

const RatingSlider = lazy(() => import("./ratingSlider"));
const CitySelector = lazy(() => import("./citySelector"));
const SortingSelector = lazy(() => import("./sortingSelector"));

const FilterBar = (): JSX.Element => {
  return (
    <div className="flex flex-row items-center justify-between p-4 flex-wrap">
      <div className="flex flex-row items-center">
        <Suspense
          fallback={
            <div className="ms-4 h-10 w-40 flex flex-row items-center flex-wrap bg-gray-200 dark:bg-gray-800 rounded-lg p-2"></div>
          }
        >
          <CitySelector />
          <RatingSlider />
        </Suspense>
      </div>
      <div className="ms-4 flex flex-row items-center flex-wrap bg-gray-200 dark:bg-gray-800 rounded-lg p-2">
        <Suspense fallback={<div className="w-40 h-10"></div>}>
          <SortingSelector />
        </Suspense>
      </div>
    </div>
  );
};

export default memo(FilterBar);
