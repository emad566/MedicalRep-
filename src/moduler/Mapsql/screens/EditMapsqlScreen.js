import * as React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import BackNav from '../../../navigations/BackNav';

const EditMapsqlScreen = (props) => {
  return (
    <BackNav navigation={props.navigation}>
      <View style={styles.screen}>
        <Text>EditMapsqlScreen</Text>
      </View>
    </BackNav>
  );
}

const styles = StyleSheet.create({
  
});

export default EditMapsqlScreen;







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