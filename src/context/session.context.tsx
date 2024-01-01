import * as React from "react";
import { createContext, useState } from "react";
import { ChildProps } from "../utils/types/react.types.ts";

export type sessionDataType = {
  api: { apiKey: string; apiUrl: string };
  darkmode: boolean;
  [key: string]: any;
};

export interface SessionContent {
  sessionData: sessionDataType;
  [others: string]: any;
}
const getInitialState = (): sessionDataType => {
  let selectedOption = sessionStorage.getItem("darkmode") || true;
  if (typeof selectedOption !== "boolean") {
    selectedOption = selectedOption === "true";
  }

  return {
    currentPage: window.location.pathname,
    search: {
      term: "",
      type: "",
      page: 1,
      totalPages: 1,
      totalResults: 0,
    },
    api: {
      apiKey: "db1a3d4fc9949395b6300a619305310d",
      apiUrl: "https://api.themoviedb.org/3/",
    },
    darkmode: selectedOption,
  };
};
// Create context
export const SessionContext = createContext<SessionContent>({
  sessionData: { api: { apiKey: "", apiUrl: "" }, darkmode: false },
  setSessionData: () => {},
});

export const SessionProvider: React.FC<ChildProps> = ({ children }) => {
  const [sessionData, setSessionData] = useState<sessionDataType>(
    getInitialState(),
  );
  //console.log(sessionData);

  return (
    <SessionContext.Provider
      value={{
        sessionData,
        setSessionData,
      }}
    >
      {children}
    </SessionContext.Provider>
  );
};

export default SessionProvider;
