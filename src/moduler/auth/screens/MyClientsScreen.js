import * as React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import BackNav from '../../../navigations/BackNav';

const MyClientsScreen = (props) => {
    return (
        <BackNav navigation={props.navigation}>
            <View style={styles.screen}>
                <Text>MyClientsScreen</Text>
            </View>
        </BackNav>
    );
}

const styles = StyleSheet.create({
    
});

export default MyClientsScreen;




// import React from 'react';
// import { StyleSheet, View, Text } from 'react-native';
// import BackNav from '../../../navigations/BackNav';

// const MyClientsScreen = (props) => {
//     return (
//         <BackNav navigation={props.navigation}>
//             <View style={styles.screen}>
//                 <Text>MyClientsScreen</Text>
//             </View>
//         </BackNav>
//     );
// }

// const styles = StyleSheet.create({
    
// });

// export default MyClientsScreen;