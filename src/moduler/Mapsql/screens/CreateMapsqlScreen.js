import * as React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import BackNav from '../../../navigations/BackNav';

const CreateMapsqlScreen = (props) => {
  return (
    <BackNav navigation={props.navigation}>
      <View style={styles.screen}>
        <Text>CreateMapsqlScreen</Text>
      </View>
    </BackNav>
  );
}

const styles = StyleSheet.create({
  
});

export default CreateMapsqlScreen;










// import React from 'react';
// import { StyleSheet, View, Text } from 'react-native';
// import BackNav from '../../../navigations/BackNav';

// const CreateMapsqlScreen = (props) => {
//   return (
//     <BackNav title="Create Mapsql" navigation={props.navigation}>
//       <View style={styles.screen}>
//         <Text>CreateMapsqlScreen</Text>
//       </View>
//     </BackNav>
//   );
// }

// const styles = StyleSheet.create({
  
// });

// export default CreateMapsqlScreen;