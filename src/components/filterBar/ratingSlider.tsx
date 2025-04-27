import React, { JSX } from "react";
import { RootState } from "../../store";
import { useAppDispatch, useAppSelector } from "../../hooks/useAppDispatch";
import { setRating } from "../../features/filterSlice";
import { fetchCars, setFilter } from "../../features/carsSlice";

const RatingSlider = (): JSX.Element => {
    const { selectedRating } = useAppSelector((state: RootState) => state.filter);
    const { filters } = useAppSelector((state: RootState) => state.cars);
    const dispatch = useAppDispatch();
    const onChangeRating = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = parseFloat(e.target.value);
        dispatch(setRating(value));
        dispatch(setFilter({ ...filters, rating_score: value.toString() }));        
        dispatch(fetchCars({ page: 1, filters: { ...filters, rating_score: value.toString() } }))
    }

    return (
        <div className="flex flex-row items-center">
            <label
                htmlFor="rating-score"
                className="block text-sm text-gray-900 dark:text-white whitespace-nowrap mx-4 font-bold">
                Rating :
            </label>
            <input
                id="rating-score"
                type="range"
                onChange={(e) => onChangeRating(e)}
                value={selectedRating}
                max={5}
                min={0}
                step={0.1}
                className="w-full h-1 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700" />
            <label className="ms-4">
                {selectedRating || null}
            </label>
        </div>

    )
}

export default RatingSlider;