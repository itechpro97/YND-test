import { ImageBackground, StyleSheet } from "react-native";
import { Colors } from "@/constants/Colors";
import { px2dp } from "@/utils/px2dp";
import { Results, SearchBar } from "@/components";
import { backgroundImage } from "@/constants/Images";

export default function HomeScreen() {
  // we can add theming like this way if want to use expo theming system
  // const colorScheme = useColorScheme();
  // const themeContainerStyle = colorScheme === "light" ? styles.lightContainer : styles.darkContainer;

  return (
    <ImageBackground
      source={backgroundImage}
      style={styles.container}
      imageStyle={styles.image}
    >
      <SearchBar />
      <Results />
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: px2dp(15),
    resizeMode: "cover",
    backgroundColor: Colors.background,
  },
  image: { opacity: 0.2 },
});
