import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
} from "react-native";
import React, { useState, useRef, useEffect, useCallback } from "react";
import { px2dp } from "@/utils/px2dp";
import { Colors } from "@/constants/Colors";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";
import { chevron } from "@/constants/Images";
import { getUserRepositories } from "@/api/githubApi";
import { TRepositories } from "@/types";
import ResultRepositories from "../ResultReposirories";
import { Strings } from "@/constants/Strings";

interface IProps {
  title: string;
  isLastItem: boolean;
}

const ResultItem = ({ title, isLastItem }: IProps) => {
  const { FAILED_TO_LOAD_REPOSITORIES, USERNAME, RETRY } = Strings;

  const rotate = useSharedValue(0);
  const opacity = useSharedValue(0);
  const containerHeight = useSharedValue(0);

  const [expanded, setExpanded] = useState(false);
  const [repositories, setRepositories] = useState<TRepositories[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchRepositories = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const results = await getUserRepositories(title);
      setRepositories(results);
    } catch (error) {
      setError(FAILED_TO_LOAD_REPOSITORIES);
      Alert.alert("Error", FAILED_TO_LOAD_REPOSITORIES);
    } finally {
      setLoading(false);
    }
  }, [title]);

  useEffect(() => {
    rotate.value = withSpring(expanded ? 180 : 0, { damping: 4 });
    containerHeight.value = withSpring(
      expanded ? Math.max(repositories.length * 120, 100) : 0,
      { damping: 400 }
    );
    opacity.value = withSpring(expanded ? 1 : 0, { damping: 400 });
  }, [expanded, repositories.length]);

  const handleExpandToggle = useCallback(() => {
    setExpanded((prev) => !prev);
    if (!loading && repositories.length === 0) {
      fetchRepositories();
    }
  }, [loading, repositories.length]);

  const animatedIconStyle = useAnimatedStyle(() => ({
    transform: [{ rotate: `${rotate.value}deg` }],
  }));

  const animatedContainerStyle = useAnimatedStyle(() => ({
    maxHeight: containerHeight.value,
    opacity: opacity.value,
  }));

  return (
    <View
      style={[styles.itemContainer, isLastItem && { borderBottomWidth: 0 }]}
    >
      <TouchableOpacity onPress={handleExpandToggle} style={styles.header}>
        <Text style={styles.title} numberOfLines={2}>
          <Text style={styles.labelTitle}>{USERNAME}</Text> {title}
        </Text>
        <Animated.Image
          source={chevron}
          style={[styles.icon, animatedIconStyle]}
        />
      </TouchableOpacity>
      <Animated.View style={animatedContainerStyle}>
        {loading ? (
          <ActivityIndicator color={Colors.text} style={styles.loading} />
        ) : error ? (
          <TouchableOpacity
            onPress={fetchRepositories}
            style={styles.retryButton}
          >
            <Text style={styles.retryText}>{RETRY}</Text>
          </TouchableOpacity>
        ) : (
          <ResultRepositories repositories={repositories} />
        )}
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  itemContainer: {
    overflow: "hidden",
    marginVertical: px2dp(5),
    borderBottomWidth: px2dp(1),
    borderBottomColor: Colors.border,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: px2dp(10),
    paddingRight: px2dp(6),
  },
  title: {
    fontSize: px2dp(15),
    color: Colors.text,
    flex: 1,
    paddingRight: px2dp(10),
    fontWeight: "500",
  },
  labelTitle: {
    fontWeight: "700",
  },
  icon: {
    width: px2dp(14),
    height: px2dp(14),
  },
  loading: {
    marginBottom: px2dp(40),
  },
  retryButton: {
    alignItems: "center",
    padding: px2dp(10),
    backgroundColor: Colors.buttonBackground,
    borderRadius: px2dp(5),
  },
  retryText: {
    color: Colors.lightText,
    fontSize: px2dp(16),
  },
});

export default ResultItem;
