import { get } from "./HttpMethods.js";

export const getTopHeadlines = (params) => {
  return get({ path: "/top-headlines", params });
};

export const getEverythingNews = (params) => {
  return get({ path: "/everything", params });
};
