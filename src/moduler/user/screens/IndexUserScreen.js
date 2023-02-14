import * as React from 'react';
import  { useCallback, useContext, useEffect, useState } from "react";
import { StyleSheet, FlatList } from "react-native";
import BackNav from "../../../navigations/BackNav";
import { useSelector, useDispatch } from "react-redux";
import NoData from "../../../components/UI/NoData";
import Loading from "../../../components/UI/Loading";
import { context } from "../../../context/AppContext";
import { index, _delete } from "../../../store/actions/action";
import ListItem from "../../../components/UI/ListItem";
// import { FontAwesome5 } from "@expo/vector-icons";
import FontAwesome5  from 'react-native-vector-icons/FontAwesome5';
import Colors from "../../../constants/Colors";
import HeaderButton from "../../../components/UI/HeaderButton";
import { CommonActions } from "@react-navigation/native";
import RoutToLogin from "../../../components/UI/RoutToLogin";
  import { Text } from "react-native-paper";

const IndexUserScreen = (props) => {
  const index_data = useSelector((state) => state.reducer.INDEX["users"]);
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [error, setError] = useState();
  const myContext = useContext(context);
  const permissions = myContext.Auth_permission

  const User_Permissions = {
    view: permissions.includes('User_Show'),  
    delete: permissions.includes('User_Delete'), 
    update: permissions.includes('User_Edit') 
  }

  const dispatch = useDispatch();

  const loadIndex = useCallback(async () => {
    setError(null);

    setIsRefreshing(true);
    try {
      await dispatch(index("users", "users", myContext.userToken));
    } catch (err) {
      RoutToLogin(err, props);
      setError(err);
    }
    setIsRefreshing(false);
  }, [setError, setIsLoading]);

  useEffect(()=>{
    const getData =() => {
      setIsLoading(true);
      loadIndex().then(() => {
        setIsLoading(false);
      });
    }
    getData()
    return ()=>{}
  }, [loadIndex]);

  

  return (
    <BackNav
      HeaderButton={
        permissions.includes('User_Create') && <HeaderButton
          name="plus"
          onPress={() => {
            const resetAction = CommonActions.reset({
              index: 0,
              routes: [
                { name: "CreateUserScreen", params: { edit_id: false } },
              ],
            });
            props.navigation.dispatch(resetAction);
          }}
        /> 
      }

      navigation={props.navigation}
    >
      {!isLoading && !index_data && <NoData navigation={props.navigation} />}
      {isLoading && <Loading noBackNav={true} navigation={props.navigation} />}
      {!isLoading && (
        <FlatList
          onRefresh={loadIndex}
          refreshing={isRefreshing}
          data={index_data}
          keyExtractor={(item) => item.id}
          renderItem={(itemData) => (
            <ListItem
              permissions={User_Permissions}
              setIsLoading={setIsLoading} 
              navigation={props.navigation}
              fontsize={14}
              id={itemData.item.id}
              deleted_at={itemData.item.deleted_at? true : false}
              title={ itemData.item.name + ": " + itemData.item.crole.name}
              subtitle={
                function () {
                  let titles = "";
                  let _data = itemData.item
                  for(let area of _data.areas ){
                    titles += (titles)? ', ' + area.area_name : area.area_name;
                  }
                  return titles;
                }()
              }
              leftIcon={() => {
                return (
                  <FontAwesome5
                    name={itemData.item.deleted_at? "trash-alt" : "user-cog" }
                    size={24}
                    color={Colors.primary}
                  />
                );
              }}
              nextDeleteScreen="IndexUserScreen"
              ViewScreen="ViewUserScreen"
              EditScreen="CreateUserScreen"
              model="users"
              edit_path={"users/" + itemData.item.id + "/edit"}
              index_path={"users"}
              delete_path={"users/" + itemData.item.id}
              restore_path={"users/" + itemData.item.id + "/restore"}
            />
          )}
        />
      )}
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

export default IndexUserScreen;