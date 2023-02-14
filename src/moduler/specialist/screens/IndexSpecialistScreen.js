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

const IndexSpecialistScreen = (props) => {
  const index_data = useSelector((state) => state.reducer.INDEX["specialists"]);
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [error, setError] = useState();
  const myContext = useContext(context);
  const permissions = myContext.Auth_permission;
  
  const Specialist_Permissions = {
          view: permissions.includes('Specialist_Show'),  
          delete: permissions.includes('Specialist_Delete'), 
          update: permissions.includes('Specialist_Edit') 
  }


  const dispatch = useDispatch();

  const loadIndex_data = useCallback(async () => {
    setError(false);
    setIsRefreshing(true);
    try {
      await dispatch(index("specialists", "specialists", myContext.userToken));
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
        permissions.includes('Specialist_Create') && <HeaderButton
          name="plus"
          onPress={() => {
            const resetAction = CommonActions.reset({
              index: 0,
              routes: [
                { name: "CreateSpecialistScreen", params: { dit_id: false } },
              ],
            });
            props.navigation.dispatch(resetAction);
          }}
        />
      }
      title={"List Specialists: "}
      navigation={props.navigation}
    >
      {error && <Text>Error Loading data from server</Text>}
      {!isLoading && !index_data && <NoData navigation={props.navigation} />}
      {isLoading && <Loading noBackNav={true} navigation={props.navigation} />}
      {!isLoading && (
        <FlatList
          onRefresh={loadIndex_data}
          refreshing={isRefreshing}
          data={index_data}
          keyExtractor={(item) => item.id}
          renderItem={(itemData) => (
            <ListItem
              permissions= {Specialist_Permissions}
              setIsLoading={setIsLoading}
              navigation={props.navigation}
              id={itemData.item.id}
              title={itemData.item.specialist_name}
              subtitle="" //{itemData.item.region?.r_name}
              leftIcon={() => {
                return (
                  <FontAwesome5
                    name="codepen"
                    size={24}
                    color={Colors.primary}
                  />
                );
              }}
              nextDeleteScreen="IndexSpecialistScreen"
              ViewScreen="ViewSpecialistScreen"
              EditScreen="CreateSpecialistScreen"
              model="specialists"
              edit_path={"specialists/" + itemData.item.id + "/edit"}
              index_path={"specialists"}
              delete_path={"specialists/" + itemData.item.id}
            />
          )}
        />
      )}
    </BackNav>
  );
};

const styles = StyleSheet.create({});

export default IndexSpecialistScreen;
