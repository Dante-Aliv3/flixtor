import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
const NotFound: React.FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    setTimeout(() => {
      //  Redirect user back to home
      navigate("/");
    }, 2500);
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
};

export default NotFound;
