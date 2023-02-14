import * as React from 'react';
import  { useCallback, useContext, useEffect, useState } from "react";
import { StyleSheet, View, Text, FlatList } from "react-native";
import BackNav from "../../../navigations/BackNav";
import PrintValue from "../../../components/PrintValue";
import { useSelector, useDispatch } from "react-redux";
import { Avatar, Card, Divider } from "react-native-paper";
import NoData from "../../../components/UI/NoData";
import { ScrollView } from "react-native-gesture-handler";
// import { FontAwesome5 } from "@expo/vector-icons";
import FontAwesome5  from 'react-native-vector-icons/FontAwesome5';
import Colors from "../../../constants/Colors";
import Loading from "../../../components/UI/Loading";
import { view } from "../../../store/actions/action";
import { context } from "../../../context/AppContext";
import ListItem from "../../../components/UI/ListItem";
import RowData from "../../../components/UI/RowData";
import HeaderButton from "../../../components/UI/HeaderButton";
import { CommonActions } from "@react-navigation/native";
import RoutToLogin from "../../../components/UI/RoutToLogin";
// import permissions from './../../../permissions';

const ViewUserScreen = (props) => {
  const [isLoading, setIsLoading] = useState(true);
  const myContext = useContext(context);
  const permissions = myContext.Auth_permission;

  let view_id = useSelector((state) => state.reducer.STORE_ID["users"]);
  if (props.route.params.added_id) {
    view_id = view_id;
  } else {
    view_id = props.route.params.id;
  }
  let user_role = false;
  let view_data = useSelector((state) => state.reducer.VIEW["users"]);
  if (view_data == undefined || (view_data && view_data.user.id != view_id)) {
    view_data = false;
  }else{
    user_role = view_data.user_role
    view_data = view_data.user;
  }

  const dispatch = useDispatch();
  const loadRefresh = useCallback(async () => {
    try {
      await dispatch(
        view(view_id, "users/" + view_id, "users", myContext.userToken)
      );
    } catch (err) {
      RoutToLogin(err, props);
    }
  }, [dispatch, setIsLoading]);

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

  const style = require("../../../constants/styles");
  return (
    <BackNav
      HeaderButton={
        permissions.includes('User_Create') &&  <HeaderButton
          name="plus"
          onPress={() => {
            const resetAction = CommonActions.reset({
              index: 0,
              routes: [
                { name: "CreateUserScreen", params: { dit_id: false } },
              ],
            });
            props.navigation.dispatch(resetAction);
          }}
        />
      }
      title={"User: " + props.route.params.title}
      navigation={props.navigation}
    >
      {!isLoading && !view_data && <NoData navigation={props.navigation} />}
      {isLoading && <Loading noBackNav={true} navigation={props.navigation} />}

      
        <Card style={styles.screen}>
          <ListItem
            permissions={props.route.params.permissions}
            setIsLoading={setIsLoading}
            added_id={props.route.params.added_id}
            navigation={props.navigation}
            id={view_data ? view_data.id : ""}
            title={view_data ? view_data.name : ""}
            subtitle={view_data ? view_data.email : ""}
            leftIcon={() => {
              return (
                <FontAwesome5
                  name="user-cog"
                  size={24}
                  color={Colors.primary}
                />
              );
            }}
            nextDeleteScreen="IndexUserScreen"
            ViewScreen="ViewUserScreen"
            EditScreen="CreateUserScreen"
            model="users"
            edit_path={"users/" + view_id + "/edit"}
            index_path={"users"}
            delete_path={"users/" + view_id}
          />

          <ScrollView style={{ paddingBottom: 200 }}>
            <PrintValue printKey="name">
              {view_data ? view_data.name : ""}
            </PrintValue>
            <PrintValue printKey="email">
              {view_data ? view_data.email : ""}
            </PrintValue>
            <PrintValue printKeyVal="Role">
              {user_role ? user_role.name : ""}
            </PrintValue>
            <PrintValue printKeyVal="Level Degree">
              {view_data ? view_data.user_level : "2"}
            </PrintValue>
            <PrintValue printKey="user_phone_no">
              {view_data ? view_data.user_phone_no : ""}
            </PrintValue>
            <PrintValue printKey="birthdate">
              {view_data ? view_data.birthdate : ""}
            </PrintValue>
            <Divider />

            {view_data && view_data.areas && view_data.areas.length > 0 && (
              <Card>
                <Card.Title
                  titleStyle={{ color: Colors.scandry }}
                  title="Areas"
                  left={(props) => (
                    <Avatar.Icon
                      color={Colors.scandry}
                      style={{ backgroundColor: "#fff" }}
                      {...props}
                      icon="layers"
                    />
                  )}
                />
                <Card.Content>
                  {view_data &&
                    view_data.areas &&
                    view_data.areas.map((areas, index) => (
                      <View key={"area_" + index}>
                        <RowData label={index + 1} value={areas.area_name} />
                        {areas.lines.length > 0 && (
                          <PrintValue
                            key={"Pline_" + index}
                            printKeyVal="Lines"
                          >
                            {areas.lines.map((line, index) => (
                              <Text key={"line_" + index}>
                                {line.line_name},{" "}
                              </Text>
                            ))}
                          </PrintValue>
                        )}
                      </View>
                    ))}
                </Card.Content>
              </Card>
            )}
            <View style={{ padding: 50 }}></View>
          </ScrollView>
        </Card>
    </BackNav>
  );
};

const styles = StyleSheet.create({
  screen: {
    margin: 10,
    borderRadius: 10,
  },
  iconContainer: {
    flexDirection: "row",
  },
});

export default ViewUserScreen;
