import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useEffect } from "react";
import constants from "../../constants";
import {
  clearBrewSettings,
  setBrewSettings,
} from "../../redux/brew-settings/slice";
import { useAppDispatch } from "../../redux/hooks";
import { setGlobalIsLoading } from "../../redux/misc/slice";
import { clearUser, setUser } from "../../redux/user/slice";
import { getBrewSettings } from "../../utils/api-calls";
import React from "react";

interface AuthProviderProps {
  children: React.ReactNode;
}

const AuthProvider = ({ children }: AuthProviderProps) => {
  const auth = getAuth();
  const dispatch = useAppDispatch();

  useEffect(() => {
    // This is a hack that will only fire when running local without auth. Otherwise this does nothing.
    const getNonAuthSettings = async () => {
      dispatch(
        setUser({
          displayName: "Local Dev User",
          email: "localDevUser@whatalesyou.net",
          photoUrl: null,
          uid: "123456789",
        })
      );
      const brewSettings = await getBrewSettings();
      dispatch(setBrewSettings(brewSettings));
      dispatch(setGlobalIsLoading(false));
    };

    if (!constants.useAuth) {
      getNonAuthSettings();
    }
  }, []);

  onAuthStateChanged(auth, async (user) => {
    if (user) {
      dispatch(
        setUser({
          displayName: user.displayName,
          email: user.email,
          photoUrl: user.photoURL,
          uid: user.uid,
        })
      );
      const brewSettings = await getBrewSettings();
      dispatch(setBrewSettings(brewSettings));
      dispatch(setGlobalIsLoading(false));
    } else {
      if (constants.useAuth) {
        dispatch(clearUser());
        dispatch(clearBrewSettings());
        dispatch(setGlobalIsLoading(false));
      }
    }
  });
  return <>{children}</>;
};

export default AuthProvider;
