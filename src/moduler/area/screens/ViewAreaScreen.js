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

const ViewAreaScreen = (props) => {
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [error, setError] = useState(false);
  const myContext = useContext(context);
  const permissions = myContext.Auth_permission;
  const Area_Permissions = {
      view: permissions.includes('Area_Show'),  
      delete: permissions.includes('Area_Delete'), 
      update: permissions.includes('Area_Edit') 
  }

  let view_id;
  view_id = useSelector((state) => state.reducer.STORE_ID["areas"]);

  if (!props.route.params.added_id) {
    view_id = props.route.params.id;
  }

  const view_data = useSelector((state) => state.reducer.VIEW["areas"]);


  const dispatch = useDispatch();

  const loadRefresh = useCallback(async () => {
    setError(false);

    setIsRefreshing(true);
    try {
      await dispatch(
        view(view_id, "areas/" + view_id, "areas", myContext.userToken)
      );
    } catch (err) {
      RoutToLogin(err, props);
      setError(err);
    }
    setIsRefreshing(false);
  }, [dispatch, setError, setIsLoading]);

  useEffect(()=>{
    setIsLoading(true);
    loadRefresh().then(() => {
      setIsLoading(false);
    });
  }, [dispatch, loadRefresh]);

  if (isLoading) {
    return <Loading navigation={props.navigation} />;
  }

  if (!isLoading && !view_data) {
    return <NoData navigation={props.navigation} />;
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
      title={"Area: " + (view_data.area ? view_data.area.area_name : "")}
      navigation={props.navigation}
    >
      {error && <Text>Error loading data from the host</Text>}
      {!isLoading && (
        <Card style={{ margin: 20 }}>
          <ListItem
          permissions={Area_Permissions}
            setIsLoading={setIsLoading}
            navigation={props.navigation}
            id={view_data.area.id}
            title={view_data.area.area_name}
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
            edit_path={"areas/" + view_data.area.id + "/edit"}
            index_path={"areas"}
            delete_path={"areas/" + view_data.area.id}
          />

          <ScrollView style={{ paddingBottom: 200 }}>
            <PrintValue
              icon={
                <FontAwesome5
                  name="grip-lines"
                  size={24}
                  color={Colors.primary}
                />
              }
              printKeyVal={"Lines"}
            ></PrintValue>
            {view_data.lines !== 0 &&
              view_data.lines.map((line, index) => {
                return (
                  <PrintValue
                    key={"line_" + index}
                    printKeyVal={"Line " + (+index + 1)}
                  >
                    {line.line.line_name}
                  </PrintValue>
                );
              })}
            <View style={{ padding: 10 }}></View>

            <PrintValue
              icon={
                <FontAwesome5 name="map" size={24} color={Colors.primary} />
              }
              printKeyVal={"Regions"}
            ></PrintValue>
            {view_data.area.regions.length !== 0 &&
              view_data.area.regions.map((region, index) => {
                return (
                  <PrintValue
                    key={"region_" + index}
                    printKeyVal={"Region " + (+index + 1)}
                  >
                    
                  {`${region.state ? region.state : ""} ${
                    region.city ? ", " + region.city  : ""
                  } ${region.r_name ? ", " + region.r_name : ""}`}
                  
                  </PrintValue>
                );
              })}
            <View style={{ padding: 50 }}></View>
          </ScrollView>
        </Card>
      )}
    </BackNav>
  );
};

const styles = StyleSheet.create({});

export default ViewAreaScreen;
