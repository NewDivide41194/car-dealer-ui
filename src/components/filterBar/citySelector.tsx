import { fetchCities, setSelectedCity, toggleDropdown } from '../../features/filterSlice'; // update the path if needed
import { RootState } from '../../store';
import { JSX, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks/useAppDispatch';
import { fetchCars, setFilter } from '../../features/carsSlice';

const CitySelector = (): JSX.Element => {
  const { list, loading, selectedCity, isDropdownOpen } = useAppSelector((state: RootState) => state.filter);
  const { filters } = useAppSelector((state: RootState) => state.cars);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (isDropdownOpen) {
      dispatch(fetchCities())
    }
  }, [isDropdownOpen, dispatch]);

  const handleSelectCity = (item: any) => {
    dispatch(setSelectedCity(item));
    dispatch(toggleDropdown());
    dispatch(setFilter({ ...filters ,city: item.name }));
    dispatch(fetchCars({ page: 1, filters: {  ...filters, city: item.name } }));
  }

  return (
    <div className="relative inline-block text-left p-4">
      <button
        onClick={() => dispatch(toggleDropdown())}
        className="w-[150px] text-white bg-blue-600 hover:bg-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:bg-gray-700 dark:hover:bg-gray-600"
        type="button"
      >
        {selectedCity ? selectedCity.name : "Select a City"}
        <svg
          className="w-2.5 h-2.5 ms-3"
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

      {isDropdownOpen && (
        <div className="absolute z-10 mt-2 bg-white divide-y divide-gray-100 rounded-lg shadow-sm w-44 dark:bg-gray-700">
          <ul className="py-2 text-sm text-gray-700 dark:text-gray-200">
            {loading ? (
              <li className="px-4 py-2 text-gray-500">Loading...</li>
            ) : (
              list.map((item) => (
                <li
                  key={item.id}
                  className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white cursor-pointer"
                  onClick={() => handleSelectCity(item)}>

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

export default CitySelector;
