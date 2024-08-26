export const Strings = {
  SEARCH: "Search",
  ENTER_USERNAME: "Enter username",
  SHOWING_USERS_RESULTS: (username: string) =>
    `Showing users for "${username}"`,
  SEARCHING_USERS: (username: string) =>
    `Looking for users with keyword:"${username}"`,
  USER_DONT_HAVE_REPOSITORIES: "User don't have any repositories",
  NO_DESCRIPTION: "No description",
  NO_RESULTS_FOUND: "No results found.",
  FAILED_TO_LOAD_REPOSITORIES: "Failed to load repositories. Please try again.",
  REPO: "Repo:",
  DESC: "Desc:",
  USERNAME: "Username:",
  RETRY: "Retry",
};
