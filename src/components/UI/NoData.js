import * as React from 'react';
import { StyleSheet, View, Text } from "react-native";
import BackNav from "../../navigations/BackNav";

const NoData = (props) => {
  if (props.noBackNav){
    return (
        <View style={styles.centered}>
          <Text>No data, you could add some!</Text>
        </View>
    );
  }

  return (
    <BackNav navigation={props.navigation}>
      <View style={styles.centered}>
        <Text>No data, you could add some!</Text>
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

export default NoData;
