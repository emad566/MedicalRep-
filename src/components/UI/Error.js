import * as React from 'react';
import { StyleSheet, View } from 'react-native';
import { Caption } from 'react-native-paper';

function Error({style , errorMsg}) {
  return (
    <View style={{ ...styles.container , ...style }}>
      <Caption style={{ color: "red" }}>{errorMsg}</Caption>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-around",
    backgroundColor: "#ff00004d",
    borderRadius: 5,
  },
});
export default Error;
