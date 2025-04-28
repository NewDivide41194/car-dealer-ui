import { memo, useCallback, useMemo } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/useAppDispatch";
import {
  fetchCars,
  setFilter,
  setSelelectedCategory,
} from "../../features/carsSlice";
import debounce from "lodash.debounce";
import { RootState } from "../../store";
import { SearchCategories } from "../../types/common";

const SearchInput = () => {
  const { selectedCategory } = useAppSelector((state: RootState) => state.cars);
  const dispatch = useAppDispatch();
  // console.log(selectedCategory);

  const handleSearch = useCallback(
    (searchTerm: string, category: SearchCategories) => {
      const categoryParam =
        category === "Rating" ? "rating_score" : category.toLowerCase();
      dispatch(setFilter({ [categoryParam]: searchTerm }));
      dispatch(
        fetchCars({ page: 1, filters: { [categoryParam]: searchTerm } }),
      );
    },
    [dispatch],
  );

  const debouncedSearch = useMemo(
    () =>
      debounce((searchTerm: string) => {
        if (selectedCategory) {
          handleSearch(searchTerm, selectedCategory);
        }
      }, 500), //500ms delay
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [selectedCategory],
  );
  return (
    <form className="max-w-lg min-w-[30%] my-2">
      <div className="flex">
        <label
          htmlFor="search-dropdown"
          className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
        >
          Your Email
        </label>
        <button
          data-cy={"category-selector"}
          id="dropdown-button"
          data-dropdown-toggle="dropdown"
          className="shrink-0 z-10 inline-flex items-center py-2.5 px-4 text-sm font-medium text-center text-gray-900 bg-gray-100 border border-gray-300 rounded-s-lg hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-white dark:border-gray-600"
          type="button"
        >
          {selectedCategory}
          <svg
            className="w-2.5 h-2.5 ms-2.5"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 10 6"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="m1 1 4 4 4-4"
            />
          </svg>
        </button>
        <div
          id="dropdown"
          className="z-10 hidden bg-white divide-y divide-gray-100 rounded-lg shadow-sm w-44 dark:bg-gray-700"
        >
          <ul
            className="py-2 text-sm text-gray-700 dark:text-gray-200"
            aria-labelledby="dropdown-button"
          >
            {Object.values(SearchCategories).map((v, k) => (
              <li key={k}>
                <button
                  type="button"
                  onClick={() => {
                    dispatch(setSelelectedCategory(v));
                  }}
                  className="inline-flex w-full px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                >
                  {v}
                </button>
              </li>
            ))}
          </ul>
        </div>
        <div className="relative w-full">
          <input
            type="search"
            data-cy={"search-input"}
            onChange={(e) => debouncedSearch(e.target.value)}
            id="search-dropdown"
            className="outline-none block p-2.5 w-full z-20 text-sm text-gray-900 bg-gray-50 rounded-e-lg border-s-gray-50 border-s-2 border border-gray-300 dark:bg-gray-700 dark:border-s-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:border-blue-500"
            placeholder="Search by Name, City or Rating..."
            required
          />
        </div>
      </div>
    </form>
  );
};
export default memo(SearchInput);
