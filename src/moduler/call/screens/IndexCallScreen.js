import * as React from 'react';
import  { useCallback, useContext, useEffect, useState } from "react";
import { StyleSheet, View, Text, FlatList, ScrollView } from "react-native";
import BackNav from "../../../navigations/BackNav";
import { useSelector, useDispatch } from "react-redux";
import NoData from "../../../components/UI/NoData";
import Loading from "../../../components/UI/Loading";
import { context } from "../../../context/AppContext";
import { edit, index, _delete } from "../../../store/actions/action";
import CallListItem from "../components/UI/CallListItem";
// import { FontAwesome5 } from "@expo/vector-icons";
import FontAwesome5  from 'react-native-vector-icons/FontAwesome5';
import Colors from "../../../constants/Colors";
import Moment from "moment";
import HeaderButton from "../../../components/UI/HeaderButton";
import { CommonActions } from "@react-navigation/native";
import RoutToLogin from "../../../components/UI/RoutToLogin";
import Filter from "../../SearchAndFilter/Filtter";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNetInfo } from "@react-native-community/netinfo";
import { store } from './../../../store/actions/action';
// import OfflineData from "../components/OfflineCalls";
import { Card } from 'react-native-paper';
import { Button } from 'react-native-paper';
import OfflineData from './../components/OfflineCalls';
import NoInternet from "../../../components/UI/NoInternetConection";


const filterArray = [
  { inputLable: "Client Name", resultLable: "client_name" },
  { searchKey: "visitcategorys", resultLable: "visitcategory_title", searchLable: "visitcategory_title", lableName: "Visit Category" },
  { searchKey: "visittypes", resultLable: "visittype_title", searchLable: "visittype_title", lableName: "visit Type" }
  , { searchKey: "specialists", resultLable: "specialist_name", searchLable: "specialist_name", lableName: "Specialists" },
  { searchKey: "Visitstatues", resultLable: "visitstatues_title", searchLable: "visitstatues_title", lableName: "Visit Statues" },
  { search: false, searchKey: "place", resultLable: "in_out_place", searchLable: "in_out_place", lableName: "Place" },
]

const place = [
  {
    id: "1",
    in_out_place: "InPlace"
  },
  {
    id: "2",
    in_out_place: "OutPlace"
  }
]


const IndexCallScreen = (props) => {
  const netInfo = useNetInfo();
  const [index_data, setIndex_data] = useState();
  const isToday = (props.route.params.isToday !== undefined) ? props.route.params.isToday : false;

  const [isLoading, setIsLoading] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [error, setError] = useState();
  const myContext = useContext(context);
  const permissions = myContext.Auth_permission;


  //Search Value
  const [searchResult, setSearchResult] = useState(null)

  const [call_data, setCall_Data] = useState([])
  



  const dispatch = useDispatch();

  const loadIndex = useCallback(async () => {
    setError(null);

    setIsRefreshing(true);
    try {
      if (isToday)
        await dispatch(index("visit/indextoday", "visits_today", myContext.userToken));
      else
        await dispatch(index("visits", "visits", myContext.userToken));

    } catch (err) {
      RoutToLogin(err, props);
      setError(err);
    }
    setIsRefreshing(false);
  }, [dispatch, setError, setIsLoading]);

  useEffect(()=>{
    const getData =() => {
      if(netInfo.isConnected && netInfo.isConnected ){
        setIsLoading(true);
        loadIndex().then(() => {
            setIsLoading(false);
        });
      }
     
    }
    getData()
    return ()=>{}
  }, [dispatch, loadIndex , netInfo.isConnected  , netInfo.isConnected ]);

  /*====================================
  || Store / load data from storage
  ======================================*/
  useEffect(()=>{
    const getData =async() => {
      const key_name = isToday? "index_visits_today" : "index_visits" ;
      if(index_data === undefined || (index_data !== undefined && !isRefreshing)){
        let var_index_data = await AsyncStorage.getItem(key_name)
        if(var_index_data !== undefined){
          var_index_data = JSON.parse(var_index_data)
          setIndex_data(var_index_data)
        }
      }
  
      return ()=>{
        const ac =new AbortController()
        ac.abort()
      }
    }
    getData()
    return ()=>{}
  }, [setIndex_data, isRefreshing, setIsRefreshing]);



  return (
    <BackNav
      HeaderButton={
        permissions.includes('Call_Create') && <HeaderButton
          name="plus"
          onPress={() => {
            const resetAction = CommonActions.reset({
              index: 0,
              routes: [
                { name: "CreateCallScreen", params: { dit_id: false } },
              ],
            });
            props.navigation.dispatch(resetAction);
          }}
        />
      }
      title={(isToday)? "Today Calls" : "List Calls"}
      navigation={props.navigation}
    >
      {!isLoading && !index_data && !netInfo.isConnected && !netInfo.isConnected ?
        <View style={{flex:1}}>
          <OfflineData loadIndex={loadIndex} call_data={call_data} setCall_Data={setCall_Data} netInfo={netInfo} setIsRefreshing={setIsRefreshing} />
          <NoInternet />
        </View>
        :
        isLoading && !index_data ? 
        <Loading/>
        :
        <>
          {index_data?.filter && index_data?.indexArr && <Filter setSearchResult={setSearchResult} filterDataParams={{ ...index_data.filter, place: place }} data={index_data.indexArr} filter={filterArray} />}
          {/* <ScrollView> */}
          <View style={{ marginBottom:50 }}>
            <OfflineData loadIndex={loadIndex} call_data={call_data} setCall_Data={setCall_Data} netInfo={netInfo} setIsRefreshing={setIsRefreshing} />
            {/* <OfflineData /> */}

            {!isLoading && !index_data ?
              <NoData title="No Internet" navigation={props.navigation} />
              : <FlatList
                onRefresh={loadIndex}
                loading={true}
                refreshing={isRefreshing}
                data={searchResult || index_data?.indexArr}
                keyExtractor={(item) => item.visit_id}
                renderItem={(itemData) => (
                  <CallListItem
                  title ={itemData.item.client_name}
                    permissions={props.route.params.permissions}
                    isOnline={(netInfo.isConnected && netInfo.isConnected)? true : false}
                    setIsLoading={setIsLoading}
                    navigation={props.navigation}
                    id={itemData.item.visit_id}
                    client={itemData.item.client_name}
                    region={itemData.item.client_region_title}
                    is_new={itemData.item.visit_is_new}
                    created_at={itemData.item.started_at}
                    inPlace={itemData.item.in_out_place}
                    status={itemData.item.visitstatues_title}
                    period={Moment.utc(itemData.item.period * 1000).format("HH:mm:ss")}
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
                    edit_path={"visits/" + itemData.item.visit_id + "/edit"}
                    index_path={"visits"}
                    delete_path={"visits/" + itemData.item.visit_id}
                  />
                )}
              />
            }
          </View>
          {/* </ScrollView> */}
        </>
      }

    </BackNav>
  );
};

const styles = StyleSheet.create({
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default IndexCallScreen;
