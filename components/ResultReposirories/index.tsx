import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { TRepositories } from "@/types";
import { px2dp } from "@/utils/px2dp";
import { Colors } from "@/constants/Colors";
import { Strings } from "@/constants/Strings";

interface IProps {
  repositories: TRepositories[];
}

const ResultRepositories = ({ repositories }: IProps) => {
  const { USER_DONT_HAVE_REPOSITORIES, NO_DESCRIPTION } = Strings;

  if (repositories.length === 0) {
    return <Text style={styles.empty}>{USER_DONT_HAVE_REPOSITORIES}</Text>;
  }

  return (
    <View>
      {repositories.map((repo, index) => (
        <View
          key={repo.id}
          style={[
            styles.contentInner,
            index === repositories.length - 1 && styles.lastItemMargin,
          ]}
        >
          <View style={styles.containerInfo}>
            <Text style={styles.titleRepo} numberOfLines={2}>
              <Text style={styles.labelInfo}>Repo:</Text> {repo.name}
            </Text>
            <Text style={styles.description} numberOfLines={2}>
              <Text style={styles.labelInfo}>Desc:</Text>{" "}
              {repo.description || NO_DESCRIPTION}
            </Text>
          </View>
          <Text style={styles.starCount}>{`⭐ ${repo.stargazers_count}`}</Text>
        </View>
      ))}
    </View>
  );
};

export default ResultRepositories;

const styles = StyleSheet.create({
  containerInfo: {
    flex: 1,
    paddingRight: px2dp(6),
  },
  contentInner: {
    paddingHorizontal: px2dp(15),
    paddingBottom: px2dp(10),
    borderLeftWidth: px2dp(6),
    borderColor: "#304f20",
    paddingVertical: px2dp(12),
    flexDirection: "row",
    width: "100%",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: Colors.backgroundItems,
    borderTopRightRadius: px2dp(8),
    borderBottomRightRadius: px2dp(8),
    marginBottom: px2dp(12),
  },
  description: {
    fontSize: px2dp(14),
    color: Colors.text,
    fontWeight: "400",
  },
  starCount: {
    fontSize: px2dp(14),
    marginTop: px2dp(5),
  },
  titleRepo: {
    fontSize: px2dp(14),
    color: Colors.text,
    fontWeight: "400",
  },
  labelInfo: {
    fontSize: px2dp(14),
    fontWeight: "700",
    color: Colors.text,
  },
  empty: {
    textAlign: "left",
    marginBottom: px2dp(20),
    paddingLeft: px2dp(6),
    color: Colors.text, // Adding color to empty state text
  },
  lastItemMargin: {
    marginBottom: px2dp(30),
  },
});
