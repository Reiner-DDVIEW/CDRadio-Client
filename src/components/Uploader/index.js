import React, { useReducer, useEffect, useCallback } from "react";
import Uploadform from "../Uploadform/";
import axios from "axios";
import "./style.css";

const initialState = {
  allowed: true,
  selection: "file",
  uploading: false
};

function uploaderReducer(state, action) {
  switch (action.type) {
    case "STARTUPLOAD": {
      return { ...state, uploading: true };
    }
    case "ENDUPLOAD": {
      return { ...state, uploading: false };
    }
    case "SELECTION": {
      return { ...state, selection: action.payload };
    }
    case "ALLOWED": {
      return { ...state, allowed: action.payload };
    }
    default: {
      return state;
    }
  }
}

export default function Uploader() {
  const [state, dispatch] = useReducer(uploaderReducer, initialState);

  const checkUploadRights = useCallback(async () => {
    try {
      const res = await axios("/allowed");
      if (res.status !== 200) return;
      if (state.allowed !== res.data.upload_allowed)
        dispatch({ type: "ALLOWED", payload: res.data.upload_allowed });
    } catch (err) {
      //Do nothing
    }
  }, [state.allowed]);

  useEffect(() => {
    let interval;
    if (!state.allowed) {
      interval = setInterval(() => checkUploadRights(), 10000);
    }
    return () => {
      clearInterval(interval);
    };
  }, [checkUploadRights, state.allowed]);

  useEffect(() => {
    checkUploadRights();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function onSelectionChange({ value }) {
    dispatch({ type: "SELECTION", payload: value });
  }

  return (
    <div className="Uploader">
      <fieldset onChange={({ target }) => onSelectionChange(target)}>
        <label>
          <input
            type="radio"
            name="form"
            value="file"
            checked={state.selection === "file"}
            readOnly
          />
          Files
        </label>
        <label>
          <input
            type="radio"
            name="form"
            value="youtube"
            checked={state.selection === "youtube"}
            readOnly
          />
          Youtube
        </label>
        {!state.allowed && (
          <p className="uploadWarning">You are currently unable to upload.</p>
        )}
      </fieldset>
      <Uploadform
        state={state}
        dispatch={dispatch}
        checkUploadRights={checkUploadRights}
      />
    </div>
  );
}
