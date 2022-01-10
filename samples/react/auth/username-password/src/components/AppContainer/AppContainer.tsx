import { useState, useEffect } from "react";

import "./AppContainer.css";
import { Auth } from "@aws-amplify/auth";
import { Authenticator, Button } from "@aws-amplify/ui-react";
import UsernamePassword from "../Username-Password/SignIn/UsernamePassword";
import OAuth from "../OAUTH/OAuth";
import AppHome from "./AppHome";

const AppContainer: React.FC = () => {
  const [currentMode, setCurrentMode] = useState("none");
  const [currUser, setCurrUser] = useState(null);

  useEffect(() => {
    async function fetchCurrUser() {
      try {
        await Auth.currentAuthenticatedUser().then((user: any) => {
          setCurrUser(user);
        });
      } catch (error) {
        console.log(error);
      }
    }

    fetchCurrUser();
  }, []);

  async function signOut() {
    try {
      await Auth.signOut();
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <div className="app-container">
      <h2>Amplify Auth Workbench</h2>

      <p>Current mode: {currentMode}</p>

      <div className="btn-container">
        <Button
          size="small"
          variation="primary"
          onClick={() => setCurrentMode("Authenticator")}
        >
          Authenticator
        </Button>
        <Button
          size="small"
          variation="primary"
          onClick={() => setCurrentMode("Username/Password")}
        >
          Username/password
        </Button>
        <Button
          size="small"
          variation="primary"
          onClick={() => setCurrentMode("OAUTH")}
        >
          OAUTH
        </Button>
      </div>

      <div className="login-container">
        {currentMode === "Authenticator" ? (
          <Authenticator className="authenticator-container">
            {() => <AppHome />}
          </Authenticator>
        ) : currentMode === "Username/Password" ? (
          <UsernamePassword className="sample-app-container" />
        ) : currentMode === "OAUTH" ? (
          <OAuth className="sample-app-container" />
        ) : (
          <div />
        )}
      </div>

      {currUser !== null ? (
        <Button
          backgroundColor={"orange"}
          color={"white"}
          width={"100%"}
          onClick={signOut}
        >
          {" "}
          Sign out
        </Button>
      ) : (
        <div />
      )}
    </div>
  );
};
export default AppContainer;