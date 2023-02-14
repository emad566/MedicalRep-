// import { FontAwesome } from '@expo/vector-icons';
import FontAwesome  from 'react-native-vector-icons/FontAwesome';
import * as React from 'react';
import { Keyboard, StyleSheet } from 'react-native';
import { Modal, Portal, Text, Button, Provider, Snackbar } from 'react-native-paper';
import CustomInput from '../../../../components/UI/CustomInput';
import Colors from '../../../../constants/Colors';
import * as yup from "yup"
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useState } from 'react';
import SubmitButton from './SubmitButton';
import { View } from 'react-native';
import { useDispatch } from 'react-redux';
import { api, update } from '../../../../store/actions/action';
import { context } from '../../../../context/AppContext';
import { useEffect } from 'react';
import RoutToLogin from '../../../../components/UI/RoutToLogin';
//===========
//Schema
//==========
const schema = yup.object({
    password: yup.string().min(3).max(20).required(),
    passwordConfirmation: yup
        .string()
        .required()
        .min(3)
        .max(20)
        .oneOf([yup.ref("password"), null], "Passwords must match"),
});



const ChangePassword = (props) => {
    const myContext = React.useContext(context);

    const { control, handleSubmit,reset,formState: { errors }, } = useForm({ resolver: yupResolver(schema), });


    const [passSeen, setPassSeen] = React.useState(false)
    const [confPassSeen, setconfPassSeen] = useState(false)
    const [snackbarVistable, setSnackbarVistable] = useState(false);
    const [serverErrorMsg, setServerErrorMsg] = useState(false);
    const [screenLoading, setScreenLoading] = useState(false);

    const dispatch = useDispatch()

//================
//Submit Data
//================
const onSubmit = async(data) => {
    Keyboard.dismiss()
    setScreenLoading(true)
    const id = props.userId
    const inserted_date = {
        password: data.password,
        password_confirmation: data.passwordConfirmation,
        user_id:props.userId
    }
    try {
        await dispatch(
            api("user/changepassword/"+props.userId, 'POST', inserted_date, myContext.userToken, 'changepassword')
        );
        reset({password:null , passwordConfirmation:null})
        setScreenLoading(false)
        setSnackbarVistable(true)
        props.hideModal()
    } catch (error) {
        RoutToLogin(error, props);
        setScreenLoading(false)
        console.log("error" ,  error)
    }
}

    const hideModal = ()=>{
        setScreenLoading(false)
        props.hideModal()
    }


    return (
        <Provider>
            <Portal>
                <Modal visible={props.visible} onDismiss={hideModal} contentContainerStyle={styles.containerStyle}>
                    <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                        <Text>Change Pasword</Text>
                        <FontAwesome
                            onPress={hideModal}
                            name="close" size={24} color={Colors.primary} />
                    </View>
                    <CustomInput
                        label="Password "
                        placeholder="Type User Password "
                        errors={errors.password}
                        name="password"
                        control={control}
                        secureTextEntry={!passSeen}
                        icon={() => {
                            return (
                                <FontAwesome
                                    name={passSeen ? "eye" : "eye-slash"}
                                    size={20}
                                    color={passSeen ? Colors.scandry : "#aaa"}
                                    onPress={() => { setPassSeen(!passSeen) }}
                                    style={{
                                        padding: 8,
                                    }}
                                />
                            );
                        }}

                        maxLength={20}
                        required={true}
                    />

                    <CustomInput
                        label="Confairm Password "
                        placeholder="Type User Password "
                        errors={errors.passwordConfirmation}
                        name="passwordConfirmation"
                        control={control}
                        secureTextEntry={!confPassSeen}
                        icon={() => {
                            return (
                                <FontAwesome
                                    name={confPassSeen ? "eye" : "eye-slash"}
                                    size={20}
                                    color={confPassSeen ? Colors.scandry : "#aaa"}
                                    onPress={() => { setconfPassSeen(!confPassSeen) }}
                                    style={{
                                        padding: 8,
                                    }}
                                />
                            );
                        }}

                        maxLength={20}
                        required={true}
                    />
                    <Button
                        mode="contained"
                        color={Colors.primary}
                        disabled={screenLoading}
                        loading={screenLoading} uppercase={false} onPress={handleSubmit(onSubmit)}>
                        Save Password</Button>
                       
                </Modal>
                <Snackbar
                    visible={snackbarVistable}
                    duration={2000}
                    style={styles.SnackbarStyle}
                    onDismiss={() => {setSnackbarVistable(false)}}
                >
                    Password was changed successfully
                </Snackbar>
            </Portal>
        </Provider>
    );
};

const styles = StyleSheet.create({
    containerStyle: {
        backgroundColor: 'white',
        padding: 20,
        marginHorizontal: 20
    },
    SnackbarStyle: {
        backgroundColor: "#4BB543",
        justifyContent: "center",
        color: "green",
    }
})
export default ChangePassword;