import {
  FIGMA_HEIGHT,
  FIGMA_WIDTH,
  WINDOW_HEIGHT,
  WINDOW_WIDTH,
} from "../constants";

const create = (designSize: { width: number; height: number }) => {
  const height = WINDOW_HEIGHT,
    width = WINDOW_WIDTH;
  const CURRENT_RESOLUTION = Math.sqrt(height * height + width * width);
  if (!designSize || !designSize.width || !designSize.height) {
    throw new Error(
      "react-native-pixel-perfect | create function | Invalid design size object! " +
        "must have width and height fields of type Number."
    );
  }
  const DESIGN_RESOLUTION = Math.sqrt(
    designSize.height * designSize.height + designSize.width * designSize.width
  );
  const RESOLUTIONS_PROPORTION = CURRENT_RESOLUTION / DESIGN_RESOLUTION;
  return (size: number) => RESOLUTIONS_PROPORTION * size;
};

export const px2dp = (pixels: number) => {
  const designResolution = {
    width: FIGMA_WIDTH,
    height: FIGMA_HEIGHT,
  };
  return create(designResolution)(pixels);
};
