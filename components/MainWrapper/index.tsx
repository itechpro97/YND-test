import React, { ReactNode, FC } from "react";
import { StyleSheet, ViewStyle } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { Colors } from "@/constants/Colors";
import { Provider } from "react-redux";
import { store } from "@/redux/store";

interface MainWrapperProps {
  children: ReactNode;
}

const MainWrapper: FC<MainWrapperProps> = ({ children }) => {
  return (
    <Provider store={store}>
      <SafeAreaProvider style={styles.container}>
        <SafeAreaView style={styles.container}>{children}</SafeAreaView>
      </SafeAreaProvider>
    </Provider>
  );
};

export default MainWrapper;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.backgroundSafeArea,
  },
});
