import axios from "axios";

const instance = axios.create({
    baseURL: "https://www.thecocktaildb.com/api/json/",
});

export default instance;
