import * as React from 'react';
import { Button, Text } from "react-native-paper";
// import { AntDesign } from '@expo/vector-icons';
import AntDesign  from 'react-native-vector-icons/AntDesign';
import { ScrollView, StyleSheet, View } from "react-native";
import Colors from "../../../constants/Colors";
import { useState } from 'react'
import { Dropdown, GroupDropdown, MultiselectDropdown, } from 'sharingan-rn-modal-dropdown';
import { useController } from "react-hook-form";



function DropdownFilter({ name, control , data , lable }) {
    
    const { field } = useController({
        control,
        defaultValue:[],
        name
    })

    return (
        <View style={styles.container}>
            <MultiselectDropdown
                label={lable}
                data={data}
                enableSearch
                chipType="outlined"
                mode="outlined"
                value={field.value}
                onChange={field.onChange}
                // value={valueMS}
                // onChange={onChangeMS}
                primaryColor={Colors.primary}
            />
        </View>
    );
}


const styles = StyleSheet.create({
    buttonContainer: {
        flexDirection: "row",
        justifyContent: "flex-end",
        margin: 5,
    },
    filterButton: {
        // marginHorizontal:2,
        // borderRadius:30,
    },
    container: {
        // marginLeft: 10,
        // marginRight: 10,
        // // width:"45%",
        // height:110
        flexDirection: "row",
        // paddingTop: 30,
        marginLeft: 5,
        marginRight: 5,
      
        flex: 1,
    },
})

export default DropdownFilter;


