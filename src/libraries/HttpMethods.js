import axios from "axios";
import { Notify } from "quasar";

const API_KEY = process.env.API_KEY.replace(/^"|"$/g, '');
const BASE_API_URL = process.env.BASE_API_URL.replace(/^"|"$/g, '');

export const get = ({ path, params = {} }) => {
  params.apiKey = API_KEY;
  return axios({
    baseURL: BASE_API_URL,
    method: "GET",
    url: path,
    params,
  })
    .then(({ data }) => {
      if (data && data.status.toLowerCase() === "ok") {
        return data;
      }

      throw new UnexpectedError("Server Error", data);
    })
    .catch((error) => {
      console.log("Failed to get response from server", error);
      Notify.create({
        message: "Failed to get response from server",
        timeout: 5000,
        type: "negative",
        color: "negative",
        icon: "warning",
      });
    });
};
