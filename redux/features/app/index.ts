import { TUser } from "@/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AppState {
  currentSearch: string;
  latestSearch: string;
  isGlobalLoading: boolean;
  searchedUsers: TUser[];
}

// Initial State
const initialState: AppState = {
  currentSearch: "",
  latestSearch: "",
  isGlobalLoading: false,
  searchedUsers: [],
};

export const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    setCurrentSearch: (state, action: PayloadAction<string>) => {
      state.currentSearch = action.payload;
    },
    setLatestSearch: (state, action: PayloadAction<string>) => {
      state.latestSearch = action.payload;
    },
    setIsGlobalLoading: (state, action: PayloadAction<boolean>) => {
      state.isGlobalLoading = action.payload;
    },
    setSearchedUsers: (state, action: PayloadAction<TUser[]>) => {
      state.searchedUsers = action.payload;
    },
  },
});

// Selectors
export const selectCurrentSearch = (state: { app: AppState }) =>
  state.app.currentSearch;
export const selectIsGlobalLoading = (state: { app: AppState }) =>
  state.app.isGlobalLoading;
export const selectSearchedUsers = (state: { app: AppState }) =>
  state.app.searchedUsers;
export const selectLatestSearch = (state: { app: AppState }) =>
  state.app.latestSearch;

// Actions
export const {
  setCurrentSearch,
  setIsGlobalLoading,
  setSearchedUsers,
  setLatestSearch,
} = appSlice.actions;

export default appSlice.reducer;
