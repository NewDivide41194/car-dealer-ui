import { useEffect } from "react";
import { CarDetails } from "../../types/common";
import { fetchCars, incrementPage } from "../../features/carsSlice";
import { useInView } from "react-intersection-observer";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import { useAppDispatch } from "../../hooks/useAppDispatch";
import CarCard from "../cards/carDealerCards";
import CarDealerListSkeleton from "../skeleton/carDealerListSkeleton";

const CarDealerList = () => {
  const { list, page, hasMore, loading } = useSelector((state: RootState) => state.cars);
  const { ref, inView } = useInView();
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchCars({ page }));
  }, [page, dispatch]);

  useEffect(() => {
    if (inView && !loading && hasMore) {
      dispatch(incrementPage());
    }
  }, [inView]);
  console.log(list);

  return (
    <>
      <p className="text-3xl font-bold text-center text-gray-800 dark:text-white">
        Car Dealer List
      </p>
      {list.length > 0 ?
        <div
          className="p-4 grid grid-cols-1 md:grid-cols-2 sm:grid-cols-2 lg:grid-cols-3  xl:grid-cols-4 gap-2">
          {list.map((car: CarDetails, k: number) => (
            <div
              key={k}
              className="p-4 flex flex-col items-center"
            >
              <CarCard
                key={car.id}
                imgUrl={car.imageUrl}
                title={car.name}
                city={car.city}
                rating={car.rating_score} />
            </div>))}
          {hasMore && (
            <div ref={ref} className="col-span-full text-center p-4">
              {loading ? 'Loading more cars...' : 'Scroll to load more'}
            </div>
          )}
        </div> : loading ?
          <div
            className="p-4 grid grid-cols-1 md:grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2">
            {new Array(10).fill(null).map((v,k) =>
              <div className="p-4 flex flex-col items-center" key={k}>
                <CarDealerListSkeleton />
              </div>
            )}</div> :
          <div className="h-screen flex justify-center items-center">
            <p className="text-2xl font-bold">No car found!</p>
            </div>}
    </>

  );
}

export default CarDealerList;