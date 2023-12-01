import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
export default function NotFound() {
  const navigate = useNavigate();

  useEffect(() => {
    setTimeout(() => {
      navigate("/");
    }, 1500);
  }, []);

  return (
    <>
      <link rel="stylesheet" type="text/css" href="/css/wormhole.css" />
      <div
        style={{
          width: "100vw",
          display: "flex",
          height: "100vh",
          justifyContent: "center",
          alignItems: "center",
          fontSize: "xxx-large",
        }}
      >
        You blew it up
      </div>
      <div className="polygon">
        <div className="side"></div>
        <div className="side"></div>
        <div className="side"></div>
        <div className="side"></div>
        <div className="side"></div>
        <div className="side"></div>
        <div className="side"></div>
        <div className="side"></div>
        <div className="side"></div>
        <div className="side"></div>
        <div className="side"></div>
        <div className="side"></div>
        <div className="side"></div>
        <div className="side"></div>
        <div className="side"></div>
        <div className="side"></div>
      </div>
    </>
  );
}
