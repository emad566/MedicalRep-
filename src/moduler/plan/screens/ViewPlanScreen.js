import React from "react";
import { StyleSheet, View, Text } from "react-native";
import BackNav from "../../../navigations/BackNav";

const ViewPlanScreen = (props) => {
  return (
    <BackNav navigation={props.navigation}>
      <View style={styles.screen}>
        <Text>ViewPlanScreen</Text>
      </View>
    </BackNav>
  );
};

const styles = StyleSheet.create({});

export default ViewPlanScreen;
