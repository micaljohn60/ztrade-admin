import axios from "axios";

export default axios.create({
    baseURL: process.env.REACT_APP_STATUS === "development"  ? 
     process.env.REACT_APP_DEVELOPMENT_PORT : process.env.REACT_APP_PRODUCTION_PORT,
})