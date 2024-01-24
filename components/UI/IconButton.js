import { Ionicons } from "@expo/vector-icons";
import { Pressable, View, StyleSheet } from "react-native";
function IconButton(props) {
  return (
          
    <Pressable
      onPress={props.onTap}
      style={({ pressed }) => pressed && styles.pressed}
    >
      <View style={styles.buttonContainer} >
        <Ionicons name={props.icon} size={props.size} color={props.color} />
      </View>
    </Pressable>
  );
}

export default IconButton;
const styles = StyleSheet.create({
  buttonContainer: {
    borderRadius: 10,
    overflow: "hidden",
    padding: 10,
    marginVertical: 2,
    marginHorizontal: 8,

  },
  pressed: {
    opacity: 0.5,
  },
});
