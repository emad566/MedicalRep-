import * as React from 'react';
import { View, StyleSheet } from 'react-native';
import CustomInput from '../../../components/UI/CustomInput';
import Colors from '../../../constants/Colors';
import { Divider, Headline, Text} from 'react-native-paper';
// import { SimpleLineIcons } from '@expo/vector-icons'; 

function ContactInfo({serverErrors, errors, control }) {
    return (
        <View style={{ paddingTop: 30 }}>
            <Divider />
            <Headline style={{ color: Colors.scandry, textAlign: "center" }}>Contact Info</Headline>
            
            <CustomInput
                label="Email"
                placeholder="Type Client Email"
                errors={errors.email}
                icon={()=>{return( 
                    <></>
                // <SimpleLineIcons name="envelope" size={24} color={Colors.primary}  />
                )}}
                name="email"
                autoComplete='email'
                control={control}
                keyboardType="email-address"
                maxLength={50}
                required={false}
                serverErrors={serverErrors.email}
            />


            <CustomInput
                label="Phone"
                placeholder="Type Client Phone"
                errors={errors.phone}
                icon="phone"
                name="phone"
                control={control}
                keyboardType="phone-pad"
                maxLength={11}
                required={false}
                serverErrors={serverErrors.client_phone}
            />
        </View>
    );
}


const styles = StyleSheet.create({
    screen: {
        alignContent: "center",
        flex: 1
    },
    formcontrol: {
        marginVertical: 10
    }
})

export default ContactInfo;