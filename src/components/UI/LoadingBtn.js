import * as React from 'react';

import { View, StyleSheet } from "react-native";
import { ActivityIndicator } from "react-native-paper";
import Colors from "../../constants/Colors";

function LoadingBtn(props) {
  return (
    <View style={styles.loadingContainer}>
      <ActivityIndicator
        animating={true}
        size={props.size ? props.size : "large"}
        color={Colors.primary}
        {...props}
      />
    </View>
  );
}
const styles = StyleSheet.create({
  loadingContainer: {
    padding: 20,
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
export default LoadingBtn;
