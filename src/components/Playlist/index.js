import React, { useEffect, useReducer } from "react";
import axios from "axios";
import Song from "../Song/";
import "./style.css";

function playlistReducer(state, action) {
  switch (action.type) {
    case "SET": {
      return action.payload;
    }
    case "REMOVE": {
      return state.filter(song => song !== action.payload);
    }
    default: {
      return state;
    }
  }
}

export default function Playlist() {
  const [state, dispatch] = useReducer(playlistReducer, []);

  async function loadPlaylist() {
    try {
      const res = await axios.get("/playlist");
      if (res.status === 200)
        dispatch({ type: "SET", payload: res.data.reverse() });
    } catch (err) {
      //Do nothing
    }
  }

  async function skipSong(id) {
    // const res = await axios.post("/auth/skipSong/", id);
    // if(res.status === 200)
    dispatch({ type: "REMOVE", payload: id });
    alert("skipped Song: " + id);
  }

  async function removeSong(id) {
    // const res = await axios.post("/auth/removeSong/", id);
    // if(res.status === 200)
    dispatch({ type: "REMOVE", payload: id });
    alert("deleted Song: " + id);
  }

  useEffect(() => {
    loadPlaylist();
    const interval = setInterval(() => loadPlaylist(), 15000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <div id="Playlist">
      {state.map(song => {
        return (
          <Song key={song} song={song} skip={skipSong} remove={removeSong} />
        );
      })}
    </div>
  );
}
