import * as React from 'react';
import { View } from "react-native";
import CustomInput from './../../../components/UI/CustomInput';
// import { FontAwesome } from '@expo/vector-icons';
import FontAwesome  from 'react-native-vector-icons/FontAwesome';
import Colors from "../../../constants/Colors";


function UserInfo(props) {
  

    return (
        <View>
            <CustomInput
                label="Name *"
                placeholder="Type User Name"
                errors={props.errors.name}
                name="name"
                control={props.control}
                maxLength={100}
                required={true}
                icon={() => {
                    return (
                        <FontAwesome
                            name="user"
                            size={20}
                            color={  "#aaa"}
                            style={{
                                padding: 8,
                            }}
                        />
                    );
                }}
                serverErrors={props.serverErrors.name}
            />

            <CustomInput
                label="Email *"
                placeholder="Type User Email"
                errors={props.errors.email}
                name="email"
                autoComplete="email"
                control={props.control}
                keyboardType="email-address"
                maxLength={50}
                required={true}
                icon={() => {
                    return (
                        <FontAwesome
                            name="at"
                            size={20}
                            color={  "#aaa"}
                            style={{
                                padding: 8,
                            }}
                        />
                    );
                }}
                serverErrors={props.serverErrors.email}
            />
            <CustomInput
                label="Phone *"
                placeholder="Type User Phone"
                errors={props.errors.phone}
                name="phone"
                control={props.control}
                keyboardType="phone-pad"
                maxLength={11}
                required={true}
                icon={() => {
                    return (
                        <FontAwesome
                            name="phone"
                            size={20}
                            color={  "#aaa"}
                            style={{
                                padding: 8,
                            }}
                        />
                    );
                }}
                serverErrors={props.serverErrors.user_phone_no}
            />
            
            <CustomInput
                label="Level degree *"
                placeholder="Level degree"
                errors={props.errors.user_level}
                name="user_level"
                control={props.control}
                keyboardType="phone-pad"
                maxLength={333}
                required={true}
                icon={() => {
                    return (
                        <FontAwesome
                            name="phone"
                            size={20}
                            color={  "#aaa"}
                            style={{
                                padding: 8,
                            }}
                        />
                    );
                }}
                serverErrors={props.serverErrors.user_level}
            />

           {!props.edit_item_data && <CustomInput
                label="Password *"
                placeholder="Type User Password "
                errors={props.errors.password}
                name="password"
                control={props.control}
                secureTextEntry={!props.passSeen}
                icon={() => {
                    return (
                        <FontAwesome
                            name={props.passSeen ? "eye" : "eye-slash"}
                            size={20}
                            color={props.passSeen ? Colors.scandry : "#aaa"}
                            onPress={() => { props.setPassSeen(!passSeen) }}
                            style={{
                                padding: 8,
                            }}
                        />
                    );
                }}

                maxLength={20}
                required={true}
            />}

           {!props.edit_item_data && <CustomInput
                label="Confairm Password *"
                placeholder="Type User Password "
                errors={props.errors.passwordConfirmation}
                name="passwordConfirmation"
                control={props.control}
                secureTextEntry={!props.confPassSeen}
                icon={() => {
                    return (
                        <FontAwesome
                            name={props.confPassSeen ? "eye" : "eye-slash"}
                            size={20}
                            color={props.confPassSeen ? Colors.scandry : "#aaa"}
                            onPress={() => { props.setconfPassSeen(!confPassSeen) }}
                            style={{
                                padding: 8,
                            }}
                        />
                    );
                }}

                maxLength={20}
                required={true}
            />}
        </View>
    );
}

export default UserInfo;