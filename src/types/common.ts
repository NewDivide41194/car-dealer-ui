interface CarDetails {
    id: number,
    name: string,
    imageUrl: string,
    popularity: number,
    city: string,
    rating_score: number
}

interface CarCardProps {
    imgUrl: string;
    title: string;
    city: string;
    rating: number;
}

export type { CarDetails, CarCardProps };