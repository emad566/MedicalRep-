import React from "react";
// import { FontAwesome5 } from "@expo/vector-icons";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import Colors from "../../constants/Colors";

const MenuItem = (props) => {
  const menueChild = props.menueChild;

  const fontColor = props.screen == menueChild ? Colors.primary : "black";

  return (
    <TouchableOpacity
      activeOpacity={0.5}
      style={styles.menuItemContainer}
      onPress={() => {
        props.navigation.reset({
          index: 0,
          routes: [
            {
              name: props.screen,
              params: {
                title: props.title ? props.title : "props.screen",
              },
            },
          ],
        });
        return;
      }}
    >
      <View
        style={{
          ...styles.itemHeader,
          borderRightWidth: 5,
          borderColor: props.screen == menueChild ? Colors.primary : "white",
        }}
      >
        <Text style={{ ...styles.menuTitle, color: fontColor }}>
          {props.title}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  menuItemContainer: {
    padding: 5,
  },
  menuTitle: {
    fontWeight: "bold",
    fontSize: 16,
    padding: 5,
  },
  itemHeader: {
    flexDirection: "row",
  },
});

export default MenuItem;
