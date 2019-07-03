import React, { useContext } from "react";
import { Context } from "../../Contexts/loginStatus";
import "./style.css";

export default function Song({ song, remove, skip }) {
  const { id, name } = song;
  const loginStatus = useContext(Context);
  return (
    <div className="Song">
      <li>
        <p>{name}</p>
        {loginStatus.authkey && loginStatus.visible && (
          <>
            <button onClick={() => skip(id)}>>></button>
            <button onClick={() => remove(id)}>X</button>
          </>
        )}
      </li>
      <hr />
    </div>
  );
}
