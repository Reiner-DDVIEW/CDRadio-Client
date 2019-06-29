import React, { useContext } from "react";
import { Context } from "../../Contexts/loginStatus";
import "./style.css";

export default function Song({ song, remove, skip, dispatch }) {
  const loginStatus = useContext(Context);
  return (
    <div>
      <li>
        <p>{song}</p>
        {loginStatus && (
          <>
            <button onClick={() => skip(dispatch, song)}>>></button>
            <button onClick={() => remove(dispatch, song)}>X</button>
          </>
        )}
      </li>
      <hr />
    </div>
  );
}
