const RatingSlider = () => {
    return (
        <div className="flex flex-row items-center">
            <label
                htmlFor="rating-score"
                className="block text-sm text-gray-900 dark:text-white whitespace-nowrap mx-4 font-bold">
                Rating Score :
            </label>
            <input id="rating-score"
                type="range"
                value="50"
                className="w-full h-1 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700" />
        </div>

    )
}

export default RatingSlider;