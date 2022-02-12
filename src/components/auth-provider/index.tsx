import { getAuth, onAuthStateChanged } from "firebase/auth";
import { clearBrewSettings } from "../../redux/brew-settings/slice";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import {
  clearUser,
  setShowCreateAccountModal,
  setShowLoginModal,
  setUser,
  showCreateAccountModal,
  showLoginModal,
} from "../../redux/user/slice";
import CreateNewAccountModal from "../modals/create-new-account";
import LoginModal from "../modals/login";

interface AuthProviderProps {
  children: React.ReactNode;
}

const AuthProvider = ({ children }: AuthProviderProps) => {
  const auth = getAuth();
  const dispatch = useAppDispatch();
  const showLogin = useAppSelector(showLoginModal);
  const showCreateAccount = useAppSelector(showCreateAccountModal);

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
  return (
    <>
      {children}
      <CreateNewAccountModal
        onCancel={() => dispatch(setShowCreateAccountModal(false))}
        showModal={showCreateAccount}
      />
      <LoginModal
        onCancel={() => dispatch(setShowLoginModal(false))}
        showModal={showLogin}
      />
    </>
  );
};

export default AuthProvider;
