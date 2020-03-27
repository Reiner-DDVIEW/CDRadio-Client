import React, { useState } from "react";
import axios from "axios";
import"./style.css";

export default function({ state, dispatch, checkUploadRights }) {
  const { allowed, selection, uploading } = state;
  const [percentage, setpercentage] = useState(0);

  async function upload(url, data) {
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
    setpercentage(0);
    dispatch({ type: "ENDUPLOAD" });
  }

  function onYoutubeSubmit(e) {
    e.preventDefault();
    const url = "/youtube";
    const data = { link: e.target.link.value };
    upload(url, data);
    e.target.reset();
  }

  function onFileSubmit(e) {
    e.preventDefault();
    const url = "/upload";
    const data = new FormData();
    data.append("file", e.target.file.files[0]);
    upload(url, data);
    e.target.reset();
  }

  let chosenForm;
  switch (selection) {
    case "file": {
      chosenForm = (
        <form onSubmit={e => onFileSubmit(e)}>
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
        <form onSubmit={e => onYoutubeSubmit(e)}>
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
