import * as React from 'react';
import { StyleSheet, View, Text } from "react-native";
import { ActivityIndicator } from "react-native-paper";
import Colors from "../../constants/Colors";
import BackNav from "../../navigations/BackNav";


const CustomActivityIndicator = (props) => {
  return (
    <BackNav navigation={props.navigation}>
      <View style={styles.centered}>
        <ActivityIndicator size="large" color={Colors.primary} />
      </View>
    </BackNav>
  );
};

const styles = StyleSheet.create({
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default CustomActivityIndicator;
