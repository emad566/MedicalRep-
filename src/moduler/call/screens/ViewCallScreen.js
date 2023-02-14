import * as React from 'react';
// import { FontAwesome5, MaterialIcons } from "@expo/vector-icons";
import MaterialIcons  from 'react-native-vector-icons/MaterialIcons';
import FontAwesome5  from 'react-native-vector-icons/FontAwesome5';
import { useNetInfo } from "@react-native-community/netinfo";
import { CommonActions } from "@react-navigation/native";
import Moment from "moment";
import  { useCallback, useContext, useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import MapView, { Marker } from "react-native-maps";
import { Button, Card, Text } from "react-native-paper";
import { useDispatch, useSelector } from "react-redux";
import PrintValue from "../../../components/PrintValue";
import HeaderButton from "../../../components/UI/HeaderButton";
import ListItem from "../../../components/UI/ListItem";
import Loading from "../../../components/UI/Loading";
import LoadingBtn from "../../../components/UI/LoadingBtn";
import NoData from "../../../components/UI/NoData";
import NoInternet from "../../../components/UI/NoInternetConection";
import RoutToLogin from "../../../components/UI/RoutToLogin";
import Colors from "../../../constants/Colors";
import { context } from "../../../context/AppContext";
import BackNav from "../../../navigations/BackNav";
import { api, view } from "../../../store/actions/action";
const style = require("../../../constants/styles");

const ViewCallScreen = (props) => {
  const netInfo = useNetInfo();
  const [isLoading, setIsLoading] = useState(true);
  const [loading, setLoading] = useState(false);
  const myContext = useContext(context);
  const permissions = myContext.Auth_permission;
  const reload = (props.route.params.reload !== undefined) ? props.route.params.reload : false;

  const Call_permission = {
    create: permissions.includes('Call_Create'),
    update: permissions.includes('Call_Show'),
    delete: permissions.includes('Call_Delete'),
    view: permissions.includes('Call_Edit'),
    reject: permissions.includes('Call_Reject'), 
    approve: permissions.includes('Call_approve') ,
  }

  let view_id = useSelector((state) => state.reducer.STORE_ID["visits"]);
  if (props.route.params.added_id) {
    view_id = view_id;
  } else {
    view_id = props.route.params.id;
  }

  let view_data = useSelector((state) => state.reducer.VIEW["visits"]);
  let allData = false;

  if (view_data !== undefined) {
    allData = view_data
    view_data = view_data.json;
  } else {
    view_data = false;
  }

  if (view_data && view_data.id != view_id) {
    view_data = false;
    allData=false
  }
  const dispatch = useDispatch();

  const loadViews = useCallback(async () => {
    try {
      await dispatch(
        view(view_id, "visits/" + view_id, "visits", myContext.userToken)
      );
    } catch (err) {
      RoutToLogin(err, props);
    }
  }, [dispatch, setIsLoading, reload]);

  useEffect(()=>{
    const getData =() => {
      setIsLoading(true);
      loadViews().then(() => {
        setIsLoading(false);
      });
      return ()=>{
        const ac =new AbortController()
        ac.abort()
      }
    }
    getData()
    return ()=>{}
  }, [dispatch, loadViews]);

  /*====================================
  || on Accept or refuse
  ======================================*/
  const onSubmit = useCallback(
    async (status) => {
      setLoading(true);
      try {
        const data = { visit_id: view_id, status_id: status };
        await dispatch(
          api("visit/change_status", "POST", data, myContext.userToken)
        );
        await dispatch(
          view(view_id, "visits/" + view_id, "visits", myContext.userToken)
        );
      } catch (err) {
        RoutToLogin(err, props);
      }
      setLoading(false);
    },
    [onSubmit]
  );

  /*====================================
  || Loading or No data
  ======================================*/
  if (netInfo.isConnected === false || netInfo.isInternetReachable === false) {
    return <NoInternet title="Call: No Internet" navigation={props.navigation} />;
  }

  if (!isLoading && !view_data ) {
    return <NoData title="Call: No Data" navigation={props.navigation} />;
  }

  const pinColor_orange='#f90';
  const pinColor_blue='#00f';


  return (
    <BackNav
      HeaderButton={
        permissions.includes('Call_Create') && <HeaderButton
          name="plus"
          onPress={() => {
            const resetAction = CommonActions.reset({
              index: 0,
              routes: [{ name: "CreateCallScreen", params: { dit_id: false } }],
            });
            props.navigation.dispatch(resetAction);
          }}
        />
      }
      title={"Call: " + (view_data ? view_data.client : "")}
      navigation={props.navigation}
    >
      {(loading || isLoading || !view_data) && (
        <Loading
          title="Loading Call"
          navigation={props.navigation}
          noBackNav={true}
        />
      )}
      <Card style={styles.screen}>
        <ListItem
          permissions={Call_permission}
          setIsLoading={setIsLoading}
          navigation={props.navigation}
          id={view_data ? view_data.id : ""}
          title={view_data ? view_data.client : ""}
          subtitle={view_data ? view_data.region : ""}

          leftIcon={() => {
            return (
              <FontAwesome5 name={"user-md"} size={24} color={Colors.primary} />
            );
          }}

          nextDeleteScreen="IndexCallScreen"
          ViewScreen="ViewCallScreen"
          EditScreen="CreateCallScreen"
          model="visits"
          edit_path={"visits/" + (view_data ? view_data.id : "") + "/edit"}
          index_path={"visits"}
          delete_path={"visits/" + (view_data ? view_data.id : "")}
        />

        <ScrollView style={{ maxHeight: "70%" }}>
          {(view_data !== undefined && view_data.client !== undefined
          && +view_data.map_lat && +view_data.map_long
          ) && (
            <View style={{ height: 200 }}>
              <MapView
                style={{ flex: 1 }}
                initialRegion={{
                  latitude: +view_data.map_lat,
                  longitude: +view_data.map_long,
                  latitudeDelta: 0.0922,
                  longitudeDelta: 0.0421,
                }}
              >
                <Marker
                  key={1}
                  coordinate={{
                    latitude: +view_data.map_lat,
                    longitude: +view_data.map_long
                  }}
                  title={"Visit Location"}
                  description={"Desc"}
                  // image={{ uri: "custom_pin" }}
                  pinColor={pinColor_blue}
                />
                {(+view_data.map_long_client && view_data.map_lat_client) && <Marker
                  key={2}
                  coordinate={{
                    latitude: +view_data.map_lat_client,
                    longitude: +view_data.map_long_client
                  }}
                  title={"Client Location"}
                  description={view_data.client.client_name}
                  // image={{ uri: "custom_pin" }}
                  pinColor={pinColor_orange}
                />}
              </MapView>
            </View>
          )}
          {view_data && view_data.created_at != "" && (
            <PrintValue printKeyVal="Date">{view_data.created_at}</PrintValue>
          )}
          {view_data && view_data.rep != "" && (
            <PrintValue printKeyVal="Medical Rep">{view_data.rep}</PrintValue>
          )}
          {view_data && view_data.client != "" && (
            <PrintValue printKeyVal="Client">{view_data.client}</PrintValue>
          )}
          {view_data && view_data.comment != "" && (
            <PrintValue printKeyVal="Comment">{view_data.comment}</PrintValue>
          )}
          {view_data && view_data.region != "" && (
            <PrintValue printKeyVal="Address">{view_data.region}</PrintValue>
          )}
          {view_data && view_data.visittype != "" && (
            <PrintValue printKeyVal="Type">{view_data.visittype}</PrintValue>
          )}
          {view_data && view_data.double_user != "" && (
            <PrintValue printKeyVal="Double Rep">
              {view_data.double_user}
            </PrintValue>
          )}
          {view_data && view_data.trible_user != "" && (
            <PrintValue printKeyVal="Trible Rep">
              {view_data.trible_user}
            </PrintValue>
          )}
          {view_data && view_data.visit_statues != "" && (
            <PrintValue printKeyVal="Statues">
              {view_data.visit_statues}
            </PrintValue>
          )}
          {view_data && view_data.clienttype != "" && (
            <PrintValue printKeyVal="Client Type">
              {view_data.clienttype}
            </PrintValue>
          )}
          {view_data && view_data.typecategory != "" && (
            <PrintValue printKeyVal="Category">
              {view_data.typecategory}
            </PrintValue>
          )}
          {view_data && view_data.class != "" && (
            <PrintValue printKeyVal="Class">{view_data.class}</PrintValue>
          )}
          {view_data && view_data.landmark != "" && (
            <PrintValue printKeyVal="Landmark">{view_data.landmark}</PrintValue>
          )}
          {view_data && view_data.client_phone != "" && (
            <PrintValue printKeyVal="Phone">
              {view_data.client_phone}
            </PrintValue>
          )}
          {view_data && view_data.ladder != "" && (
            <PrintValue printKeyVal="Ladder">{view_data.ladder}</PrintValue>
          )}
          {view_data && view_data.visitmessage != "" && (
            <PrintValue printKeyVal="Message">
              {view_data.visitmessage}
            </PrintValue>
          )}
          {view_data && view_data.visitcategory != "" && (
            <PrintValue printKeyVal="Category">
              {view_data.visitcategory}
            </PrintValue>
          )}
          {view_data && view_data.specialists != "" && (
            <PrintValue printKeyVal="Specialists">
              {view_data.specialists}
            </PrintValue>
          )}
          {view_data && view_data.nextvisitobj != "" && (
            <PrintValue printKeyVal="Next Object">
              {view_data.nextvisitobj}
            </PrintValue>
          )}
          {view_data && view_data.period != "" && (
            <PrintValue printKeyVal="Period">
              {Moment.utc(view_data.period * 1000).format("HH:mm:ss")}
            </PrintValue>
          )}

          {view_data && view_data.map_acc != "" && (
            <PrintValue printKeyVal="Accuracy">{view_data.map_acc}</PrintValue>
          )}
          
          {view_data && (
            
            <View>
              <PrintValue printKeyVal="Call cleints Servay">{" "}</PrintValue>
              {allData.visit_client_ids.map((c, index)=>(
                <View style={{ borderLeftWidth:2, borderLeftColor:"red", marginLeft:10, paddingLeft:0 }} key={"Callproducts"+index}>
                  <PrintValue printKeyVal="--">{index+1}</PrintValue>
                  <PrintValue printKeyVal="Type">{c.type}</PrintValue>
                  <PrintValue printKeyVal="Client Name">{c.client.client_name}</PrintValue>
                  <PrintValue printKeyVal="Product">{c.product.Product_Name}</PrintValue>
                  <PrintValue printKeyVal="Consumption">{c.client.consumption}</PrintValue>
                  <PrintValue printKeyVal="Stock">{c.client.stock}</PrintValue>
                  <PrintValue printKeyVal="Comment">{c.comment}</PrintValue>
                </View>
              ))}
            </View>
          )}

          <View style={{ padding: 10 }}></View>
        </ScrollView>

        {!loading && view_data && (
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-around",
              marginVertical: 20,
              marginBottom: 40,
            }}
          > 
            {Call_permission?.approve && (view_data!== undefined && view_data.visit_statues !== "Approved" ) && 
              (<Button
              loading={loading}
              color={Colors.accent}
              icon={() => {
                return <MaterialIcons name="check" size={24} color="white" />;
              }}
              mode="contained"
              onPress={() => onSubmit(30)}
            >
              Approve
            </Button>)}

            {Call_permission?.reject && (view_data!== undefined && view_data.visit_statues !== "Rejected" ) && 
              (<Button
              loading={loading}
              color={Colors.primary}
              icon={() => {
                if (loading) {
                  return <LoadingBtn />;
                }
                return (
                  <MaterialIcons name="error-outline" size={24} color="white" />
                );
              }}
              mode="contained"
              onPress={() => onSubmit(50)}
            >
              Reject
            </Button>)}
          </View>
        )}

        {loading && (
          <View
            style={{
              padding: 10,
              borderWidth: 2,
              borderColor: "red",
              width: 100,
              height: 60,
              marginVertical: 20,
              justifyContent: "center",
              alignContent: "center",
              alignSelf: "center",
            }}
          >
            <LoadingBtn />
          </View>
        )}
      </Card>
    </BackNav>
  );
};

const styles = StyleSheet.create({
  screen: {
    margin: 10,
    marginBottom: 0,
    borderRadius: 10,
    paddingBottom: 0,
  },
  iconContainer: {
    flexDirection: "row",
  },
});

export default ViewCallScreen;
