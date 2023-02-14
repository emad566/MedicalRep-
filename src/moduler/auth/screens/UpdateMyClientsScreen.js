import * as React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import BackNav from '../../../navigations/BackNav';

const UpdateMyClientsScreen = (props) => {
    return (
        <BackNav navigation={props.navigation}>
            <View style={styles.screen}>
                <Text>UpdateMyClientsScreen</Text>
            </View>
        </BackNav>
    );
}

const styles = StyleSheet.create({
    
});

export default UpdateMyClientsScreen;