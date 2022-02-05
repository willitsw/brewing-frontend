const isLocal = process.env.NODE_ENV === "development";

const useAuthLocally = false;

interface Constants {
  isLocal: boolean;
  useAuth: boolean;
  apiUrl: string;
}

export const constants: Constants = {
  isLocal: isLocal,
  useAuth: !isLocal || (isLocal && !useAuthLocally),
  apiUrl: isLocal
    ? "http://localhost:5000"
    : "https://o7djslll9h.execute-api.us-east-2.amazonaws.com/beer-backend-prod",
};
