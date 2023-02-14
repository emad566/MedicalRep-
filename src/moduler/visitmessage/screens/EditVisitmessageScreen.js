import * as React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import BackNav from '../../../navigations/BackNav';

const EditVisitmessageScreen = (props) => {
  return (
    <BackNav navigation={props.navigation}>
      <View style={styles.screen}>
        <Text>EditVisitmessageScreen</Text>
      </View>
    </BackNav>
  );
}

const styles = StyleSheet.create({
  
});

export default EditVisitmessageScreen;


// import React from 'react';
// import { StyleSheet, View, Text } from 'react-native';
// import BackNav from '../../../navigations/BackNav';

// const EditVisitmessageScreen = (props) => {
//   return (
//     <BackNav navigation={props.navigation}>
//       <View style={styles.screen}>
//         <Text>EditVisitmessageScreen</Text>
//       </View>
//     </BackNav>
//   );
// }

// const styles = StyleSheet.create({
  
// });

// export default EditVisitmessageScreen;