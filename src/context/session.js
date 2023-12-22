"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SessionProvider = exports.SessionContext = void 0;
const react_1 = require("react");
function getInitialState() {
    let selectedOption = sessionStorage.getItem('darkmode') || true;
    if (typeof selectedOption !== "boolean") {
        selectedOption = (selectedOption === 'true');
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
        darkmode: selectedOption
    };
}
exports.SessionContext = (0, react_1.createContext)(null);
function SessionProvider({ children }) {
    const [sessionData, setSessionData] = (0, react_1.useState)(getInitialState());
    return (React.createElement(exports.SessionContext.Provider, { value: { sessionData, setSessionData } }, children));
}
exports.SessionProvider = SessionProvider;
//# sourceMappingURL=session.js.map