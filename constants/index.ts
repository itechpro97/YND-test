import { Dimensions } from "react-native";

export const { width: WINDOW_WIDTH, height: WINDOW_HEIGHT } =
  Dimensions.get("window");

export const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } =
  Dimensions.get("screen");

export const FIGMA_WIDTH = 360;
export const FIGMA_HEIGHT = 786;

export const DEFAULT_HEADER_SCREEN_OPTIONS = {
  headerShown: false,
};
