interface CarDetails {
  id: number;
  name: string;
  imageUrl: string;
  popularity: number;
  city: string;
  rating_score: number;
}
interface CityDetails {
  id: number;
  name: string;
}

interface CarCardProps {
  imgUrl: string;
  title: string;
  city: string;
  rating: number;
  porpularity: number;
}

enum SortingOptions {
  POPULARITY = "popularity",
  RATING = "rating_score",
}

enum SortingOrder {
  ASCENDING = "asc",
  DESCENDING = "desc",
}

enum SearchCategories {
  NAME = "Name",
  CITY = "City",
  RATING = "Rating",
}

export type { CarDetails, CarCardProps, CityDetails };
export { SortingOptions, SortingOrder, SearchCategories };
