const isLocal = process.env.NODE_ENV === "development";

interface Constants {
  isLocal: boolean;
  apiUrl: string;
}

export const constants: Constants = {
  isLocal: isLocal,
  apiUrl: isLocal
    ? "http://localhost:5000"
    : "https://o7djslll9h.execute-api.us-east-2.amazonaws.com/beer-backend-prod",
};
