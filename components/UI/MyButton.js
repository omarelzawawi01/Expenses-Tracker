import { StyleSheet, Text, View, Pressable } from "react-native";
import GlobalStyles from "../../constants/styles";

function MyButton(props) {
  return (
    <View style={props.style}>
      <Pressable
        onPress={props.onTap}
        style={({ pressed }) => pressed && styles.pressed}
      >
        <View
          style={[styles.button, props.mode === "flat" ? styles.flat : null]}
        >
          <Text
            style={[
              styles.buttonText,
              props.mode === "flat" ? styles.flatText : null,
            ]}
          >
            {props.text}
          </Text>
        </View>
      </Pressable>
    </View>
  );
}

export default MyButton;
const styles = StyleSheet.create({
  button: {
    borderRadius: 10,
    padding: 10,
    backgroundColor: GlobalStyles.colors.primary500,
    alignItems: "center",
    minWidth: 150,
  },
  flat: {
    backgroundColor: "transparent",
  },
  buttonText: {
    color: "white",
    alignItems: "center",
  },
  flatText: {
    color: GlobalStyles.colors.primary200,
  },
  pressed: {
    opacity: 0.5,
    backgroundColor: GlobalStyles.colors.primary100,
    borderRadius: 10,
  },
});
