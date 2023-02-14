import * as React from 'react';
import { TextInput } from 'react-native-paper';
import { useController } from 'react-hook-form';
import { StyleSheet, View } from 'react-native';
import Colors from '../../constants/Colors';
// import Colors from '../../../constants/Colors';

const Input = ({ name, control, data, lable }) => {

    const { field } = useController({
        control,
        defaultValue: "",
        name
    })

    return (
        <View style={styles.formcontrol}>
            <TextInput
                mode="outlined"
                label={lable}
                placeholder={lable}
                value={field.value}
                onChangeText={field.onChange}
                activeOutlineColor={Colors.primary}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    formcontrol: {
        margin: 5,
        // marginLeft: 10,
        // marginRight: 10,
    },
});

export default Input;