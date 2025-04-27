import { CarCardProps } from "../../types/common";
import { JSX } from "react";

const CarCard = (props: CarCardProps): JSX.Element => {
    const { imgUrl, title, city, rating, porpularity } = props;
    return (
        <div
            className="max-w-sm bg-white border border-gray-200 w-full rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700 hover:shadow-lg transition-transform transform hover:scale-105">
            <div
                className=" rounded-t-lg transition-[background-size] duration-300 ease-in-out bg-no-repeat bg-[length:100%] h-[155px] w-full bg-center overflow-hidden transform transition-transform duration-300"
                style={{
                    backgroundImage: `url(${imgUrl})`,
                }}
                onMouseEnter={e => e.currentTarget.style.backgroundSize = '110%'}
                onMouseLeave={e => e.currentTarget.style.backgroundSize = '100%'}
            />

            <div className="p-5">
                <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white" data-cy={"car-title"}>{title}</h5>
                <div className="border-t dark:border-gray-700 border-gray-200 my-2"></div>

                <div className="flex items-center justify-between">
                    <p className="mb-2 font-normal text-gray-700 dark:text-gray-400">{city}</p>
                    <p className="mb-2 font-normal text-gray-700 dark:text-gray-400">⭐ {rating}</p>
                </div>
                <div className="flex">
                    <p className="font-normal text-gray-700 dark:text-gray-400">Porpularity : {porpularity}</p>
                </div>
            </div>
        </div>

    )
}

export default CarCard;