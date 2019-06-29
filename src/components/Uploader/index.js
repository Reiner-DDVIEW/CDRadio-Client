import React, { useReducer, useEffect } from "react";
import Uploadform from "../Uploadform/";
import axios from "axios";
import "./style.css";

export const checkUploadRights = async function({ allowed }, dispatch) {
  try {
    const res = await axios("/allowed");
    if (res.status !== 200) return;
    if (allowed !== res.data.upload_allowed)
      dispatch({ type: "ALLOWED", payload: res.data.upload_allowed });
  } catch (err) {
    //Do nothing
  }
};

function onSelectionChange({ value }, dispatch) {
  dispatch({ type: "SELECTION", payload: value });
}

const initialState = {
  allowed: false,
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

  useEffect(() => {
    let interval;
    if (!state.allowed) {
      interval = setInterval(() => checkUploadRights(state, dispatch), 10000);
    }
    return () => {
      clearInterval(interval);
    };
  }, [state, dispatch]);
  useEffect(() => {
    checkUploadRights(state, dispatch);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="Uploader">
      <fieldset onChange={({ target }) => onSelectionChange(target, dispatch)}>
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
        checkRights={checkUploadRights}
      />
    </div>
  );
}
