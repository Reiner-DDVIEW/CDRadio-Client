import React, { useState } from "react";
import { checkUploadRights } from "../Uploader/";
import axios from "axios";
import("./style.css");

async function upload(url, data, dispatch, setpercentage) {
  dispatch({ type: "STARTUPLOAD" });
  const config = {
    onUploadProgress: e => {
      setpercentage(Math.round((e.loaded * 100) / e.total));
    }
  };
  try {
    const res = await axios.post(url, data, config);
    if (res.status !== 200) {
      alert("Upload error: " + res.status);
    } else if (!res.data.upload) alert(res.data.reason);
    checkUploadRights({ allowed: true }, dispatch);
  } catch (err) {
    if (err.response) alert("Upload error: " + err.response.status);
  }
  dispatch({ type: "ENDUPLOAD" });
}

function onYoutubeSubmit(e, dispatch, setpercentage) {
  e.preventDefault();
  const url = "/youtube";
  const data = { link: e.target.link.value };
  upload(url, data, dispatch, setpercentage);
  e.target.reset();
}

function onFileSubmit(e, dispatch, setpercentage) {
  e.preventDefault();
  const url = "/upload";
  const data = new FormData();
  data.append("file", e.target.file.files[0]);
  upload(url, data, dispatch, setpercentage);
  e.target.reset();
}

export default function({ state, dispatch }) {
  const { allowed, selection, uploading } = state;
  const [percentage, setpercentage] = useState(0);
  let chosenForm;
  switch (selection) {
    case "file": {
      chosenForm = (
        <form onSubmit={e => onFileSubmit(e, dispatch, setpercentage)}>
          <input name="file" type="file" />
          <button type="submit" disabled={!allowed || uploading}>
            Submit
          </button>
        </form>
      );
      break;
    }
    case "youtube": {
      chosenForm = (
        <form onSubmit={e => onYoutubeSubmit(e, dispatch, setpercentage)}>
          <input name="link" type="text" />
          <button type="submit" disabled={!allowed || uploading}>
            Submit
          </button>
        </form>
      );
      break;
    }
    default: {
      return <p>Placeholder</p>;
    }
  }
  return (
    <>
      {chosenForm}
      <progress
        max="100"
        value={percentage}
        style={uploading ? {} : { visibility: "hidden" }}
      />
    </>
  );
}
