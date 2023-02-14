import * as React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import BackNav from '../../../navigations/BackNav';

const ViewMapsqlScreen = (props) => {
  return (
    <BackNav navigation={props.navigation}>
      <View style={styles.screen}>
        <Text>ViewMapsqlScreen</Text>
      </View>
    </BackNav>
  );
}

const styles = StyleSheet.create({
  
});

export default ViewMapsqlScreen;










// import * as React from 'react';
// // import { Entypo, Ionicons } from '@expo/vector-icons';
// import  { useEffect } from 'react';
// import { StyleSheet, View, Text } from 'react-native';
// import BackNav from '../../../navigations/BackNav';
// import { TouchableOpacity } from "react-native-gesture-handler";

// const ViewLineScreen = (props) => {
//   useEffect(() => {
//     props.navigation.setOptions({
//       headerRight: () => {
//         return (
//           <View style={{ flexDirection: "row" }}>
//             <TouchableOpacity
//               activeOpacity={0.5}
//               style={{ flexDirection: "row", marginRight: 40 }}
//             >
//               {/* <Entypo
//                 name="add-to-list"
//                 size={30}
//                 color="white"
//                 onPress={props.navigation.navigate('CreateMapsqlScreen')}
//               /> */}
//             </TouchableOpacity>

//             <TouchableOpacity style={{ flexDirection: "row", marginRight: 20 }}>
//               {/* <Ionicons
//                 name="ios-menu-sharp"
//                 size={28}
//                 color="white"
//                 onPress={props.navigation.toggleDrawer}
//               /> */}
//             </TouchableOpacity>
//           </View>
//         );
//       },
//     });
//   });

//   return (
//     <BackNav navigation={props.navigation}>
//       <View style={styles.screen}>
//         <Text>ViewLineScreen</Text>
//       </View>
//     </BackNav>
//   );
// }

// const styles = StyleSheet.create({
  
// });

// export default ViewLineScreen;