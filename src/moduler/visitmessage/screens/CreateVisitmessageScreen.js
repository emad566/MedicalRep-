import * as React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import BackNav from '../../../navigations/BackNav';

const CreateVisitmessageScreen = (props) => {
  return (
    <BackNav navigation={props.navigation}>
      <View style={styles.screen}>
        <Text>CreateVisitmessageScreen</Text>
      </View>
    </BackNav>
  );
}

const styles = StyleSheet.create({
  
});

export default CreateVisitmessageScreen;


// import React from 'react';
// import { StyleSheet, View, Text } from 'react-native';
// import BackNav from '../../../navigations/BackNav';

// const CreateVisitmessageScreen = (props) => {
//   return (
//     <BackNav navigation={props.navigation}>
//       <View style={styles.screen}>
//         <Text>CreateVisitmessageScreen</Text>
//       </View>
//     </BackNav>
//   );
// }

// const styles = StyleSheet.create({
  
// });

// export default CreateVisitmessageScreen;