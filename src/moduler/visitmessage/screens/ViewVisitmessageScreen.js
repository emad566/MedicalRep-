import * as React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import BackNav from '../../../navigations/BackNav';

const ViewVisitmessageScreen = (props) => {
  return (
    <BackNav navigation={props.navigation}>
      <View style={styles.screen}>
        <Text>ViewVisitmessageScreen</Text>
      </View>
    </BackNav>
  );
}

const styles = StyleSheet.create({
  
});

export default ViewVisitmessageScreen;


// import React from 'react';
// import { StyleSheet, View, Text } from 'react-native';
// import BackNav from '../../../navigations/BackNav';

// const ViewVisitmessageScreen = (props) => {
//   return (
//     <BackNav navigation={props.navigation}>
//       <View style={styles.screen}>
//         <Text>ViewVisitmessageScreen</Text>
//       </View>
//     </BackNav>
//   );
// }

// const styles = StyleSheet.create({
  
// });

// export default ViewVisitmessageScreen;