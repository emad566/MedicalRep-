import * as React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import BackNav from '../../../navigations/BackNav';

const IndexVisitmessageScreen = (props) => {
  return (
    <BackNav navigation={props.navigation}>
      <View style={styles.screen}>
        <Text>IndexVisitmessageScreen</Text>
      </View>
    </BackNav>
  );
}

const styles = StyleSheet.create({
  
});

export default IndexVisitmessageScreen;


// import React from 'react';
// import { StyleSheet, View, Text } from 'react-native';
// import BackNav from '../../../navigations/BackNav';

// const IndexVisitmessageScreen = (props) => {
//   return (
//     <BackNav navigation={props.navigation}>
//       <View style={styles.screen}>
//         <Text>IndexVisitmessageScreen</Text>
//       </View>
//     </BackNav>
//   );
// }

// const styles = StyleSheet.create({
  
// });

// export default IndexVisitmessageScreen;