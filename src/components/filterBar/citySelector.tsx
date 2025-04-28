import {
  fetchCities,
  setSelectedCity,
  toggleDropdown,
} from "../../features/filterSlice";
import { RootState } from "../../store";
import { JSX, memo, useCallback, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/useAppDispatch";
import { fetchCars, setFilter } from "../../features/carsSlice";
import { CityDetails } from "../../types/common";
import DropDownButton from "../elements/dropdownButton";

const CitySelector = (): JSX.Element => {
  const { list, loading, selectedCity, isDropdownOpen } = useAppSelector(
    (state: RootState) => state.filter,
  );
  const { filters } = useAppSelector((state: RootState) => state.cars);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (isDropdownOpen) {
      dispatch(fetchCities());
    }
  }, [isDropdownOpen, dispatch]);

  const handleSelectCity = useCallback(
    (item: CityDetails) => {
      dispatch(setSelectedCity(item));
      dispatch(toggleDropdown());
      dispatch(setFilter({ ...filters, city: item.name }));
      dispatch(
        fetchCars({ page: 1, filters: { ...filters, city: item.name } }),
      );
    },
    [filters, dispatch],
  );

  const handleDropDownCity = useCallback((): void => {
    dispatch(toggleDropdown());
  }, []);

  return (
    <div className="relative inline-block text-left p-4">
      <DropDownButton
        onClickButton={handleDropDownCity}
        text={selectedCity?.name || null}
        placeholder={"Select a City"}
      />
      {isDropdownOpen && (
        <div className="absolute z-10 mt-2 bg-white divide-y divide-gray-100 rounded-lg shadow-sm w-44 dark:bg-gray-700">
          <ul className="py-2 text-sm text-gray-700 dark:text-gray-200 shadow-lg">
            {loading ? (
              <li className="px-4 py-2 text-gray-500">Loading...</li>
            ) : (
              list.map((item, k) => (
                <li
                  key={k}
                  data-cy={"city-option"}
                  className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white cursor-pointer"
                  onClick={() => handleSelectCity(item)}
                >
                  {item.name}
                </li>
              ))
            )}
          </ul>
        </div>
      )}
    </div>
  );
};

export default memo(CitySelector);
