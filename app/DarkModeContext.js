import { createContext, useContext } from "react";
export const DarkModeContext = createContext();

export function useDarkMode() {
  return useContext(DarkModeContext);
}