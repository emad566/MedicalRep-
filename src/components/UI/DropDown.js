import * as React from 'react';
import {  StyleSheet, View } from 'react-native';
import { Dropdown } from 'sharingan-rn-modal-dropdown'
import { Controller } from "react-hook-form";

function DropDownList(props) {
    
    return ( 
        <View style={{...styles.formcontrol , ...props.style}}>
        <Controller
            control={props.control}
            render={({ field: { onChange, onBlur, value } }) => 
            {
                value = (!value || value ==undefined)? "0" : +value;
                if(props.storeValue){
                    props.setValue(value)
                }
                return(
                <Dropdown
                    label={props.label}
                    data={props.data}
                    onBlur={onBlur}
                    onChangeText={onChange}
                    mode="outlined"
                    rippleColor="blue"
                    helperText={props.error  ? props.error.message:""}
                    showLoader={false}
                    onChange={props.onChange? props.onChange : onChange}
                    value={value}
                    primaryColor="red"
                    error={
                        props.cusError? 
                        value ? false :true
                        :
                        props.error ? true :false
                        
                    }
                    enableSearch={props.enableSearch}
                    required={props.required? props.required : false}
                    disableSort={props.disableSort? props.disableSort : false}
                    disabled={props.disabled}
                />)
            }
        }
            name={props.name}
        />
    </View>
     );
}

const  styles = StyleSheet.create({
    screen: {
        alignContent: "center",
        flex: 1
    },
    formcontrol: {
        marginVertical: 5
    },
    error:{
        color:"red"
    }
})

export default DropDownList;




// import { Text,} from 'react-native-paper';
// import { View, StyleSheet } from 'react-native';
// import { Dropdown } from 'sharingan-rn-modal-dropdown'
// import { Controller } from "react-hook-form";
// import Colors from '../../constants/Colors';

// function DropDownList(props) {
    
//     return ( 
//         <View style={{...styles.formcontrol , ...props.style}}>
//         <Controller
//             control={props.control}
//             render={({ field: { onChange, onBlur, value } }) => (
//                 <Dropdown
//                     label={props.label}
//                     data={props.data}
//                     onBlur={onBlur}
//                     mode={props.mode? props.mode : "outlined"}
//                     rippleColor="blue"
//                     helperText={props.error  ? props.helperText:""}
//                     showLoader={false}
//                     onChange={(props.onChange? props.onChange : onChange)}
//                     value={value? value : props.defaultValue}
//                     primaryColor="red"
//                     error={props.error? true : false}
//                     // error={(props.required && !value) ? true : false}
//                     enableSearch={props.enableSearch}
//                     required={props.required? props.required : false}
//                     disableSort={props.disableSort? props.disableSort : false}
//                 />
//             )}
//             name={props.name}
//         />
//     </View>
//      );
// }

// const  styles = StyleSheet.create({
//     screen: {
//         alignContent: "center",
//         flex: 1
//     },
//     formcontrol: {
//         marginVertical: 5
//     },
//     error:{
//         color:"red"
//     }
// })

// export default DropDownList;