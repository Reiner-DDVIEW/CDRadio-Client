import React, { useContext, useCallback, useMemo } from "react";
import { Context } from "../../Contexts/loginStatus";
import "./style.css";

//TODO: Remove after the server sends an object with id,time, and name for the songs
function extractTime(name) {
  const index = name.lastIndexOf("(");
  return { displayname: name.slice(0, index), time: name.slice(index) };
}

export default React.memo(function Song({ name, id, remove, skip }) {
  const loginStatus = useContext(Context);
  const onRemove = useCallback(() => remove(id), [id, remove]);
  const onSkip = useCallback(() => skip(id), [id, skip]);
  const { displayname, time } = useMemo(() => extractTime(name), [name]);
  return (
    <div className="Song">
      <li>
        <p title={displayname}>{displayname}</p>
        <span>{time}</span>
        {loginStatus.authkey && loginStatus.visible && (
          <>
            <button onClick={onSkip}>>></button>
            <button onClick={onRemove}>X</button>
          </>
        )}
      </li>
      <hr />
    </div>
  );
});
