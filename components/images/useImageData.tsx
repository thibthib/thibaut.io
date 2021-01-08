import * as React from "react";
import type { ImageDataMap } from "./processImages";

export const ImagesContext = React.createContext<ImageDataMap>({});

export const useImageData = (name: string) => {
  const images = React.useContext(ImagesContext);
  return name in images ? images[name] : null;
};
