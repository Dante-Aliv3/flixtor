import React, { useState } from "react";
import { useEffect } from "react";
import "./App.css";
import "./assets/css/global.css";
// import { NowPlayingContainer } from "./pageContainers";

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
    <BrowserRouter>
      <Routes>
        <Route path="/*" element={<PageLayout />}></Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
