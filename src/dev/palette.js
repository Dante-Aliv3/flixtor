import * as React from "react";
import { Fragment } from "react";
import { Category, Component, Variant, Palette, } from "@react-buddy/ide-toolbox";
export const PaletteTree = () => (React.createElement(Palette, null,
    React.createElement(Category, { name: "App" },
        React.createElement(Component, { name: "Loader" },
            React.createElement(Variant, null,
                React.createElement(ExampleLoaderComponent, null))))));
export function ExampleLoaderComponent() {
    return React.createElement(Fragment, null, "Loading...");
}
