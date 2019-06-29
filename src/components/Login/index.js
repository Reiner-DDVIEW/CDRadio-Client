import React, { useContext } from "react";
import { Context } from "../../Contexts/loginStatus";
import "./style.css";

export default function Login({ setLogin }) {
  const loginStatus = useContext(Context);
  return (
    <label className="switch">
      <input
        type="checkbox"
        checked={loginStatus}
        onChange={({ target }) => {
          setLogin(target.checked);
        }}
      />
      <span className="slider round" />
    </label>
  );
  // return <button onClick={() => setLogin(true)}>LOGIN</button>;
}
