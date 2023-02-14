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
import {
  Avatar,
  Caption,
  Card,
  Divider,
  Headline,
  Subheading,
} from "react-native-paper";
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

const ViewRoleScreen = (props) => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState();
  const myContext = useContext(context);
  const permissions = myContext.Auth_permission;

  let view_id = useSelector((state) => state.reducer.STORE_ID["roles"]);
  if (!props.route.params.added_id) {
    view_id = props.route.params.id;
  }
  let view_data = useSelector((state) => state.reducer.VIEW["roles"]);

  const dispatch = useDispatch();

  const loadRefresh = useCallback(async () => {
    setError(false);
    try {
      await dispatch(
        view(view_id, "roles/" + view_id, "roles", myContext.userToken)
      );
    } catch (err) {
      RoutToLogin(err, props);
      setError("Error dispatch view data from server!");
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
      title={
        "Role: " + (view_data && view_data.role ? view_data.role.name : "")
      }
      navigation={props.navigation}
    >
      {error && <Text>Error Loading data from server</Text>}
      {!isLoading && !view_data && <NoData navigation={props.navigation} />}
      {isLoading && <Loading noBackNav={true} navigation={props.navigation} />}
      <Card style={{ margin: 20 }}>
        <ListItem
          permissions={props.route.params.permissions}
          setIsLoading={setIsLoading}
          navigation={props.navigation} 
          id={( view_data? view_data.role.id : "")}
          title={( view_data? view_data.role.name : "")}
          subtitle="" //{view_data.region?.r_name}
          leftIcon={() => {
            return <></>
            // return (
            //   <FontAwesome5 name="briefcase" size={24} color={Colors.primary} />
            // );
          }}
          nextDeleteScreen="IndexRoleScreen"
          ViewScreen="ViewRoleScreen"
          EditScreen="CreateRoleScreen"
          model="roles"
          edit_path={"roles/" + ( view_data? view_data.role.id : "") + "/edit"}
          index_path={"roles"}
          delete_path={"roles/" + ( view_data? view_data.role.id : "")}
        />

        <PrintValue printKey="permissions"> </PrintValue>
        <ScrollView style={{ paddingBottom: 40, paddingHorizontal: 20 }}>
          {(view_data && view_data.role && view_data.role.permissions && view_data.role.permissions.length) ? (
            view_data.role.permissions.map((permission, index) => (
              <RowData
                key={permission.id}
                color={Colors.accent}
                label={index + 1}
                value={permission.name}
              />
            ))

            
          ) : (
            <View style={{ paddingVertical: 40, justifyContent: "center" }}>
              <Text style={{ textAlign: "center", color: "#bbb" }}>
                No permission For This role{" "}
              </Text>
            </View>
          )}

          <View style={{ paddingBottom: 120, paddingHorizontal: 20 }}></View>
        </ScrollView>
      </Card>
    </BackNav>
  );
};

const styles = StyleSheet.create({});

export default ViewRoleScreen;
