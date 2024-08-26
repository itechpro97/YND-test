import React from "react";
import { View, TextInput, StyleSheet } from "react-native";
import { useSearch } from "@/hooks/useSearch";
import Button from "../Button";
import { px2dp } from "@/utils/px2dp";
import { Colors } from "@/constants/Colors";
import { Strings } from "@/constants/Strings";

const SearchBar = () => {
  const { SEARCH, ENTER_USERNAME } = Strings;
  const { value, loading, handleChangeText, searchUsername } = useSearch();

  return (
    <View style={styles.container}>
      <TextInput
        value={value}
        placeholder={ENTER_USERNAME}
        placeholderTextColor={Colors.inputPlaceholder}
        style={styles.input}
        onChangeText={handleChangeText}
        editable={!loading}
      />
      <Button
        label={SEARCH}
        onPress={searchUsername}
        loading={loading}
        disabled={loading || !value?.trim()}
      />
    </View>
  );
};

export default SearchBar;

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    marginTop: px2dp(18),
  },
  input: {
    paddingHorizontal: px2dp(12),
    color: Colors.text,
    width: "100%",
    height: px2dp(60),
    borderRadius: px2dp(8),
    backgroundColor: Colors.backgroundSearch,
    shadowColor: Colors.shadowColor,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
    marginBottom: px2dp(8),
  },
});
