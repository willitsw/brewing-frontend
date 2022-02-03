import Content from "../../components/content";
import { useAuth0 } from "@auth0/auth0-react";

const HomePage = () => {
  const { user, isAuthenticated, loginWithRedirect, logout } = useAuth0();

  return (
    <Content pageTitle="What ales you">
      Welcome
      <br />
      <button onClick={() => loginWithRedirect()}>Log In</button>
      <button onClick={() => logout({ returnTo: window.location.origin })}>
        Log Out
      </button>
      {isAuthenticated ? (
        <div>
          <img src={user?.picture} alt={user?.name} />
          <h2>{user?.name}</h2>
          <p>{user?.email}</p>
        </div>
      ) : (
        <div>Not logged in</div>
      )}
    </Content>
  );
};

export default HomePage;
