import * as React from "react";
import {ComponentPreview, Previews} from "@react-buddy/ide-toolbox";
// @ts-ignore
import { PaletteTree } from "./palette.tsx";
import { createFactory } from "react";
import MoviesPage from "../pages/MoviesPage";

const ComponentPreviews = () => {
  return <Previews palette={<PaletteTree />}>
      <ComponentPreview path="/MoviesPage">
          <MoviesPage/>
      </ComponentPreview>
  </Previews>;
};

export default ComponentPreviews