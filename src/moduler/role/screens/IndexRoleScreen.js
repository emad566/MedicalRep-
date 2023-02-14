import * as React from 'react';
import { StyleSheet, View, Text } from "react-native";
import BackNav from "./../../../navigations/BackNav";
import { useSelector } from "react-redux";
import { useState } from "react";
import { useContext } from "react";
import { context } from "./../../../context/AppContext";
import Loading from "./../../../components/UI/Loading";
import { FlatList } from "react-native";
// import { FontAwesome5 } from "@expo/vector-icons";
import FontAwesome5  from 'react-native-vector-icons/FontAwesome5';
import Colors from "../../../constants/Colors";
import { useDispatch } from "react-redux";
import { useCallback } from "react";
import { useEffect } from "react";
import { index } from "./../../../store/actions/action";
import ListItem from "./../../../components/UI/ListItem";
import HeaderButton from "../../../components/UI/HeaderButton";
import NoData from "../../../components/UI/NoData";
import { CommonActions } from "@react-navigation/native";
import RoutToLogin from "../../../components/UI/RoutToLogin";

const IndexRoleScreen = (props) => {
  const index_data = useSelector((state) => state.reducer.INDEX["roles"]);
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [error, setError] = useState();
  const myContext = useContext(context);
  const permissions = myContext.Auth_permission

  const Role_Permissions = {
    view: permissions.includes('Role_Show'),  
    delete: permissions.includes('Role_Delete'), 
    update: permissions.includes('Role_Edit') 
  }

  const dispatch = useDispatch();

  const loadIndex_data = useCallback(async () => {
    setError(false);
    setIsRefreshing(true);
    try {
      await dispatch(index("roles", "roles", myContext.userToken));
    } catch (err) {
      RoutToLogin(err, props);
      setError(err);
    }
    setIsRefreshing(false);
  }, [dispatch, setError, setIsLoading]);

  useEffect(()=>{
    const getData =() => {
      setIsLoading(true);
      loadIndex_data().then(() => {
        setIsLoading(false);
      });
    }
    getData()
    return ()=>{}
  }, [dispatch, loadIndex_data]);
  return (
    <BackNav
      HeaderButton={
        permissions.includes('Role_Create') && <HeaderButton
          name="plus"
          onPress={() => {
            const resetAction = CommonActions.reset({
              index: 0,
              routes: [{ name: "CreateRoleScreen", params: { dit_id: false } }],
            });
            props.navigation.dispatch(resetAction);
          }}
        />
      }
      title="List Roles"
      navigation={props.navigation}
    >
      {error && <Text>Error Loading data from server</Text>}
      {!isLoading && !index_data && <NoData navigation={props.navigation} />}
      {isLoading && <Loading noBackNav={true} navigation={props.navigation} />}
      {(!isLoading && index_data) && (
        <FlatList
          onRefresh={loadIndex_data}
          refreshing={isRefreshing}
          data={index_data.roles}
          keyExtractor={(item) => item.id}
          renderItem={(itemData) => (
            <ListItem
              permissions={Role_Permissions}
              setIsLoading={setIsLoading}
              navigation={props.navigation}
              id={itemData.item.id}
              title={itemData.item.name}
              subtitle="" //{itemData.item.region?.r_name}
              leftIcon={() => {
                return (
                  <FontAwesome5
                    name="briefcase"
                    size={24}
                    color={Colors.primary}
                  />
                );
              }}
              nextDeleteScreen="IndexRoleScreen"
              ViewScreen="ViewRoleScreen"
              EditScreen="CreateRoleScreen"
              model="roles"
              edit_path={"roles/" + itemData.item.id + "/edit"}
              index_path={"roles"}
              delete_path={"roles/" + itemData.item.id}
            />
          )}
        />
      )}
    </BackNav>
  );
};

const styles = StyleSheet.create({});

export default IndexRoleScreen;
