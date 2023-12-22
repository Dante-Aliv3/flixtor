"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useInitial = void 0;
const react_1 = require("react");
const useInitial = () => {
    const [status, setStatus] = (0, react_1.useState)({
        loading: false,
        error: false,
    });
    return status;
};
exports.useInitial = useInitial;
//# sourceMappingURL=useInitial.js.map