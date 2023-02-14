
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
import ErrorArray from "../../../components/UI/ErrorArray";
import { CommonActions } from "@react-navigation/native";
import RoutToLogin from "../../../components/UI/RoutToLogin";

const IndexLineScreen = (props) => {
  const index_data = useSelector((state) => state.reducer.INDEX["lines"]);
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [error, setError] = useState();
  const myContext = useContext(context);
  const permissions = myContext.Auth_permission
  const Line_Permissions = {
          view: permissions.includes('Line_Show'),  
          delete: permissions.includes('Line_Delete'), 
          update: permissions.includes('Line_Edit') 
  }

  const dispatch = useDispatch();

  const loadIndex_data = useCallback(async () => {
    setError(null);

    setIsRefreshing(true);
    try {
      await dispatch(index("lines", "lines", myContext.userToken));
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
  }, [dispatch, loadIndex_data]);

  return (
    <BackNav
      HeaderButton={
        permissions.includes('line_Create') &&  <HeaderButton
          name="plus"
          onPress={() => {
            const resetAction = CommonActions.reset({
              index: 0,
              routes: [
                { name: "CreateLineScreen", params: { dit_id: false } },
              ],
            });
            props.navigation.dispatch(resetAction);
          }}
        />
      }
      title="List Lines"
      navigation={props.navigation}
    >
      {error && <ErrorArray error="Error in load data from server!" />}
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
            permissions={Line_Permissions}
              setIsLoading={setIsLoading}
              navigation={props.navigation}
              id={itemData.item.id}
              title={itemData.item.line_name}
              subtitle={(itemData.item && itemData.item.region )? itemData.item.region?.r_name : ""}
              leftIcon={() => {
                return (
                  <FontAwesome5
                    name="grip-lines"
                    size={24}
                    color={Colors.primary}
                  />
                );
              }}
              nextDeleteScreen="IndexLineScreen"
              ViewScreen="ViewLineScreen"
              EditScreen="CreateLineScreen"
              model="lines"
              edit_path={"lines/" + itemData.item.id + "/edit"}
              index_path={"lines"}
              delete_path={"lines/" + itemData.item.id}
            />
          )}
        />
      )}
    </BackNav>
  );
};

const styles = StyleSheet.create({});

export default IndexLineScreen;
