import React, { useEffect, useReducer } from "react";
import axios from "axios";
import Song from "../Song/";
import "./style.css";

async function loadPlaylist(dispatch) {
  try {
    const res = await axios.get("/playlist");
    if (res.status === 200)
      dispatch({ type: "SET", payload: res.data.reverse() });
  } catch (err) {
    //Do nothing
  }
}

async function skipSong(dispatch, id) {
  // const res = await axios.post("/auth/skipSong/", id);
  // if(res.status === 200)
  dispatch({ type: "REMOVE", payload: id });
  alert("skipped Song: " + id);
}

async function removeSong(dispatch, id) {
  // const res = await axios.post("/auth/removeSong/", id);
  // if(res.status === 200)
  dispatch({ type: "REMOVE", payload: id });
  alert("deleted Song: " + id);
}

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

  useEffect(() => {
    loadPlaylist(dispatch);
    const interval = setInterval(() => loadPlaylist(dispatch), 15000);

    return () => {
      clearInterval(interval);
    };
  }, [dispatch]);
  return (
    <div id="Playlist">
      {state.map(song => {
        return (
          <Song
            key={song}
            song={song}
            skip={skipSong}
            remove={removeSong}
            dispatch={dispatch}
          />
        );
      })}
    </div>
  );
}
