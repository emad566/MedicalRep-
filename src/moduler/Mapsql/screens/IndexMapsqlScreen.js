import * as React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import BackNav from '../../../navigations/BackNav';

const IndexMapsqlScreen = (props) => {
  return (
    <BackNav navigation={props.navigation}>
      <View style={styles.screen}>
        <Text>IndexMapsqlScreen</Text>
      </View>
    </BackNav>
  );
}

const styles = StyleSheet.create({
  
});

export default IndexMapsqlScreen;






// import * as React from 'react';
// // import { Entypo, Ionicons } from "@expo/vector-icons";
// import  { useEffect, useLayoutEffect } from "react";
// import { StyleSheet, View, Text } from "react-native";
// import { TouchableOpacity } from "react-native-gesture-handler";
// import BackNav from "../../../navigations/BackNav";

// const HeaderButton = (props) => {
//   return (
//     <TouchableOpacity
//       activeOpacity={0.5}
//       style={{ flexDirection: "row", marginRight: 40 }}
//     >
//       {/* <Ionicons
//         name="add"
//         size={30}
//         color="white"
//         onPress={()=>props.navigation.navigate("CreateMapsqlScreen")}
//       /> */}
//     </TouchableOpacity>
//   );
// };

// const IndexMapsqlScreen = (props) => {
//   return (
//     <BackNav
//       title="Index Mapsql"
//       navigation={props.navigation}
//       HeaderButton={<HeaderButton navigation={props.navigation} />}
//     >
//       <View style={styles.screen}>
//         <Text>IndexMapsqlScreen</Text>
//       </View>
//     </BackNav>
//   );
// };

// const styles = StyleSheet.create({});

// export default IndexMapsqlScreen;
