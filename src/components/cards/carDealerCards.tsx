import { CarCardProps } from "../../types/common";
import { JSX, memo } from "react";
import CarNotFound from "../../assets/images/car-not-found.png";

const CarCard = (props: CarCardProps): JSX.Element => {
  const { imgUrl, title, city, rating, porpularity } = props;
  return (
    <div className="overflow-hidden max-w-sm bg-white border border-gray-200 w-full rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700 hover:shadow-lg transition-transform transform hover:scale-105">
      <img
        className="h-48 w-full object-cover transition-transform hover:scale-105 transition-duration-700"
        src={imgUrl}
        onError={(e) => {
          (e.target as HTMLImageElement).src = CarNotFound;
          (e.target as HTMLImageElement).alt = "Image failed to load";
        }}
        alt={title}
      />

      <div className="p-5">
        <h5
          className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white whitespace-nowrap overflow-hidden text-ellipsis"
          data-cy={"car-title"}
        >
          {title}
        </h5>
        <div className="border-t dark:border-gray-700 border-gray-200 my-2"></div>

        <div className="flex items-center justify-between">
          <p className="mb-2 font-normal text-gray-700 dark:text-gray-400">
            {city}
          </p>
          <p className="mb-2 font-normal text-gray-700 dark:text-gray-400">
            ⭐ {rating}
          </p>
        </div>
        <div className="flex">
          <p className="font-normal text-gray-700 dark:text-gray-400">
            Porpularity : {porpularity}
          </p>
        </div>
      </div>
    </div>
  );
};

export default memo(CarCard);
