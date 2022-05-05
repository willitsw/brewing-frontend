import { store } from "../store";
import { getBrewLogById } from "../../utils/api-calls";

export const handleGetBrewLogById = async (id: string) => {
  const brewLog = await getBrewLogById(id);
  store.dispatch({ type: "brew-log/updateWorkingBrewLog", payload: brewLog });
  return brewLog;
};
