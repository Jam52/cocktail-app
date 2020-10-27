import axios from '../axiosCocktail';

export default async (searchTerm) => {
    const response = await axios.get(`/v2/${process.env.REACT_APP_COCKTAIL_KEY}/${searchTerm}`);
    return await response.data.drinks
}