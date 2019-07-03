import React, { useEffect, useReducer, useContext } from "react";
import axios from "axios";
import Song from "../Song/";
import { Context as loginContext } from "../../Contexts/loginStatus";
import { Context as socketContext } from "../../Contexts/socketIO";
import "./style.css";

function playlistReducer(state, action) {
  switch (action.type) {
    case "SET": {
      return action.payload;
    }
    case "REMOVE": {
      return state.filter(song => song.id !== action.payload);
    }
    default: {
      return state;
    }
  }
}

//TODO: Switch songs on server to some kind of {id, name} object.
export default function Playlist() {
  const [state, dispatch] = useReducer(playlistReducer, []);
  const loginStatus = useContext(loginContext);
  const socket = useContext(socketContext);

  //TODO: Switch to loading the playlist only on signal from the socket and on initial load.
  //possible:
  // socket.on('playlist', loadPlaylist);
  // and removal of the interval further down
  //other possibility, socket sends the playlist with the message:
  // socket.on("playlist", data => {
  //   dispatch({ type: "SET", payload: data.reverse() });
  // });
  // Initial load still with axios, afterwards on signal, maybe send a 'playlist' event to server on connect
  async function loadPlaylist() {
    try {
      const res = await axios.get("/playlist");
      if (res.status === 200)
        dispatch({
          type: "SET",
          payload: res.data.reverse().map(song => {
            return {
              id: song.id ? song.id : song,
              name: song.name ? song.name : song
            };
          })
        });
    } catch (err) {
      //Do nothing
    }
  }

  async function skipSong(id) {
    //TODO:
    // socket.emit("skip", { id, authkey: loginStatus.authkey }, (response) => {
    //   if(response.status === 'done')
    //   dispatch({ type: "REMOVE", payload: id });
    //   alert("skipped Song: " + id);
    // });
    dispatch({ type: "REMOVE", payload: id });
    alert("skipped Song: " + id);
  }

  async function removeSong(id) {
    //TODO:
    // socket.emit("remove", { id, authkey: loginStatus.authkey }, (response) => {
    //   if(response.status === 'done')
    //   dispatch({ type: "REMOVE", payload: id });
    //   alert("deleted Song: " + id);
    // });
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
          <Song key={song.id} song={song} skip={skipSong} remove={removeSong} />
        );
      })}
    </div>
  );
}
