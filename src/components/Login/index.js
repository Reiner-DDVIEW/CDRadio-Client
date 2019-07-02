import React, { useContext } from "react";
import { Context } from "../../Contexts/loginStatus";
import "./style.css";

export default function Login({ setLogin }) {
  const loginStatus = useContext(Context);

  const loginFunction = () => {
    const cachedPassword = localStorage.getItem("pass");
    localStorage.setItem(
      "pass",
      prompt("Password:", cachedPassword ? cachedPassword : "")
    );
    //TODO: make request with password , get authkey
    const authkey = "abc";
    localStorage.setItem("authkey", authkey);
    setLogin({ ...loginStatus, authkey: authkey });
  };

  const logoutFunction = () => {
    localStorage.removeItem("authkey");
    setLogin({ ...loginStatus, authkey: null });
  };

  if (loginStatus.authkey) {
    return (
      <div className="Login">
        <button onClick={logoutFunction}>Logout</button>
        <label className="switch">
          <input
            type="checkbox"
            checked={loginStatus.visible}
            onChange={({ target }) => {
              setLogin({ ...loginStatus, visible: target.checked });
            }}
          />
          <span className="slider round" />
        </label>
      </div>
    );
  } else {
    return <button onClick={loginFunction}>Login</button>;
  }
}
