import * as React from 'react';
import { StyleSheet, View } from 'react-native';
import Colors from '../../../constants/Colors';
import { useContext, useState } from "react";
import { Alert } from "react-native";
import { Caption, Card, IconButton, Modal, Portal, Text } from "react-native-paper";
import { TouchableOpacity } from "react-native";
import { useDispatch } from "react-redux";
import { CommonActions } from "@react-navigation/native";
import { api, edit, index, _delete } from '../../../store/actions/action';
import { context } from '../../../context/AppContext';
import RoutToLogin from '../../../components/UI/RoutToLogin';
import Menu from './Menue';
// import { Ionicons } from '@expo/vector-icons';
// import { MaterialCommunityIcons } from '@expo/vector-icons';
import Ionicons  from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons  from 'react-native-vector-icons/MaterialCommunityIcons';

const ListNotification = (props) => {
    const myContext = useContext(context);
    const dispatch = useDispatch()
    const permissions = props.permissions
    const [visible, setVisible] = useState(false);


    const title = typeof props.title == "function" ? props.title() : props.title;
    const showModal = () => {
        setVisible(true);
    };
    const hideModal = () => setVisible(false);

    const itemOnPress = async () => {
        if(!props.read_at){
            await dispatch( api("notifseen/"+props.notif_id, "POST", false, myContext.userToken, "notifread") );
        }

        if (!permissions?.view) return
        const resetAction = CommonActions.reset({
            index: 0,
            routes: [
                { name: "CallNavScreen", params: {
                        screen:props.ViewScreen,
                        params: {
                            id: props.id,
                            title: title,
                            permissions: permissions,
                            reload:props.id
                        }
                    } 
                },
            ],
          });
          props.navigation.dispatch(resetAction);

        // props.navigation.navigate("CallNavScreen", {
        //     screen:props.ViewScreen,
        //     params: {
        //         id: props.id,
        //         title: title,
        //         permissions: permissions,
        //         reload:props.id
        //     }
        // });

        
    } 

    return (
        <Card style={props.read_at ? { marginVertical: 0.5, ...styles.unRead } : { marginVertical: 0.5 } } mode="contained">
            {/* <Portal style={{ flex: 1 }}>
                <Modal
                    visible={visible}
                    onDismiss={hideModal}
                    contentContainerStyle={{ ...styles.portalStyle, ...styles.portal }}
                >
                    <Menu >
                        <Text>{title}</Text>
                        <Text>
                            this Notification is  seen by {props.first_seen_user} at  
                            { props.first_seen_at} 
                        </Text>
                    </Menu>
                </Modal>
            </Portal> */}
            <TouchableOpacity
                activeOpacity={0.5}
                onPress={() => { itemOnPress() }}
            >
                <Card.Title
                    titleStyle={styles.cardTitle}
                    // titleVariant={true}
                    titleNumberOfLines={3}
                    title={title}
                    id={props.id}
                    subtitle={props.first_read_user || props.first_seen_user}
                    subtitleStyle={{ textAlign:"right"}}
                    left={props.leftIcon}
                    right={() => {
                        if (props?.first_read_at) {
                            return (
                                <>
                                    <MaterialCommunityIcons
                                        style={styles.chechedIcon}
                                        name="eye-check-outline" size={23} color={Colors.primary} />
                                </>
                            )
                        }
                        if (props?.first_seen_at) {
                            return (
                                <>
                                    <Ionicons
                                        style={styles.chechedIcon}
                                        {...props} name="md-checkmark-done" size={25} color={Colors.primary} />
                                </>

                            )
                        }

                    }}
                />
            </TouchableOpacity>
        </Card>
    );
};



const styles = StyleSheet.create({
    portal: {
        // justifyContent:"flex-end",
        // alignItems:"flex-end",
        // flexDirection:"column",
        position: "absolute",
        bottom: 0,
        width: "100%",
        borderTopLeftRadius: 25,
        borderTopRightRadius: 25
    },
    cardTitle: {
        fontSize: 15,
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
    chechedIcon: {
        padding: 5
    },
    unRead: {
        backgroundColor: "#e6f4ff"
    },
    portalStyle: {
        backgroundColor: "white", padding: 20,
    }
});


export default ListNotification;