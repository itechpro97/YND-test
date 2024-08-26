import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  selectCurrentSearch,
  setCurrentSearch,
  setIsGlobalLoading,
  setLatestSearch,
  setSearchedUsers,
} from "@/redux/features/app";
import { searchUsers } from "@/api/githubApi";

export const useSearch = () => {
  const dispatch = useDispatch();
  const value = useSelector(selectCurrentSearch);
  const [loading, setLoading] = useState(false);

  const handleChangeText = (text: string) => {
    dispatch(setCurrentSearch(text));
  };

  const searchUsername = async () => {
    if (!value?.trim()) return;

    dispatch(setLatestSearch(value));
    dispatch(setIsGlobalLoading(true));
    setLoading(true);

    try {
      const { items } = await searchUsers(value);
      dispatch(setSearchedUsers(items));
    } catch (error) {
      console.error("Failed to search users:", error);
    } finally {
      dispatch(setIsGlobalLoading(false));
      setLoading(false);
    }
  };

  return {
    value,
    loading,
    handleChangeText,
    searchUsername,
  };
};
