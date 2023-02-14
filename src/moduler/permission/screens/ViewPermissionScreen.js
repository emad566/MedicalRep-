import * as React from 'react';
import  { useCallback, useState } from "react";
import { StyleSheet, View, Text } from "react-native";
import BackNav from "../../../navigations/BackNav";
import { useContext } from "react";
import { context } from "../../../context/AppContext";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import Loading from "../../../components/UI/Loading";
import NoData from "../../../components/UI/NoData";
import { Card } from "react-native-paper";
// import { FontAwesome5 } from "@expo/vector-icons";
import FontAwesome5  from 'react-native-vector-icons/FontAwesome5';
import Colors from "../../../constants/Colors";
import { view } from "../../../store/actions/action";
import ListItem from "./../../../components/UI/ListItem";
import { ScrollView } from "react-native-gesture-handler";
import RowData from "../../../components/UI/RowData";
import PrintValue from "./../../../components/PrintValue";
import HeaderButton from "../../../components/UI/HeaderButton";
import { CommonActions } from "@react-navigation/native";
import RoutToLogin from "../../../components/UI/RoutToLogin";

const ViewPermissionScreen = (props) => {
  const myContext = useContext(context);
  const permissions = myContext.Auth_permission;

  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);

  let view_id = useSelector((state) => state.reducer.STORE_ID["permissions"]);
  if (!props.route.params.added_id) {
    view_id = props.route.params.id;
  }

  let view_data = useSelector((state) => state.reducer.VIEW["permissions"]);

  const dispatch = useDispatch();

  const loadRefresh = useCallback(async () => {
    setError(false);

    try {
      await dispatch(
        view(
          view_id,
          "permissions/" + view_id,
          "permissions",
          myContext.userToken
        )
      );
    } catch (err) {
      RoutToLogin(err, props);
      setError(err);
    }
  }, [dispatch, setError, setIsLoading]);

  useEffect(()=>{
    const getData =() => {
      setIsLoading(true);
      loadRefresh().then(() => {
        setIsLoading(false);
      });
    }
    getData()
    return ()=>{}
  }, [dispatch, loadRefresh]);

  return (
    <BackNav
      HeaderButton={
        permissions.includes('Permission_Create') && <HeaderButton
          name="plus"
          onPress={() => {
            const resetAction = CommonActions.reset({
              index: 0,
              routes: [
                { name: "CreatePermissionScreen", params: { dit_id: false } },
              ],
            });
            props.navigation.dispatch(resetAction);
          }}
        />
      }
      title={
        "Permission: " +
        (view_data && view_data.permission ? view_data.permission.name : "")
      }
      navigation={props.navigation}
    >
      {error && <Text>Error Loading data from server</Text>}
      {!isLoading && !view_data && <NoData navigation={props.navigation} />}
      {isLoading && <Loading noBackNav={true} navigation={props.navigation} />}
      {!isLoading && (
        <Card style={{ margin: 20 }}>
          <ListItem
            permissions={props.route.params.permissions}
            setIsLoading={setIsLoading}
            navigation={props.navigation}
            id={
              view_data && view_data.permission ? view_data.permission.id : ""
            }
            title={
              view_data && view_data.permission ? view_data.permission.name : ""
            }
            subtitle=""
            leftIcon={() => {
              return (
                <FontAwesome5 name="key" size={24} color={Colors.primary} />
              );
            }}
            nextDeleteScreen="IndexPermissionScreen"
            ViewScreen="ViewPermissionScreen"
            EditScreen="CreatePermissionScreen"
            model="permissions"
            edit_path={
              "permissions/" +
              (view_data && view_data.permission
                ? view_data.permission.id
                : "") +
              "/edit"
            }
            index_path={"permissions"}
            delete_path={
              "permissions/" +
              (view_data && view_data.permission ? view_data.permission.id : "")
            }
          />
          <PrintValue printKey="roles"> </PrintValue>
          <ScrollView style={{ paddingBottom: 40, paddingHorizontal: 20 }}>
            {view_data &&
            view_data.permission &&
            view_data.permission.roles.length ? (
              view_data.permission.roles.map((role, index) => (
                <RowData
                  key={role.id}
                  color={Colors.accent}
                  label={index + 1}
                  value={role.name}
                />
              ))
            ) : (
              <View style={{ paddingVertical: 40, justifyContent: "center" }}>
                <Text style={{ textAlign: "center", color: "#bbb" }}>
                  No Roles For This Permission{" "}
                </Text>
              </View>
            )}
          </ScrollView>
        </Card>
      )}
    </BackNav>
  );
};

const styles = StyleSheet.create({});

export default ViewPermissionScreen;
