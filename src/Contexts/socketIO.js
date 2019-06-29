import { createContext } from "react";
const socketIO = createContext();

export const Context = socketIO;
export const Provider = socketIO.Provider;
export const Consumer = socketIO.Consumer;
