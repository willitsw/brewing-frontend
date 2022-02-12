import { getAuth, onAuthStateChanged } from "firebase/auth";
import { clearBrewSettings } from "../../redux/brew-settings/slice";
import { useAppDispatch } from "../../redux/hooks";
import { clearUser, setUser } from "../../redux/user/slice";

interface AuthProviderProps {
  children: React.ReactNode;
}

const AuthProvider = ({ children }: AuthProviderProps) => {
  const auth = getAuth();
  const dispatch = useAppDispatch();

  onAuthStateChanged(auth, (user) => {
    if (user) {
      // User is signed in, see docs for a list of available properties
      // https://firebase.google.com/docs/reference/js/firebase.User
      console.log("user is logged in");
      console.log(user);
      dispatch(
        setUser({
          displayName: user.displayName,
          email: user.email,
          photoUrl: user.photoURL,
          uid: user.uid,
        })
      );
      // ...
    } else {
      // User is signed out
      // ...
      console.log("user is logged out");
      dispatch(clearUser());
      dispatch(clearBrewSettings());
    }
  });
  return <>{children}</>;
};

export default AuthProvider;
