import * as React from 'react';
import  { useCallback, useContext, useEffect, useRef, useState } from "react";
import { StyleSheet, FlatList } from "react-native";
import BackNav from "../../../navigations/BackNav";
import { useSelector, useDispatch } from "react-redux";
import NoData from "../../../components/UI/NoData";
import Loading from "../../../components/UI/Loading";
import { context } from "../../../context/AppContext";
import ListItem from "../../../components/UI/ListItem";
// import { FontAwesome5 } from "@expo/vector-icons";
import FontAwesome5  from 'react-native-vector-icons/FontAwesome5';
import { index, _delete } from "../../../store/actions/action";
import Colors from "../../../constants/Colors";
import HeaderButton from "../../../components/UI/HeaderButton";
import { CommonActions } from "@react-navigation/native";
import RoutToLogin from "../../../components/UI/RoutToLogin";
import Filter from "../../SearchAndFilter/Filtter";
// import Filter from "../components/Filtter";
// import permissions from './../../../permissions';


const filterArray = [
  {inputLable:"Client Name" , resultLable:"client_name"},
  {searchKey: "clienttypes" ,  resultLable:"clienttype", searchLable:"clienttype_name" , lableName: "Client Type" } ,
  {searchKey: "classes" ,  resultLable:"class", searchLable:"class_name" , lableName:"Classe"}
  , {searchKey: "typecategorys" , resultLable:"typecategory",   searchLable:"typecategory_name" , lableName:"Type categorys"} ,
  {searchKey: "specialists" , resultLable:"specialists",  searchLable:"specialist_name" , lableName: "Specialists"} ,
  {searchKey: "regions" , resultLable:"region",  searchLable:"state_name" , lableName: "Region"},
]

const IndexClientScreen = (props) => {
  const index_data = useSelector((state) => state.reducer.INDEX["clients"]);
  const [searchResult , setSearchResult] = useState(null)

  
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const componentMounted = useRef(true);
  const myContext = useContext(context);
  const permissions = myContext.Auth_permission


  const Client_Permissions = {
      view: permissions.includes('Client_Show'),  
      delete: permissions.includes('Client_Delete'), 
      update: permissions.includes('Client_Edit') 
  }

  const dispatch = useDispatch();
  const loadIndex_data = useCallback(async () => {
    setIsRefreshing(true);
    try {
      await dispatch(index("clients", "clients", myContext.userToken));
    } catch (err) {
      RoutToLogin(err, props);
    }
    setIsRefreshing(false);
  }, [setIsLoading]);

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

  if (isLoading) {
    <Loading title="Client: Loading" navigation={props.navigation} />;
  }

  if (!isLoading && !index_data?.clients) {
    <NoData title="Client: No Internet" navigation={props.navigation} />;
  }
  return (
    <BackNav
      HeaderButton={
        permissions.includes('Client_Create') && <HeaderButton
          name="plus"
          onPress={() => {
            const resetAction = CommonActions.reset({
              index: 0,
              routes: [
                { name: "CreateClientScreen", params: { dit_id: false } },
              ],
            });
            props.navigation.dispatch(resetAction);
          }}
        />
      }
      navigation={props.navigation}
    >
      <>
      {index_data?.filter && <Filter  setSearchResult={setSearchResult} filterDataParams={index_data.filter} data ={index_data.clients} filter={filterArray}/>}


      <FlatList
        onRefresh={loadIndex_data}
        refreshing={isRefreshing}
        data={searchResult || index_data?.clients }
        keyExtractor={(item) => item.id}
        renderItem={(itemData) => (
          <ListItem
            permissions={Client_Permissions}
            setIsLoading={setIsLoading}
            navigation={props.navigation}
            id={itemData.item.id}
            title={
              itemData.item.client_name +
              " (" +
              itemData.item.clienttype +
              ")" +
              " (" +
              itemData.item.class +
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
            nextDeleteScreen="IndexClientScreen"
            ViewScreen="ViewClientScreen"
            EditScreen="CreateClientScreen"
            model="clients"
            edit_path={"clients/" + itemData.item.id + "/edit"}
            index_path={"clients"}
            delete_path={"clients/" + itemData.item.id}
          />
        )}
      />
      </>
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

export default IndexClientScreen;
