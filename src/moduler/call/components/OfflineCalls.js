import * as React from 'react';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useContext } from 'react';
import { context } from '../../../context/AppContext';
import { useEffect } from 'react';
import CallListItem from './UI/CallListItem';
// import { FontAwesome5 } from '@expo/vector-icons';
import FontAwesome5  from 'react-native-vector-icons/FontAwesome5';
import { useDispatch } from "react-redux";
import { View } from 'react-native';
import { FlatList } from 'react-native';
import { Text } from "react-native-paper";
import { store } from '../../../store/actions/action';

const Error = ()=>{
  return(
    <View style={{ paddingLeft:5,textAlign: "center ", justifyContent: "center" }}>
    <Text style={{ color:"red" }}>Error in data you sened please delete this Call</Text>
  </View>

  )
}


export default function OfflineData({ loadIndex,netInfo,setCall_Data , call_data, setIsRefreshing}) {
  //internet info
  //{netInfo,setCall_Data , call_data, setIsRefreshing}
  const myContext = useContext(context);
  const dispatch = useDispatch()

  //===============================
  // get data from loacalstorage
  //===============================
  useEffect(()=>{
    const getData =() => {
      const getOffline_Data = async () => {
        let offlineCalls = await AsyncStorage.getItem("offlineCalls")
        if (offlineCalls) {
          offlineCalls = await JSON.parse(offlineCalls)
          setCall_Data(offlineCalls)
        }
      }
      getOffline_Data()
    }
    getData()
    return ()=>{}
  }, [])

  //=============================
  //send data to server 
  //=============================
  useEffect(()=>{
    const getData =async()=>{
      const callsData = [...call_data]
      try {
        if(callsData.length  && netInfo.isConnected && netInfo.isInternetReachable){
          try {
            await dispatch(
              store(callsData[0], "visits", "visits", myContext.userToken)
            );
            callsData.shift()
            await AsyncStorage.setItem("offlineCalls", JSON.stringify(callsData))
            setCall_Data(callsData)
            // setIsRefreshing(true)
            loadIndex()
          } catch (error) {
            const errorData = {...callsData[0] , error:true}
            callsData.shift()
            const newdata = [ ...callsData , errorData]
            await AsyncStorage.setItem("offlineCalls", JSON.stringify(newdata))
          }
        
        }
      } catch (error) {
        console.log("error" , error)
      }
  
    }
    getData()
    return ()=>{}
  },[netInfo.isConnected , netInfo.isInternetReachable , call_data.length])

  //================================
  //delete from localstorage 
  //================================
  const deleteFromLocalStorage = async(index)=>{
    const newCallData = [...call_data]
    newCallData.splice(index, 1)
    try {
      await AsyncStorage.setItem("offlineCalls", JSON.stringify(newCallData))
      setCall_Data(newCallData)
    } catch (error) {
      console.log(error)
    }
  }

  return (<View style={{maxHeight: 220}}> 
    <FlatList
      data={call_data}
      refreshing={false}
      onRefresh={() => { console.log("refreshing") }}
      keyExtractor={(item, index) => index}
      renderItem={({ item, index }) => {
        return (
          <View key={index}>
            <CallListItem
              id={item.visit_id}
              client={item?.client?.client_name}
              region={item.client_region_title}
              is_new={item.visit_is_new}
              created_at={item.started_at}
              inPlace={"Delete"}
              status={"Loading..."}
              // period={Moment.utc(item.started_at * 1000).format("HH:mm:ss")}
              leftIcon={() => {
                return (
                  <FontAwesome5
                    name="user-cog"
                    size={24}
                    color={Colors.primary}
                  />
                );
              }}
              nextDeleteScreen="IndexCallScreen"
              ViewScreen="ViewCallScreen"
              EditScreen="CreateCallScreen"
              model="visits"
              index_path={"visits"}
              deleteFromLocalStorage ={deleteFromLocalStorage.bind(this , index)}
            />
           {item.error &&  <Error/>}
          </View>
        )
      }
      }
    />
  </View>);
}
