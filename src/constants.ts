const useAuthLocally = false;

interface Constants {
  isLocal: boolean;
  useAuth: boolean;
  apiUrl: string;
}

let constants: Constants;

switch (process.env.APP_ENV) {
  case "production":
    constants = {
      isLocal: false,
      useAuth: true,
      apiUrl:
        "https://o7djslll9h.execute-api.us-east-2.amazonaws.com/beer-backend",
    };
    break;
  case "development":
    constants = {
      isLocal: true,
      useAuth: useAuthLocally,
      apiUrl: "http://localhost:5000",
    };
    break;
  default:
    throw Error(`Invalid environment specified: ${process.env.APP_ENV}`);
}

console.log(constants);

export default constants;
