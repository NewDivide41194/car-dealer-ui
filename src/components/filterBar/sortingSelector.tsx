import { JSX, use, useEffect } from "react";
import { SortingOptions, SortingOrder } from "../../types/common";
import { useAppDispatch, useAppSelector } from "../../hooks/useAppDispatch";
import { RootState } from "../../store";
import { setSortBy, setSortOrder, toggleDropdownSort } from "../../features/sortingSlice";
import { fetchCars, setFilter } from "../../features/carsSlice";


const SortingSelector = (): JSX.Element => {
    const dispatch = useAppDispatch();
    const { isDropdownOpen, selectedSortOrder } = useAppSelector((state: RootState) => state.sort);
    const { filters } = useAppSelector((state: RootState) => state.cars);

    const handleSelectSortBy = (item: SortingOptions) => {
        dispatch(setSortBy(item));
        dispatch(toggleDropdownSort());
        // dispatch(setFilter({ ...filters, sort: item }));
    }
    const handleChangeSortOrder = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value.toLocaleLowerCase();
        if (selectedSortOrder) {
            dispatch(setSortOrder({ sortOrder: value as SortingOrder }));
            dispatch(setFilter({ ...filters, sortBy: SortingOptions[selectedSortOrder.toUpperCase() as keyof typeof SortingOptions], order: value.toString() }));
            dispatch(fetchCars({
                page: 1, filters: {
                    ...filters, sortBy: SortingOptions[selectedSortOrder.toUpperCase() as keyof typeof SortingOptions],
                    order: value.toString()
                }
            }))
        }
    }

    return (
        <div className="flex flex-row items-center">
            <div className="relative inline-block text-left me-2">
                <button
                    onClick={() => dispatch(toggleDropdownSort())}
                    className="w-[150px] justify-between text-white bg-blue-600 hover:bg-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:bg-gray-700 dark:hover:bg-gray-600"
                    type="button"
                >
                    {selectedSortOrder || "Sort by"}
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
                        <ul className="py-2 text-sm text-gray-700 dark:text-gray-200 shadow-lg">
                            {Object.keys(SortingOptions).map((item,k) => (
                                <li
                                    key={item}
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
            {Object.values(SortingOrder).map((v, k) => <div
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
                    className="w-4 h-4 text-gray-600 bg-gray-100 border-gray-300 dark:bg-gray-700 dark:border-gray-600" />
                <label
                    htmlFor={v}
                    data-cy={"order-option"}
                    className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">{v.toUpperCase()}</label>
            </div>)}

        </div>
    )
}

export default SortingSelector;