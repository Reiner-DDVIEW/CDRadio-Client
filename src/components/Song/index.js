import React, { useContext } from "react";
import { Context } from "../../Contexts/loginStatus";
import "./style.css";

export default function Song({ song, remove, skip }) {
  const loginStatus = useContext(Context);
  return (
    <div>
      <li>
        <p>{song}</p>
        {loginStatus && (
          <>
            <button onClick={() => skip(song)}>>></button>
            <button onClick={() => remove(song)}>X</button>
          </>
        )}
      </li>
      <hr />
    </div>
  );
}
