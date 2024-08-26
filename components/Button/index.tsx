import React from "react";
import {
  Text,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  StyleProp,
  ViewStyle,
} from "react-native";
import { px2dp } from "@/utils/px2dp";
import { Colors } from "@/constants/Colors";

interface ButtonProps {
  label: string;
  onPress: () => void;
  loading?: boolean;
  disabled?: boolean;
  style?: StyleProp<ViewStyle>;
}

const Button: React.FC<ButtonProps> = ({
  label,
  onPress,
  loading = false,
  disabled = false,
  style,
}) => {
  return (
    <TouchableOpacity
      style={[styles.button, style, disabled && styles.disabledButton]}
      onPress={onPress}
      disabled={disabled || loading}
    >
      {loading ? (
        <ActivityIndicator color={Colors.lightText} />
      ) : (
        <Text style={styles.buttonText}>{label}</Text>
      )}
    </TouchableOpacity>
  );
};

export default Button;

const styles = StyleSheet.create({
  button: {
    backgroundColor: Colors.buttonBackground,
    paddingVertical: px2dp(12),
    paddingHorizontal: px2dp(24),
    borderRadius: px2dp(8),
    alignItems: "center",
    justifyContent: "center",
    marginTop: px2dp(8),
    shadowColor: Colors.shadowColor,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5, // Android shadow
  },
  buttonText: {
    color: Colors.lightText,
    fontSize: px2dp(16),
    fontWeight: "bold",
  },
  disabledButton: {
    backgroundColor: Colors.buttonDisabledBackground,
    shadowOpacity: 0, // Remove shadow for disabled state
    elevation: 0, // Remove elevation for disabled state
  },
});
