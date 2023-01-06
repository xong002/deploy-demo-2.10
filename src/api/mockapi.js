//import axios
import axios from "axios";

//supply the BaseURL
const BASE_URL = 'https://62ba9b04573ca8f8328762ca.mockapi.io';


//create the connection
const mockAPI = axios.create({ baseURL: BASE_URL });

export default mockAPI;