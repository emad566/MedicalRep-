import * as React from 'react';
import { Button, Text } from "react-native-paper";
// import { AntDesign } from '@expo/vector-icons';
import { ScrollView, StyleSheet, View } from "react-native";
import { useState } from 'react'
import { Dropdown, GroupDropdown, MultiselectDropdown, } from 'sharingan-rn-modal-dropdown';
import { useController } from "react-hook-form";
import Colors from "../../constants/Colors";



function DropdownFilter({ name, control , data , lable , search }) {
    
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
                enableSearch = {true}
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


