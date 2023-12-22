"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MainLayout = void 0;
const react_router_dom_1 = require("react-router-dom");
const React = __importStar(require("react"));
const react_1 = require("react");
const routes_1 = require("../routes");
const react_2 = require("@headlessui/react");
const session_1 = require("../context/session");
function MainLayout({ children }) {
    const { sessionData, setSessionData } = (0, react_1.useContext)(session_1.SessionContext);
    const [showSlideOver, setshowSlideOver] = (0, react_1.useState)(false);
    const slideOverId = (0, react_1.useId)();
    function toggleDarkMode() {
        setSessionData((prevState) => {
            return Object.assign(Object.assign({}, prevState), { darkmode: !prevState.darkmode });
        });
    }
    (0, react_1.useEffect)(() => {
        sessionStorage.setItem('darkmode', sessionData.darkmode);
    }, [sessionData]);
    return (React.createElement(React.Fragment, null,
        React.createElement("div", { className: "w-screen h-screen flex items-center justify-center" },
            React.createElement("div", { id: "slideover-container", className: "w-full h-full inset-0" },
                React.createElement("div", { id: `slideover-bg-${slideOverId}`, className: "w-full h-full duration-500 ease-out transition-all inset-0 absolute" },
                    React.createElement("header", { className: "main-header", style: !sessionData.darkmode ? { background: '#134e4a' } : null },
                        React.createElement("div", { className: "container" },
                            React.createElement("div", { className: "logo" },
                                React.createElement(react_router_dom_1.Link, { to: "/" }, "FLIXTOR.ID")),
                            React.createElement(react_2.Switch, { checked: sessionData.darkmode, onChange: toggleDarkMode, className: `${sessionData.darkmode ? 'bg-teal-900' : 'bg-teal-700'} relative inline-flex h-6 w-11 items-center rounded-full` },
                                React.createElement("span", { className: "sr-only" }, "Use setting"),
                                React.createElement("span", { className: `${sessionData.darkmode ? 'translate-x-6' : 'translate-x-1'} inline-block h-4 w-4 transform rounded-full bg-white transition` })),
                            React.createElement("div", { onClick: () => { setshowSlideOver(!showSlideOver); }, className: "cursor-pointer px-5 py-2 text-sm border text-white hover:text-black  hover:bg-gray-100 rounded border-gray-300" }, "Toggle Slide-over"),
                            React.createElement("nav", null,
                                React.createElement("ul", null,
                                    React.createElement("li", null,
                                        React.createElement(react_router_dom_1.Link, { className: "nav-link", to: "/movies" }, "Movies")),
                                    React.createElement("li", null,
                                        React.createElement(react_router_dom_1.Link, { className: "nav-link", to: "/shows" }, "TV Shows")))))),
                    children,
                    React.createElement("footer", { className: "main-footer", style: !sessionData.darkmode ? { background: '#134e4a' } : null },
                        React.createElement("div", { className: "container" },
                            React.createElement("div", { className: "logo" },
                                React.createElement("span", null, "FLIXTOR.ID")),
                            React.createElement("div", { className: "social-links" },
                                React.createElement("a", { href: "https://www.facebook.com", target: "_blank" },
                                    React.createElement("i", { className: "fab fa-facebook-f" })),
                                React.createElement("a", { href: "https://www.twitter.com", target: "_blank" },
                                    React.createElement("i", { className: "fab fa-twitter" })),
                                React.createElement("a", { href: "https://www.instagram.com", target: "_blank" },
                                    React.createElement("i", { className: "fab fa-instagram" }))))),
                    React.createElement("div", { className: "spinner" })),
                React.createElement("div", { id: `slideover-${slideOverId}`, className: `w-2/5 bg-white h-full absolute right-0 duration-300 ease-out transition-all z-[100] ${showSlideOver ? '' : 'translate-x-full'}` },
                    React.createElement("div", { className: "absolute cursor-pointer text-gray-600 top-0 w-8 h-8 flex items-center justify-center right-0 mt-5 mr-5" },
                        React.createElement("svg", { className: "w-6 h-6", onClick: () => { setshowSlideOver(!showSlideOver); }, fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", xmlns: "http://www.w3.org/2000/svg" },
                            React.createElement("path", { "stroke-linecap": "round", "stroke-linejoin": "round", "stroke-width": "2", d: "M6 18L18 6M6 6l12 12" }))))))));
}
exports.MainLayout = MainLayout;
function PageContainer(props) {
    return (React.createElement(React.Fragment, null,
        React.createElement(react_router_dom_1.Routes, null,
            React.createElement(react_router_dom_1.Route, { path: "/*", element: React.createElement(MainLayout, null,
                    React.createElement(routes_1.LayoutRoutes, null)) }))));
}
exports.default = PageContainer;
//# sourceMappingURL=index.js.map