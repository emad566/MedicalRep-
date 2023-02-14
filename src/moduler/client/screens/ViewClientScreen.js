import * as React from 'react';
import  { useCallback, useContext, useEffect, useState } from "react";
import { StyleSheet, View, Text } from "react-native";
import BackNav from "../../../navigations/BackNav";
import PrintValue from "../../../components/PrintValue";
import { useSelector, useDispatch } from "react-redux";
import { Card } from "react-native-paper";
import NoData from "../../../components/UI/NoData";
import { ScrollView } from "react-native-gesture-handler";
// import {
//   FontAwesome5,
//   Fontisto,
//   MaterialCommunityIcons,
// } from "@expo/vector-icons";
import FontAwesome5  from 'react-native-vector-icons/FontAwesome5';
import Fontisto  from 'react-native-vector-icons/Fontisto';
import MaterialCommunityIcons  from 'react-native-vector-icons/MaterialCommunityIcons';
import Colors from "../../../constants/Colors";
import Loading from "../../../components/UI/Loading";
import { view } from "../../../store/actions/action";
import { context } from "../../../context/AppContext";
import ListItem from "../../../components/UI/ListItem";
import HeaderButton from "../../../components/UI/HeaderButton";
import { CommonActions } from "@react-navigation/native";
import RoutToLogin from "../../../components/UI/RoutToLogin";

const ViewClientScreen = (props) => {
  const [isLoading, setIsLoading] = useState(true);
  const myContext = useContext(context);
  const permissions = myContext.Auth_permission;
  
  const Client_Permissions = {
    view: permissions.includes('Client_Show'),  
    delete: permissions.includes('Client_Delete'), 
    update: permissions.includes('Client_Edit') 
  }

  let view_id = useSelector((state) => state.reducer.STORE_ID["clients"]);
  if (props.route.params.added_id) {
    view_id = view_id;
  } else {
    view_id = props.route.params.id;
  }


  let view_data = useSelector((state) => state.reducer.VIEW['clients']);

  if((view_data == undefined) || (view_data && view_data.id != view_id)){
    view_data = false;
  }

  const dispatch = useDispatch();

  const loadRefresh = useCallback(async () => {
    try {
      await dispatch(view(view_id, "clients/" + view_id, 'clients', myContext.userToken));
    } catch (err) {
      RoutToLogin(err, props);
    }
  }, [dispatch, setIsLoading]);

  useEffect(() => {
    setIsLoading(true);
    loadRefresh().then(() => {
      setIsLoading(false);
    });
  }, [dispatch, loadRefresh]);

  
  if (!isLoading && !view_data) {
    <NoData title="List Client: No Internet" navigation={props.navigation} />;
  }
  
  if (isLoading || !view_data) {
    <Loading title="List Client: Loading" navigation={props.navigation} />;
  }

  const style = require("../../../constants/styles");
  return (
    <BackNav
      HeaderButton={
        permissions.includes('Client_Create') &&<HeaderButton
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
      title={"Client: " + (view_data? view_data.client_name : "")}
      navigation={props.navigation}
    >
      <Card style={styles.screen}>
        <ListItem
          permissions={Client_Permissions}
          setIsLoading={setIsLoading}
          navigation={props.navigation}
          id={(view_data? view_data.id : "")}
          title={()=>{
            let title = "";
            if(view_data){
              title += view_data.client_name;
              title += (view_data.clienttype ? " (" + view_data.clienttype + ")" : "");
              title += (view_data.class ? " (" + view_data.class + ")" : "");
            }
            return title;
          }}
          subtitle={view_data? (view_data.area + ": " + view_data.region) : ""}
          leftIcon={() => {
            return (
              <FontAwesome5 name="user-cog" size={24} color={Colors.primary} />
            );
          }}
          nextDeleteScreen="IndexClientScreen"
          ViewScreen="ViewClientScreen"
          EditScreen="CreateClientScreen"
          model="clients"
          edit_path={"clients/" + (view_data? view_data.id : "") + "/edit"}
          index_path={"clients"}
          delete_path={"clients/" + (view_data? view_data.id : "")}
        />

        <ScrollView style={{ paddingBottom: 200 }}>
          <PrintValue printKey="client_name">
            {(view_data? view_data.client_name : "")}
          </PrintValue>
          <PrintValue printKeyVal="Area">{(view_data? view_data.area : "")}</PrintValue>
          <PrintValue printKey="region">{(view_data? view_data.region : "")}</PrintValue>
          <PrintValue printKey="client_email">
            {(view_data? view_data.client_email : "")}
          </PrintValue>
          <PrintValue printKey="client_phone">
            {(view_data? view_data.client_phone : "")}
          </PrintValue>
          <PrintValue printKey="client_mobile">
            {(view_data? view_data.client_mobile : "")}
          </PrintValue>
          <PrintValue printKey="clienttype">{(view_data? view_data.clienttype : "")}</PrintValue>
          <PrintValue printKey="class">{(view_data? view_data.class : "")}</PrintValue>
          <PrintValue printKey="typecategory">
            {(view_data? view_data.typecategory : "")}
          </PrintValue>
          <PrintValue printKey="ladder">{(view_data? view_data.ladder : "")}</PrintValue>
          <PrintValue printKey="fees">{(view_data? view_data.fees : "")}</PrintValue>
          <PrintValue printKey="note">{(view_data? view_data.note : "")}</PrintValue>
          <PrintValue printKey="landmark">{(view_data? view_data.landmark : "")}</PrintValue>
          <PrintValue printKey="birthdate">{(view_data? view_data.birthdate : "")}</PrintValue>

          {(view_data && view_data.whours) && (
            <Card>
              <Card.Title
                style={{ color: Colors.primary }}
                title="Work Schedule"
                left={(props) => (
                  <Fontisto
                    {...props}
                    name="date"
                    size={30}
                    color={Colors.primary}
                  />
                )}
              />
              <View style={{ paddingLeft: 20 }}>
                {view_data.whours.map((whour) => {
                  return (
                    <PrintValue
                      key={Math.random().toString()}
                      printKeyVal={whour.wday}
                    >
                      {whour.hour_from + " - " + whour.hour_to}
                    </PrintValue>
                  );
                })}
              </View>
            </Card>
          )}

          {(view_data && view_data.specialists) && (
            <Card>
              <Card.Title
                style={{ color: Colors.primary }}
                title="Specialists"
                left={(props) => (
                  <MaterialCommunityIcons
                    {...props}
                    name="focus-field"
                    size={30}
                    color={Colors.primary}
                  />
                )}
              />
              <View style={{ paddingLeft: 20 }}>
                <Text style={{ ...style.p1 }}>
                  {view_data.specialists.map((specialist) => {
                    return specialist + ", ";
                  })}
                </Text>
              </View>
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

export default ViewClientScreen;
