import React, { useState, useEffect } from "react";
import "./App.css";
import "./assets/css/global.css"; // Tell webpack that App.js uses these styles
import { SessionProvider } from "./context/session.context";
import "./assets/css/deleteme.styles.scss";
//import ReactLogo from "./assets/images/logo.svg";

import PageLayout from "./pageLayouts";
import { BrowserRouter, Route, Routes } from "react-router-dom";

var origConsoleDebug = null;
if (document.readyState == "interactive") {
  if (origConsoleDebug == null) {
    origConsoleDebug = console.debug;
    window["console"]["debug"] = function () {};
  }
}

const App = () => {
  return (
    <SessionProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/*" element={<PageLayout />}></Route>
        </Routes>
      </BrowserRouter>
    </SessionProvider>
  );
};

export default App;
