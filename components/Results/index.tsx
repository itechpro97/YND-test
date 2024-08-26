import React, { useCallback } from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";
import { useSelector } from "react-redux";

import { Colors } from "@/constants/Colors";
import { px2dp } from "@/utils/px2dp";
import { Strings } from "@/constants/Strings";
import ResultItem from "../ResultItem";
import {
  selectIsGlobalLoading,
  selectLatestSearch,
  selectSearchedUsers,
} from "@/redux/features/app";
import { TUser } from "@/types";

const Results = () => {
  const { SHOWING_USERS_RESULTS, SEARCHING_USERS, NO_RESULTS_FOUND } = Strings;

  const searchedKeyword = useSelector(selectLatestSearch);
  const searchedUsers: TUser[] = useSelector(selectSearchedUsers);
  const isLoading = useSelector(selectIsGlobalLoading);

  const renderItem = useCallback(
    ({ item, index }: { item: TUser; index: number }) => (
      <ResultItem
        title={item.login}
        isLastItem={index === searchedUsers.length - 1}
      />
    ),
    [searchedUsers]
  );

  const ListHeaderComponent = useCallback(
    () => (
      <View style={styles.titleContainer}>
        <Text style={styles.title}>
          {isLoading
            ? SEARCHING_USERS(searchedKeyword)
            : SHOWING_USERS_RESULTS(searchedKeyword)}
        </Text>
      </View>
    ),
    [searchedKeyword, isLoading]
  );

  if (!searchedUsers?.length && !!searchedKeyword && !isLoading) {
    return (
      <View style={styles.container}>
        <Text>{NO_RESULTS_FOUND}</Text>
      </View>
    );
  }

  if (!searchedUsers?.length) {
    return null;
  }

  return (
    <FlatList
      data={searchedUsers}
      renderItem={renderItem}
      keyExtractor={(item) => item.id.toString()}
      contentContainerStyle={styles.container}
      ListHeaderComponent={ListHeaderComponent}
    />
  );
};

export default Results;

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.backgroundLight,
    marginTop: px2dp(15),
    borderRadius: px2dp(8),
    paddingHorizontal: px2dp(8),
    paddingVertical: px2dp(12),
  },
  title: {
    fontWeight: "500",
    fontSize: px2dp(18),
    color: Colors.text,
    marginBottom: px2dp(10),
    textAlign: "left",
  },
  titleContainer: {
    backgroundColor: Colors.backgroundLight,
    paddingHorizontal: px2dp(8),
    borderRadius: px2dp(4),
    paddingBottom: px2dp(30),
    transform: [{ translateY: 25 }],
  },
  placeholderContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.backgroundLight,
  },
  placeholderText: {
    fontSize: px2dp(16),
    color: Colors.text,
    textAlign: "center",
  },
  empty: {
    backgroundColor: Colors.backgroundLight,
  },
});
