import { JSX, memo, useCallback } from "react";
import { SortingOptions, SortingOrder } from "../../types/common";
import { useAppDispatch, useAppSelector } from "../../hooks/useAppDispatch";
import { RootState } from "../../store";
import {
  setSortBy,
  setSortOrder,
  toggleDropdownSort,
} from "../../features/sortingSlice";
import { fetchCars, setFilter } from "../../features/carsSlice";
import DropDownButton from "../elements/dropdownButton";

const SortingSelector = (): JSX.Element => {
  const dispatch = useAppDispatch();
  const { isDropdownOpen, selectedSortOrder } = useAppSelector(
    (state: RootState) => state.sort,
  );
  const { filters } = useAppSelector((state: RootState) => state.cars);

  const handleSelectSortBy = useCallback(
    (item: SortingOptions) => {
      dispatch(setSortBy(item));
      dispatch(toggleDropdownSort());
      // dispatch(setFilter({ ...filters, sort: item }));
    },
    [dispatch],
  );

  const handleChangeSortOrder = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.toLocaleLowerCase();
    if (selectedSortOrder) {
      dispatch(setSortOrder({ sortOrder: value as SortingOrder }));
      dispatch(
        setFilter({
          ...filters,
          sortBy:
            SortingOptions[
              selectedSortOrder.toUpperCase() as keyof typeof SortingOptions
            ],
          order: value.toString(),
        }),
      );
      dispatch(
        fetchCars({
          page: 1,
          filters: {
            ...filters,
            sortBy:
              SortingOptions[
                selectedSortOrder.toUpperCase() as keyof typeof SortingOptions
              ],
            order: value.toString(),
          },
        }),
      );
    }
  };

  const handleDropDownSort = useCallback((): void => {
    dispatch(toggleDropdownSort());
  }, [dispatch]);

  return (
    <div className="flex flex-row items-center">
      <div className="relative inline-block text-left me-2">
        <DropDownButton
          onClickButton={handleDropDownSort}
          text={selectedSortOrder}
          placeholder={"Sort by"}
        />
        {isDropdownOpen && (
          <div className="absolute z-10 mt-2 bg-white divide-y divide-gray-100 rounded-lg shadow-sm w-44 dark:bg-gray-700">
            <ul className="py-2 text-sm text-gray-700 dark:text-gray-200 shadow-lg">
              {Object.keys(SortingOptions).map((item, k) => (
                <li
                  key={k}
                  data-cy={"sort-by-option"}
                  className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white cursor-pointer"
                  onClick={() => handleSelectSortBy(item as SortingOptions)}
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
      {Object.values(SortingOrder).map((v, k) => (
        <div
          className="flex items-center mx-2"
          key={k}
          title={!selectedSortOrder ? "Please select a sorting option" : ""}
        >
          <input
            id={v}
            type="radio"
            value={v}
            disabled={!selectedSortOrder}
            onChange={(e) => handleChangeSortOrder(e)}
            name={"sorting"}
            className="w-4 h-4 text-gray-600 bg-gray-100 border-gray-300 dark:bg-gray-700 dark:border-gray-600"
          />
          <label
            htmlFor={v}
            data-cy={"order-option"}
            className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
          >
            {v.toUpperCase()}
          </label>
        </div>
      ))}
    </div>
  );
};

export default memo(SortingSelector);
