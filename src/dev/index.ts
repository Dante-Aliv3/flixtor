import * as React from "react";
// @ts-ignore
import { useInitial } from "./useInitial.ts";

// @ts-ignore
const ComponentPreviews = React.lazy(() => import("./previews.tsx"));

export { ComponentPreviews, useInitial };
