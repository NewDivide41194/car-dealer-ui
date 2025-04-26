interface CarDetails {
    id: number,
    name: string,
    imageUrl: string,
    popularity: number,
    city: string,
    rating_score: number
}
interface CityDetails {
    id: number,
    name: string
}

interface CarCardProps {
    imgUrl: string;
    title: string;
    city: string;
    rating: number;
}

enum SortingOptions {
    POPULARITY = 'popularity',
    RATING = 'rating'
}

enum SortingOrder {
    ASCENDING = 'asc',
    DESCENDING = 'desc'
}

export type { CarDetails, CarCardProps, CityDetails, };
export { SortingOptions, SortingOrder };
