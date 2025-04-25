export type Dealer = {
    id: number;
    name: string;
    logo: string;
    rating_score: number;
    city: string;
    popularity: number;
  };
  
  const baseUrl = process.env.REACT_APP_BASE_URL;

  export const fetchDealers = async (page: number): Promise<Dealer[]> => {
    const carDealerList = baseUrl+ "/cars";
    const res = await fetch(carDealerList + `?page=${page}`);
    if (!res.ok) throw new Error('Failed to fetch dealers');
    return res.json();
  };