import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
export default function NotFound() {
    const navigate = useNavigate();
    useEffect(() => {
        setTimeout(() => {
            //  Redirect user back to home
            navigate("/");
        }, 2500);
    }, []);
    return (React.createElement(React.Fragment, null,
        React.createElement("link", { rel: "stylesheet", type: "text/css", href: "/css/wormhole.css" }),
        React.createElement("div", { style: {
                width: "100vw",
                display: "flex",
                height: "100vh",
                justifyContent: "center",
                alignItems: "center",
                fontSize: "xxx-large",
            } }, "You blew it up"),
        React.createElement("div", { className: "polygon" },
            React.createElement("div", { className: "side" }),
            React.createElement("div", { className: "side" }),
            React.createElement("div", { className: "side" }),
            React.createElement("div", { className: "side" }),
            React.createElement("div", { className: "side" }),
            React.createElement("div", { className: "side" }),
            React.createElement("div", { className: "side" }),
            React.createElement("div", { className: "side" }),
            React.createElement("div", { className: "side" }),
            React.createElement("div", { className: "side" }),
            React.createElement("div", { className: "side" }),
            React.createElement("div", { className: "side" }),
            React.createElement("div", { className: "side" }),
            React.createElement("div", { className: "side" }),
            React.createElement("div", { className: "side" }),
            React.createElement("div", { className: "side" }))));
}
