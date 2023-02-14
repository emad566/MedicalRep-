import * as React from 'react';
import { View } from "react-native";
import { Divider } from "react-native-paper";
import { StyleSheet } from "react-native";
// import { MaterialIcons, AntDesign, EvilIcons } from "@expo/vector-icons";
import { IconButton } from "react-native-paper";
import Colors from "../../constants/Colors";

function EditeButtomBar({ OnAdd, OnEdite, OnDelete, size, disabled }) {
  return (
    <View>
      <View style={styles.buttonGrop}>
        {OnAdd && (
          <IconButton
            disabled={disabled}
            // icon={() => {
            //   return (
            //     <MaterialIcons
            //       name="playlist-add"
            //       size={size ? size : 29}
            //       color={Colors.accent}
            //     />
            //   );
            // }}
            color={Colors.primary}
            size={20}
            onPress={OnAdd}
          />
        )}
        {OnEdite && (
          <IconButton
            disabled={disabled}
            // icon={() => {
            //   return (
            //     <AntDesign name="edit" size={size ? size : 29} color="blue" />
            //   );
            // }}
            color={Colors.primary}
            size={20}
            onPress={OnEdite}
          />
        )}
        {OnDelete && (
          <IconButton
            disabled={disabled}
            // icon={() => {
            //   return (
            //     <EvilIcons name="trash" size={size ? size : 29} color="red" />
            //   );
            // }}
            color={Colors.primary}
            size={20}
            onPress={OnDelete}
          />
        )}
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  dropDownList: {
    flexDirection: "column",
    justifyContent: "flex-start",
    backgroundColor: "white",
    height: 100,
    paddingBottom: 10,
  },
  buttonGrop: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
});
export default EditeButtomBar;
