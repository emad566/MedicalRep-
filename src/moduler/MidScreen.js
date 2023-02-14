import * as React from 'react';
import { StyleSheet, View, Text } from "react-native";
import { ActivityIndicator } from "react-native-paper";
import Colors from "../constants/Colors";
import BackNav from "../navigations/BackNav";
// import BackNav from '../navigations/BackNav';

const MidScreen = (props) => {
  const params = props.route.params;
  useEffect(() => {
    props.navigation.reset({
      index: 0,
      routes: [
        {
          name: params.screen,
          params: {
            title: params.title ? params.title : params.screen,
          },
        },
      ],
    });

    props.navigation.navigate(params.screen, {
      title: params.title ? params.title : params.screen,
    });
  }, []);

  return (
    <BackNav navigation={props.navigation}>
      <View style={styles.loadingContainer}>
        <ActivityIndicator
          animating={true}
          size={props.size ? props.size : "large"}
          color={Colors.primary}
          {...props}
        />
      </View>
    </BackNav>
  );
};

const styles = StyleSheet.create({
  loadingContainer: {
    padding: 20,
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default MidScreen;
