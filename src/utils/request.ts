import { constants } from "../constants";

type RequestMethod = "GET" | "POST" | "PUT" | "DELETE";

const makeRequest = async (route: string, verb: RequestMethod, body = {}) => {
  const url = constants.apiUrl + route;
  const fetchConfig: RequestInit = {
    headers: {
      "Content-Type": "application/json",
      Accept: "*/*",
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
