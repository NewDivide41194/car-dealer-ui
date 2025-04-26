import { useSelector } from 'react-redux';
import { fetchCities, setSelectedCity, toggleDropdown } from '../../features/filterSlice'; // update the path if needed
import { RootState } from '../../store';
import { useEffect } from 'react';
import { useAppDispatch } from '../../hooks/useAppDispatch';

const CitySelector = () => {
  const { list, loading, selectedCity } = useSelector((state: RootState) => state.filter);
  const dispatch = useAppDispatch();
  const isOpen = useSelector((state: RootState) => state.filter.isDropdownOpen);

  useEffect(() => {
    if (isOpen) {
      dispatch(fetchCities())
    }
  }, [isOpen, dispatch]);

  const handleSelectedCity = (item: any) => {
    dispatch(setSelectedCity(item));
    dispatch(toggleDropdown());
  }

return (
  <div className="relative inline-block text-left p-4">
    <button
      onClick={() => dispatch(toggleDropdown())}
      className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
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

    {isOpen && (
      <div className="absolute z-10 mt-2 bg-white divide-y divide-gray-100 rounded-lg shadow-sm w-44 dark:bg-gray-700">
        <ul className="py-2 text-sm text-gray-700 dark:text-gray-200">
          {loading ? (
            <li className="px-4 py-2 text-gray-500">Loading...</li>
          ) : (
            list.map((item) => (
              <li
                key={item.id}
                className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                onClick={() => handleSelectedCity(item)}>

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
