import * as React from "react";
import { Previews } from "@react-buddy/ide-toolbox";
// @ts-ignore
import { PaletteTree } from "./palette.tsx";
import { createFactory } from "react";

const ComponentPreviews = () => {
  return <Previews palette={<PaletteTree />}></Previews>;
};

export default ComponentPreviews