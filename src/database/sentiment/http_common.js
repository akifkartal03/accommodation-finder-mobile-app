import axios from "axios";
export default axios.create({
  baseURL: "https://cse495api.herokuapp.com/api/v1/getResult/",
});
