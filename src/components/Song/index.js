import React, { useContext, useCallback } from "react";
import { Context } from "../../Contexts/loginStatus";
import "./style.css";

export default React.memo(function Song({ name, id, remove, skip }) {
  const loginStatus = useContext(Context);
  const onRemove = useCallback(() => remove(id), [id, remove]);
  const onSkip = useCallback(() => skip(id), [id, skip]);
  return (
    <div className="Song">
      <li>
        <p>{name}</p>
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
