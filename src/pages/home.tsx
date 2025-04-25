import { useEffect } from "react";
import { fetchDealers } from "../services/dealer";

const HomePage = () => {
    useEffect(() => {
        fetchDealers(1)
    }, []);

    return (
        <div>
            <h1>Welcome to the Home Page</h1>
            <p>This is the main content of the home page.</p>
        </div>
    );
}

export default HomePage;