const useAuthLocally = true;

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
        "https://6l89tf8fp2.execute-api.us-east-2.amazonaws.com/beer-backend",
    };
    break;
  case "staging":
    constants = {
      isLocal: false,
      useAuth: true,
      apiUrl:
        "https://uvefvxdro8.execute-api.us-east-2.amazonaws.com/beer-backend",
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

export const DATE_FORMAT = "MM/DD/YYYY";

export default constants;
