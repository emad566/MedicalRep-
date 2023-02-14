import * as React from 'react';
import { StyleSheet, View } from 'react-native';
import { Text, Title } from 'react-native-paper';
import Colors from '../../../constants/Colors';
// // import ListItem from './../../../components/UI/ListItem';

import { useContext, useState } from "react";
import { Alert } from "react-native";
import { Appbar, Card, IconButton, Modal, Portal } from "react-native-paper";
import { TouchableOpacity } from "react-native";
import { useDispatch } from "react-redux";

import { CommonActions } from "@react-navigation/native";
import { edit, index, _delete } from '../../../store/actions/action';
import { context } from '../../../context/AppContext';
import RoutToLogin from '../../../components/UI/RoutToLogin';
import MenueItem from './MenueItem';
import MenuIcon from './MenuIcon';
import Menu from './Menue';
import ListNotification from './listNotification';
import Feather  from 'react-native-vector-icons/Feather';



function Notification(props) {
    const navigation = props.navigation
    const item = props.item
    const notification_Permissions = {
        view: true,
        delete: true,
        update: false
    }
    return (
        <View>
            <ListNotification
                navigation={props.navigation}
                permissions={notification_Permissions}
                id={item?.notifiable_id}
                title={item?.body}
                // subtitle={"iteitemData.item.id ,itemData.item.iditemData.item.iditemData.item.idmData.item.email"}
                leftIcon={() => {
                    return (
                        <Feather name="phone-call" size={24} color={Colors.primary} />
                    );
                }}
                // nextDeleteScreen="IndexUserScreen"
                ViewScreen={item?.screen}
                // EditScreen="CreateUserScreen"
                first_read_at={item?.first_read_at}
                first_seen_at={item?.first_seen_at}
                first_seen_user={item?.first_seen_user}
                read_at = {item.read_at}
                notif_id = {item.notif_id}
            />
        </View>
    );
}


const styles = StyleSheet.create({
    portal: {
        position: "absolute",
        bottom: 0,
        width: "100%",
        borderTopLeftRadius: 25,
        borderTopRightRadius: 25
    },
    cardTitle: {
        fontSize: 13,
        lineHeight: 15,
        fontWeight: "100",
        color: "#555"
    },

    screen: {
        padding: 20,
        backgroundColor: "#f90",
        borderWidth: 5,
        borderColor: "red",
    },
    bottom: {
        position: "absolute",
        left: 0,
        right: 0,
        bottom: 0,
        padding: 0,
        margin: 0,
        backgroundColor: Colors.primary,
        // flexDirection: "row",
        // justifyContent: "flex-end",
    },
    hNav: {
        flex: 1,
        flexDirection: "row",
        justifyContent: "space-between",
    },
    iconsContainer: {
        justifyContent: "space-between",
        flexDirection: "row",
    },
    icon: {
        fontSize: 50,
    },
    title: {
        color: "white",
        paddingTop: 12,
        paddingLeft: 10,
    },
});


export default Notification;