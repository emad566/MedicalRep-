import * as React from 'react';
import { View } from 'react-native';
import { Divider } from 'react-native-paper';
import { StyleSheet } from 'react-native';
// import { MaterialIcons, AntDesign, EvilIcons } from '@expo/vector-icons';
import MaterialIcons  from 'react-native-vector-icons/MaterialIcons';
import AntDesign  from 'react-native-vector-icons/AntDesign';
import EvilIcons  from 'react-native-vector-icons/EvilIcons';
import { IconButton } from 'react-native-paper';
import Colors from '../../../../constants/Colors';

function EditeButtomBar( {formState , OnAddRegion , OnEditeRegion , OnDeleteRegion}) {
    return (
        <View>
            <Divider />
            <View style={styles.buttonGrop}>
                {formState.selectedVlaue.type !== "canNotAddInRegion" && <IconButton
                    icon={() => {
                        return (
                            <MaterialIcons name="playlist-add" size={29} color={Colors.accent} />
                        );
                    }}
                    color={Colors.primary}
                    size={20}
                    onPress={OnAddRegion}
                />}
                <IconButton
                    icon={() => {
                        return (
                            <AntDesign name="edit" size={29} color="blue" />
                        );
                    }}
                    color={Colors.primary}
                    size={20}
                    onPress={OnEditeRegion}
                />
                <IconButton
                    icon={() => {
                        return (
                            <EvilIcons name="trash" size={29} color="red" />
                        );
                    }}
                    color={Colors.primary}
                    size={20}
                    onPress={OnDeleteRegion}
                />
            </View>
        </View>
    );
}
const styles = StyleSheet.create({
    dropDownList: {
        flexDirection: "column",
        justifyContent: "flex-start",
        backgroundColor: "white",
        height: 100,
        paddingBottom: 10,
    },
    buttonGrop: {
        flexDirection: "row",
        justifyContent: "space-around",
    },
});
export default EditeButtomBar;