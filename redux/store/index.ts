import { configureStore } from "@reduxjs/toolkit";

import app from "../features/app";

export const store = configureStore({
  reducer: { app },
});
