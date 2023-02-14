import * as React from 'react';

import { useCallback, useContext, useEffect, useRef, useState } from "react";
import { StyleSheet, FlatList, View } from "react-native";
import BackNav from "../../../navigations/BackNav";
import { useSelector, useDispatch } from "react-redux";
import NoData from "../../../components/UI/NoData";
import Loading from "../../../components/UI/Loading";
import { context } from "../../../context/AppContext";
import ListItemClient from "../components/ListItemClient";
import FontAwesome5  from 'react-native-vector-icons/FontAwesome5';
import { api, _delete } from "../../../store/actions/action";
import Colors from "../../../constants/Colors";
import HeaderButton from "../../../components/UI/HeaderButton";
import { Caption, Snackbar, Text } from "react-native-paper";
import RoutToLogin from "../../../components/UI/RoutToLogin";
import Filter from './../../SearchAndFilter/Filtter';



const filterArray = [
  {inputLable:"Client Name" , resultLable:"client_name"  },
  {searchKey: "clienttypes" ,  resultLable:  "clienttype", searchLable:"clienttype_name" , lableName: "Client Type" } ,
  {searchKey: "classes" ,  resultLable:"class", searchLable:"class_name" , lableName:"Classe"}
  , {searchKey: "typecategorys" , resultLable:"typecategory",   searchLable:"typecategory_name" , lableName:"Type categorys"} ,
  {searchKey: "specialists" , resultLable:"specialists",  searchLable:"specialist_name" , lableName: "Specialists"} ,
  {searchKey: "regions" , resultLable:"region",  searchLable:"state_name" , lableName: "Region"},
]

const ClientsAutoScreen = (props) => {
  

  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);
  const [saveLoading, setSaveLoading] = useState(false);

  const [isRefreshing, setIsRefreshing] = useState(false);
  const componentMounted = useRef(true);
  const myContext = useContext(context);
 
  //Search Value
  const [searchResult , setSearchResult] = useState(null)
  const [myClientList, setMyClientList] = useState(false);

  

  const dispatch = useDispatch();
  const [isdispatched, setIsdispatched] = useState(false);
  const loadIndex_data = useCallback(async () => {
    setIsRefreshing(true);
    try {
      await dispatch(api("users/clients/auto", "post", {}, myContext.userToken, "clientsauto"));
      setIsdispatched(true)
    } catch (err) {
      RoutToLogin(err, props);
    }
    setIsRefreshing(false);
  }, [setIsLoading]);

  const index_data = useSelector((state) => state.reducer.API["clientsauto"]);
  if(index_data != undefined && myClientList === false && isdispatched ){
    setMyClientList(index_data.selected_client_ids);
  }

  useEffect(() => {
    setIsLoading(true);
    loadIndex_data().then(() => {
      if (componentMounted.current) {
        setIsLoading(false);
      }
    });
    return () => { 
        componentMounted.current = false;
    }

  }, [loadIndex_data]);


  //===============================
  // Submit Specialist Data
  //===============================
  const onSubmit = async () => {
    setError(false);
    setIsLoading(true);
    const inserted_date = {
      client_ids: myClientList
    };
    try {
        await dispatch(
          api("users/clients/myclientstore", "POST", inserted_date, myContext.userToken, "myclientstore")
        );
        setIsLoading(false);
        setSaveLoading(true);
    } catch (e) {
      RoutToLogin(e, props);
      if (e.type == "server") {
        setIsLoading(false);
        if (e.error.msg) {
          setServerErrorMsg(e.error.msg);
        }
        if (e.error.errors) {
          setServerErrors(e.error.errors);
        }
      } else {
        setError("Erorr dipaatch data");
      }
    }
  };

  const listAllCount = (index_data !== undefined ) ? index_data.user_clients.length : 0;
  
  if (isLoading && !isdispatched) {
    return (<Loading title="ClientsAuto: Loading" navigation={props.navigation} />);
  }

  if (!isLoading && !index_data) {
    <NoData title="Client: No Internet" navigation={props.navigation} />;
  }

  if(index_data !== undefined && index_data.user_clients.length<1){
    return (
      <BackNav
        title={"My auto list"}
        navigation={props.navigation}
      >
        <View>
          <Caption style={{ marginTop:150, fontSize:26, lineHeight:40, color:"red", textAlign:'center' }}>There are no any client in your area & Lines!</Caption>
        </View>
      </BackNav>
    );
  }
  

  return (
    <BackNav
      HeaderButton={
        <View>
          <Text>{myClientList.length}/{ listAllCount }</Text>
          <HeaderButton isLoading={isLoading} name="check" onPress={onSubmit} />
        </View>
      }
      navigation={props.navigation}
    >
      <Snackbar
            visible={saveLoading}
            duration={1000}
            style={styles.SnackbarStyle}
            onDismiss={()=>{setSaveLoading(false)}}
          >
            {"Save Successfully"}
      </Snackbar>

          {index_data?.filter && <Filter  setSearchResult={setSearchResult} filterDataParams={index_data.filter} data ={index_data.user_clients} filter={filterArray}/>}

      {index_data !== undefined && <FlatList
        style={{ zIndex:10 }}
        onRefresh={loadIndex_data}
        refreshing={isRefreshing}
        data={searchResult || index_data.user_clients}
        keyExtractor={(item) => item.id}
        renderItem={(itemData) => (
          <ListItemClient
            myClientList={myClientList}
            setMyClientList={setMyClientList}
            setIsLoading={setIsLoading}
            navigation={props.navigation}
            client_id={itemData.item.id}
            itemClientId = {index_data.selected_client_ids.filter((c)=>c==itemData.item.id)}
            title={
              itemData.item.client_name +
              " (" +
              itemData.item.clienttype +
              ")" +
              " (" +
              itemData.item.class +
              ")" +
              " (" +
              itemData.item.client_class_min_freq +
              ")"
            }
            subtitle={itemData.item.area + ": " + itemData.item.region}
            leftIcon={() => {
              return (
                <FontAwesome5
                  name="user-cog"
                  size={24}
                  color={Colors.primary}
                />
              );
            }}
          />
        )}
      />}
    </BackNav>
  );
};

const styles = StyleSheet.create({
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  SnackbarStyle:{
    backgroundColor: "#4BB543",
    justifyContent: "center",
    color: "green",
    zIndex:20
  }
});

export default ClientsAutoScreen;