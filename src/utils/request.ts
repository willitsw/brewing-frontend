import constants from "../constants";
import { getToken } from "./auth-helpers";

type RequestMethod = "GET" | "POST" | "PUT" | "DELETE";

const makeRequest = async (route: string, verb: RequestMethod, body = {}) => {
  const token = await getToken();
  const url = constants.apiUrl + route;
  const fetchConfig: RequestInit = {
    headers: {
      "Content-Type": "application/json",
      Accept: "*/*",
      Authorization: token,
    },
    method: verb,
  };

  if (verb === "POST" || verb === "PUT") {
    fetchConfig.body = JSON.stringify(body);
  }

  const response = await fetch(url, fetchConfig);
  return response.json();
};

export default makeRequest;
