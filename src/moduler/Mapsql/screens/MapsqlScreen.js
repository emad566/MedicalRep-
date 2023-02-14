import * as React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import BackNav from '../../../navigations/BackNav';

const MapsqlScreen = (props) => {
    return (
        <BackNav navigation={props.navigation}>
            <View style={styles.screen}>
                <Text>MapsqlScreen</Text>
            </View>
        </BackNav>
    );
}

const styles = StyleSheet.create({
    
});

export default MapsqlScreen;






// import React from 'react';
// import { StyleSheet, View, Text } from 'react-native';
// import BackNav from '../../../navigations/BackNav';

// const MapsqlScreen = (props) => {
//     return (
//         <BackNav title="View Mapsql" navigation={props.navigation}>
//             <View style={styles.screen}>
//                 <Text>MapsqlScreen</Text>
//             </View>
//         </BackNav>
//     );
// }

// const styles = StyleSheet.create({
    
// });

// export default MapsqlScreen;