import axios, { AxiosResponse } from "axios";

const BASE_URL = "https://api.github.com";

// Create an Axios instance for base configuration
const api = axios.create({
  baseURL: BASE_URL,
});

// Utility function to handle API requests and errors
const handleRequest = async <T>(
  request: Promise<AxiosResponse<T>>
): Promise<T> => {
  try {
    const response = await request;
    return response.data;
  } catch (error: unknown) {
    console.error("API request error:", error);
    throw new Error(
      axios.isAxiosError(error)
        ? error.response?.data?.message || error.message
        : "An unexpected error occurred."
    );
  }
};

// Function to search users by username
export const searchUsers = async (username: string) => {
  return handleRequest(
    api.get("/search/users", {
      params: {
        q: username,
        per_page: 5,
      },
    })
  );
};

// Function to get repositories of a specific user
export const getUserRepositories = async (username: string) => {
  return handleRequest(api.get(`/users/${username}/repos`));
};
