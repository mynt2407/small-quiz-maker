import axios from "axios";

const axiosClient = axios.create({
  baseURL: "https://opentdb.com"
});

axiosClient.interceptors.response.use((response) => {
  if (response !== undefined && response.data !== undefined) {
    // only get data
    return response.data;
  }
  return response;
}, async (error) => {
  // Handle errors
  throw error;
});

export default axiosClient;