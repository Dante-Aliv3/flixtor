import * as React from "react";
import { ComponentPreview, Previews } from "@react-buddy/ide-toolbox";
// @ts-ignore
import { PaletteTree } from "./palette.tsx";
import MoviesPage from "../pages/MoviesPage";
const ComponentPreviews = () => {
    return React.createElement(Previews, { palette: React.createElement(PaletteTree, null) },
        React.createElement(ComponentPreview, { path: "/MoviesPage" },
            React.createElement(MoviesPage, null)));
};
export default ComponentPreviews;
