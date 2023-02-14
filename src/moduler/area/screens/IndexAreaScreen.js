import React from "react";
import { StyleSheet, View, Text } from "react-native";
import BackNav from "./../../../navigations/BackNav";
import { useSelector } from "react-redux";
import { useState } from "react";
import { useContext } from "react";
import { context } from "./../../../context/AppContext";
import Loading from "./../../../components/UI/Loading";
import { FlatList } from "react-native";
import FontAwesome5  from 'react-native-vector-icons/FontAwesome5';
import Colors from "../../../constants/Colors";
import { useDispatch } from "react-redux";
import { useCallback } from "react";
import { useEffect } from "react";
import { index } from "./../../../store/actions/action";
import ListItem from "./../../../components/UI/ListItem";
import HeaderButton from "../../../components/UI/HeaderButton";
import { CommonActions } from "@react-navigation/native";
import RoutToLogin from "../../../components/UI/RoutToLogin";
// import permissions from './../../../permissions';

const IndexAreaScreen = (props) => {
  const index_data = useSelector((state) => state.reducer.INDEX["areas"]);
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [error, setError] = useState();
  const myContext = useContext(context);
  const permissions = myContext.Auth_permission
  const Area_Permissions = {
          view: permissions.includes('Area_Show'),  
          delete: permissions.includes('Area_Delete'), 
          update: permissions.includes('Area_Edit') 
  }

  const dispatch = useDispatch();

  const loadIndex_data = useCallback(async () => {
    setError(null);

    setIsRefreshing(true);
    try {
      await dispatch(index("areas", "areas", myContext.userToken));
    } catch (err) {
      RoutToLogin(err, props);
      setError(err);
    }
    setIsRefreshing(false);
  }, [dispatch, setError, setIsLoading]);

  useEffect(() => {
    setIsLoading(true);
    loadIndex_data().then(() => {
      setIsLoading(false);
    });
  }, [dispatch, loadIndex_data, setIsLoading, setError]);

  if (isLoading) {
    return <Loading title="Loading" navigation={props.navigation} />;
  }

  if (!isLoading && !loadIndex_data) {
    return (
      <NoData title="NO Internet  Connection" navigation={props.navigation} />
    );
  }

  return (
    <BackNav
      HeaderButton={
        permissions.includes('Area_Create') &&  <HeaderButton
          name="plus"
          onPress={() => {
            const resetAction = CommonActions.reset({
              index: 0,
              routes: [
                { name: "CreateAreaScreen", params: { dit_id: false } },
              ],
            });
            props.navigation.dispatch(resetAction);
          }}
        />
      }
      title="List Areas"
      navigation={props.navigation}
    >
      {!isLoading && (
        <FlatList
          onRefresh={loadIndex_data}
          refreshing={isRefreshing}
          data={index_data}
          keyExtractor={(item) => item.id}
          renderItem={(itemData) => (
            <ListItem
            permissions={Area_Permissions}
              setIsLoading={setIsLoading}
              navigation={props.navigation}
              id={itemData.item.id}
              title={itemData.item.area_name}
              subtitle="" //{itemData.item.region?.r_name}
              leftIcon={() => {
                return (
                  <FontAwesome5
                    name="map-marked-alt"
                    size={24}
                    color={Colors.primary}
                  />
                );
              }}
              nextDeleteScreen="IndexAreaScreen"
              ViewScreen="ViewAreaScreen"
              EditScreen="EditAreaScreen"
              model="areas"
              edit_path={"areas/" + itemData.item.id + "/edit"}
              index_path={"areas"}
              delete_path={"areas/" + itemData.item.id}
            />
          )}
        />
      )}
    </BackNav>
  );
};

const styles = StyleSheet.create({});

export default IndexAreaScreen;
