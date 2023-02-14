import * as React from 'react';
import { StyleSheet, View } from "react-native";
import { Text } from "react-native-paper";
// import { Feather } from '@expo/vector-icons';
import { useNetInfo } from '@react-native-community/netinfo';
import { useContext, useState } from "react";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { context } from "../../context/AppContext";
import { store } from '../../store/actions/action';
import Feather  from 'react-native-vector-icons/Feather';
function InternetConection({ netInfo }) {
    //internet info
    const myContext = useContext(context);
    const dispatch = useDispatch()
    const [call_data, setCall_Data] = useState([])

 //===============================
  // get data from loacalstorage
  //===============================
  useEffect(() => {
    const getOffline_Data = async () => {
      let offlineCalls = await AsyncStorage.getItem("offlineCalls")
      if (offlineCalls) {
        offlineCalls = await JSON.parse(offlineCalls)
        setCall_Data(offlineCalls)
      }
    }
    getOffline_Data()
    return ()=>{}
  }, [])

    //=============================
    //send data to server 
    //=============================
    useEffect(()=>{
        const getData =async () => {
            const callsData = [...call_data]
            try {
                if (callsData.length && netInfo.isConnected && netInfo.isInternetReachable) {
                    try {
                        await dispatch(
                            store(callsData[0], "visits", "visits", myContext.userToken)
                        );
                        callsData.shift()
                        await AsyncStorage.setItem("offlineCalls", JSON.stringify(callsData))
                        setCall_Data(callsData)
                        // setIsRefreshing(true)
                        //   loadIndex()
                    } catch (error) {
                        const errorData = { ...callsData[0], error: true }
                        errorData.shift()
                        const newdata = [...callsData, errorData]
                        await AsyncStorage.setItem("offlineCalls", JSON.stringify(newdata))
                    }
    
                }
            } catch (error) {
                console.log("error", error)
            }
    
        }
        getData()
        return ()=>{}
    }, [netInfo.isConnected, netInfo.isInternetReachable, call_data.length])


    if (!netInfo.isConnected) {
        return <InternetNotification message="No internet connection" />
    }


    if (netInfo.isConnected && !netInfo.isInternetReachable) {
        return <InternetNotification message="Internet isn't Reachable" />
    }

    return (
        <>
            {(!netInfo.isConnected && !netInfo.isInternetReachable) && <InternetNotification message="No internet connection" />}
        </>
    );
}



const styles = StyleSheet.create({
    screen: {
        position: "absolute",
        bottom: 80,
        left: "25%",
        backgroundColor: "#000000bb",
        padding: 10,
        flexDirection: "row",
        borderRadius: 5
    },
    text: {
        color: "#fff",
        paddingLeft: 5,
    }
})

function InternetNotification({ message }) {
    return (
        <>
            <View style={styles.screen}>
                <Feather name="wifi-off" size={20} color="#fff" />
                <Text style={styles.text} >{message}</Text>
            </View>
        </>
    );
}
export default InternetConection;