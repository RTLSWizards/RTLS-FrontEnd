import axios from "axios";

const axiosCloud = axios.create({
  // cambia successivamente con URL cloud
  baseURL: "http://localhost:7140/api/",
});
export default axiosCloud;

export const ENDPOINT = {
  anchor: "anchor",
  tag: "tag",
};
