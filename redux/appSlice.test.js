import appReducer, {
  setCurrentSearch,
  setLatestSearch,
  setIsGlobalLoading,
  setSearchedUsers,
} from "@/redux/features/app";

const initialState = {
  currentSearch: "",
  latestSearch: "",
  isGlobalLoading: false,
  searchedUsers: [],
};

describe("app slice", () => {
  it("should handle initial state", () => {
    expect(appReducer(undefined, { type: "unknown" })).toEqual(initialState);
  });

  it("should handle setCurrentSearch", () => {
    const actual = appReducer(initialState, setCurrentSearch("testUser"));
    expect(actual.currentSearch).toEqual("testUser");
  });

  it("should handle setLatestSearch", () => {
    const actual = appReducer(initialState, setLatestSearch("testUser"));
    expect(actual.latestSearch).toEqual("testUser");
  });

  it("should handle setIsGlobalLoading", () => {
    const actual = appReducer(initialState, setIsGlobalLoading(true));
    expect(actual.isGlobalLoading).toEqual(true);
  });

  it("should handle setSearchedUsers", () => {
    const users = [{ id: 1, login: "testUser" }];
    const actual = appReducer(initialState, setSearchedUsers(users));
    expect(actual.searchedUsers).toEqual(users);
  });
});
