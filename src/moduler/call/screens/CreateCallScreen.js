import * as React from 'react';
import { View, StyleSheet, ScrollView, Platform, TouchableOpacity } from "react-native";
import Colors from "../../../constants/Colors";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { Button, Caption, Text } from "react-native-paper";
import { useCallback, useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Loading from "../../../components/UI/Loading";
import AntDesign  from 'react-native-vector-icons/AntDesign';
import Fontisto  from 'react-native-vector-icons/Fontisto';
import MaterialCommunityIcons  from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons  from 'react-native-vector-icons/MaterialIcons';
import BackNav from "../../../navigations/BackNav";
import { create, store, update } from "../../../store/actions/action";
import { context } from "../../../context/AppContext";
import Accrodion from "../../../components/UI/Accrodion";
import AccountInfo from "../components/UI/AccountInfo";
import AccountInfo2 from "../components/UI/AccountInfo2";
import DropDownList from "../../../components/UI/DropDown";
import CallPreparation from "../components/UI/CallPreparation";
import CorporationPortal from "../components/UI/CorporationPortal";
import { Dropdown } from "sharingan-rn-modal-dropdown";
import CustomInput from "../../../components/UI/CustomInput";
import Moment from "moment";
import HeaderButton from "../../../components/UI/HeaderButton";
// import * as Location from "expo-location";
import GetLocation from 'react-native-get-location'
import LoadingBtn from "../../../components/UI/LoadingBtn";
import ErrorArray from "../../../components/UI/ErrorArray";
import RoutToLogin from "../../../components/UI/RoutToLogin";
import { useNetInfo } from '@react-native-community/netinfo';
import AsyncStorage from "@react-native-async-storage/async-storage";

const schema = yup.object({
  ladder_id: yup.number().nullable().max(9999999),
  visitmessage_id: yup.number().nullable().max(9999999),
  visitcategory_id: yup.number().required().max(999),
  visittype_id: yup.number().default(10).required().max(9999999),
  comment: yup.string().required().max(191),
  nextvisitobj: yup.string().nullable().default("").max(191),
});

function CreateCallScreen(props) {
  const dispatch = useDispatch();
  //internet info
  const netInfo = useNetInfo();
  // For load dispatch dat
  const [loading, setLoading] = useState(false);
  // For first load screen
  const [screenLoading, setScreenLoading] = useState(true);


  // Load userToken
  const myContext = useContext(context);

  // To store client type on client dropdown change (AM, PH, PM)
  const [clienttype, setClienttype] = useState(false);
  // To store address of client at client dropdown change
  const [address, setAddress] = useState(false);
  // Store on returned server error msg on submit
  const [errMSGs, setErrMSGs] = useState("");
  // Set is visitble for model of call preparation
  const [visible, setVisible] = useState(false);
  //Server Errors
  const [serverErrors, setserverErrors] = useState(false);
  // is cliet id Outoflist mylist
  const [outoflist, setOutoflist] = useState(false);

  const [dt, setDt] = useState(new Date());


  useEffect(()=>{
    const getData =() => {
      if (netInfo.isConnected === false || netInfo.isInternetReachable === false) {
        setScreenLoading(false)
      }
    }
    getData()
    return ()=>{}
  }, [netInfo.isConnected, netInfo.isInternetReachable])


  /*====================================
  || Get user location
  ======================================*/
  const [location, setLocation] = useState(0);
  // const [location, setLocation] = useState(1);


  const [refreshlocation, setRefreshlocation] = useState(1);
  const [errorMsg, setErrorMsg] = useState(null);

  useEffect(() => {
      const getLocaltion = (async () => {
        try {
          let location = await GetLocation.getCurrentPosition({ enableHighAccuracy: true,timeout: 20000,})
          setLocation(location);
        } catch (error) {
            console.log(error)
        }
      });
      getLocaltion()
  }, [refreshlocation, setRefreshlocation, location, setLocation]);

  /*====================================
  || if not edit screen then Load create data 
  ======================================*/
  const [isdispatched, setIsdispatched] = useState(false)
  const gitdata = useCallback(async () => {
    try {
      if ( !props.route.params.edit_id ,!netInfo.isConnected || !netInfo.isInternetReachable) {
        let create_data = await AsyncStorage.getItem("DataToCreateCall")

        create_data = await JSON.parse(create_data)
        setCreate_Data(create_data)
        setScreenLoading(false);
      } else {

        await dispatch(create("visits/create", "visits", myContext.userToken));
        setIsdispatched(1)
      }
      setScreenLoading(false);
    } catch (err) {
      RoutToLogin(err, props);
    }

  }, [netInfo.isConnected, netInfo.isInternetReachable]);


  useEffect(()=>{
    const getData =() => {
      if (!props.route.params.edit_id ? true : false) {
        gitdata();
      } else {
        setScreenLoading(false);
      }
  
      return ()=>{
        const ac =new AbortController()
        ac.abort()
      }
    }
    getData()
    return ()=>{}
  }, [gitdata]);

  /*====================================
  || Select create/edit data from state
  || Edit data was already dispached in the parent screen
  ======================================*/
  let edit_item_data = null;
  let edit_date = useSelector((state) => state.reducer.EDIT["visits"]);
  let create_data_selector = useSelector((state) => state.reducer.CREATE["visits"]);
  const [create_data, setCreate_Data] = useState(create_data_selector);

  useEffect(()=>{
    const getData =()=>{
      if (props.route.params.edit_id) {
        // create_data = edit_date;
        setCreate_Data(edit_date)
        edit_item_data = edit_date?.edit_data;
        setVisitType(edit_item_data.visittype.id)
      }
    }
    getData()
    return ()=>{}
  },[props.route.params.edit_id ])
  
  if (props.route.params.edit_id) {
      edit_item_data = edit_date?.edit_data;
  }

  /*====================================
  || If Edit screen then select default clients_products
  ======================================*/
  useEffect(()=>{
    const getData =() => {
      if (props.route.params.edit_id) {
        handelClient_idChange(edit_item_data?.client_id);
        setVisit_ph_servay_ids(edit_item_data?.clients_products);
      }
      
      if (props.route.params.plan_client_id) {
        handelClient_idChange(props.route.params.plan_client_id);
      }

      setCreate_Data(create_data_selector)
      setIsdispatched(2)
    }
    getData()
    return ()=>{}
  }, [edit_item_data?.client_id , props.route.params.edit_id, create_data, create_data_selector, isdispatched]);

  // In Edit Screen set client_id for client account input
  const [client_id, setClient_id] = useState([0]);

  /*====================================
  || To handle required changes on  dropdown account changed
  ||  1- Set new client_id
  ||  2- Set new client address
  ||  3- Set new clienttype: AM, PH, PM
  ||  4- Reset Visit_ph_servay_ids to [], the selected client with products
  ======================================*/
  let client;
  const handelClient_idChange = (value) => {
    const clients = create_data?.clients;
    
    client = clients?.filter((c) => c["id"] == value);
    if(clients !== undefined){
      if (client?.length > 0) {
        setAddress("[" + client[0]?.clienttype + "] " + client[0]?.region);
        setClienttype(client[0]?.clienttype);
      } else {
        setOutoflist(true);
      }
      // setClient_id(value)
      setClient_id(value);
      setVisit_ph_servay_ids([]);
    }
      
  };
 
  /*====================================
  || react-hook-form settings 
  ======================================*/

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: edit_item_data
      ? {
        ladder_id: +edit_item_data?.ladder_id,
        visitmessage_id: edit_item_data?.visitmessage_id,
        visitcategory_id: edit_item_data?.visitcategory_id,
        visittype_id: edit_item_data?.visittype_id,
        double_user_id: edit_item_data?.double_user_id,
        trible_user_id: edit_item_data?.trible_user_id,
        specialist_id: edit_item_data?.specialist_id,
        comment: edit_item_data?.comment,
        nextvisitobj: edit_item_data?.nextvisitobj,
        visit_ph_servay_ids: edit_item_data?.visit_ph_servay_ids,
      }
      : {
        visitcategory_id: 10,
      },
  });

  /*====================================
  || OnSubmit actions
  ||  1- check validation for inputs which are not handeled in yup
  ||  2- Collect Inserted Data
  ||  3- dipactch data to the server
  ======================================*/
  const onSubmit = async (data) => {
    setLoading(true);
    let msgs = "";

    if (location == false) {
      msgs += "Please update the location, ";
    }

    if (client_id == "") {
      msgs += "Client Account is Required, ";
    }

    if (clienttype == "AM" && !data.specialist_id) {
      msgs += "Specialist is Required, ";
    }

    if (!visitType) {
      msgs += "Call type is Required, ";
    }

    if (visitType == "20" && !data.double_user_id) {
      msgs += "Double user is Required, ";
    }

    if (visitType == "30" && (!data.double_user_id || !data.trible_user_id)) {
      if (!data.double_user_id) {
        msgs += "Double user is Required, ";
      }
      if (!data.trible_user_id) {
        msgs += "Trible is Required, ";
      }
    }

    if (data.comment.trim().length == 0) {
      msgs += "Comment is Required, ";
    }

    if (visit_ph_servay_ids?.length < 1) {
      msgs += "Call Preparation is Required, ";
    }

    if (msgs != "") {
      setErrMSGs(msgs);
      setLoading(false);
      return;
    } else {
      setErrMSGs("");
    }
    const inserted_date = {
      client_id: Array.isArray(client_id) ? client_id[0] : client_id,
      ladder_id: data.ladder_id ? data.ladder_id : "",
      visitmessage_id: data.visitmessage_id ? data.visitmessage_id : "",
      visitcategory_id: data.visitcategory_id,
      visittype_id: visitType,
      double_user_id: data.double_user_id,
      trible_user_id: data.trible_user_id,
      specialist_id: data.specialist_id,
      comment: data.comment,
      nextvisitobj: data.nextvisitobj,
      visit_ph_servay_ids: visit_ph_servay_ids,
      visit_client_ids: visit_ph_servay_ids,
      started_at: dt,
      map_long: location?.longitude,
      map_lat: location?.latitude,
      map_acc: location?.accuracy,
      ended_at: new Date(),
    };

    try {
      if (edit_item_data) {
        await dispatch(
          update(
            props.route.params.edit_id,
            inserted_date,
            "visits/" + props.route.params.edit_id,
            "visits",
            myContext.userToken
          )
        );
        setLoading(false);
        props.navigation.navigate("ViewCallScreen", {
          id: props.route.params.edit_id,
          title: edit_item_data?.client_name,
          permissions:props.permissions
        });
      } else {


        if (!netInfo.isConnected || !netInfo.isInternetReachable) {
          try {
            const client = create_data.clients.filter(el => el.id == inserted_date.client_id)
            let offlineCall = [{ ...inserted_date, client: client[0] }]
            // const offlineCalls = await AsyncStorage.setItem("offlcineCalls" , JSON.stringify(offlcineCall))
            let offlineCalls = await AsyncStorage.getItem("offlineCalls")
            if (offlineCalls) {
              offlineCalls = await JSON.parse(offlineCalls)
              offlineCall = [...offlineCall, ...offlineCalls]
            }
            await AsyncStorage.setItem("offlineCalls", JSON.stringify(offlineCall))
            setScreenLoading(false)
            props.navigation.navigate("IndexCallScreen", {
              id: props?.route?.params?.edit_id,
              title: edit_item_data?.client_name,
              permissions:props.permissions
            });
          } catch (error) {
            console.log(error)
          }
        } else {
          await dispatch(
            store(inserted_date, "visits", "visits", myContext.userToken)
          );
          props.navigation.navigate("ViewCallScreen", {
            added_id: true,
            title: "Visit Show: " + client_id,
            permissions:props.permissions
          });
        }


      }
      setLoading(false);
    } catch (e) {
      RoutToLogin(e, props);
      setserverErrors(e.error);
      setLoading(false);
    }
  };

  /*====================================
  || A formatData function to handel data for dropdwon 
  ======================================*/
  const formatData = (lable, selectFormat, headLabel = false) => {
    let formateType = [];
    let formateType2 = [];
    if (create_data !== undefined) {
      const selectFormat_data = create_data[selectFormat];
      if (selectFormat_data) {
        formateType = selectFormat_data.map((type) => {
          return {
            value: type.id,
            label: type[lable],
            name: type[lable],
            name:
              selectFormat == "clients"
                ? type[lable] + " [" + type["clienttype"] + "]"
                : type[lable],
            id: type.id + "",
          };
        });
      }

      if (headLabel != false) {
        formateType = [
          {
            value: headLabel,
            label: 0,
            name: headLabel,
            id: "0",
          },
          ...formateType,
        ];
      }
    }

    return formateType;
  };

  /*====================================
  || Handle visitType drowpdown change (10:AM, 20:PH, 30: PM)
  ======================================*/
  const [visitType, setVisitType] = useState(10);
  const visittypeOnchangeHandler = (value) => {
    setVisitType(value);
  };

  /*====================================
  || Handle SelectedClient_id in Call preparation
  ======================================*/
  const [selectedClient_id, setSelectedClient_id] = useState([0]);
  const setSelectedClient_idHandler = (value) => {
    setSelectedClient_id(value);
  };

  /*====================================
  || Handle Selected products in call preparation
  ======================================*/
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [isValidVistPros, setIsValidVistPros] = useState(true);
  const [visit_ph_servay_ids, setVisit_ph_servay_ids] = useState([]);
  const setVisit_ph_servay_ids_handler = () => {
    let cpro = [];

    if (selectedProducts.length > 0 && selectedClient_id) {
      
      selectedProducts.map((p_id) => {
        cpro = [
          ...cpro,
          {
            client_id: Array.isArray(selectedClient_id) ? selectedClient_id[0] : selectedClient_id,
            product_id: p_id,
            consumption: "",
            stock: "",
            comment: "",
          },
        ];
      });
      
      setIsValidVistPros(true);
      setVisit_ph_servay_ids([...visit_ph_servay_ids, ...cpro]);
      hideModal();
    } else {
      setIsValidVistPros(false);
    }
  };

  /*====================================
  || Handle remove an item form call preparation: visit_ph_servay_ids
  ======================================*/
  const removeph_pro_handler = (index) => {
    const ph_pros = [...visit_ph_servay_ids];
    ph_pros.splice(index, 1);
    setVisit_ph_servay_ids(ph_pros);
  };

  /*====================================
  || Update values of call preparation inputs array: visit_ph_servay_ids
  ======================================*/
  const ph_servayHandler = (index, label, value) => {
    let updated_visit_ph_servay_ids = [...visit_ph_servay_ids];
    updated_visit_ph_servay_ids[index][label] = value;
    setVisit_ph_servay_ids(updated_visit_ph_servay_ids);
  };

  /*====================================
  || Handel section dropdown for selected product change handler
  ======================================*/
  const multiSelectChangeHandler = (values) => {
    setSelectedProducts(values);
  };

  /*====================================
  || Actions after hide model of call preparation
  ======================================*/
  const hideModal = () => {
    setVisible(false);
    setSelectedProducts([]);
    setSelectedClient_id(0);
    setIsValidVistPros(true);
  };

  // if(!edit_item_data){
  //   return <Loading title={"Loading"} navigation={props.navigation} />;
  // }

  if ((screenLoading && (netInfo.isConnected || netInfo.isInternetReachable)) || isdispatched !=2) {
    return <Loading title={"Loading"} navigation={props.navigation} />;
  }


  if (create_data !== undefined && create_data?.clients?.length < 1) {
    return (
      <BackNav
        title={
          edit_item_data
            ? "Edit: " + create_data?.edit_data_json?.client
            : "Add Call "
        }
        navigation={props.navigation}
      >
        <View>
          <Caption
            style={{
              marginTop: 150,
              fontSize: 22,
              color: "red",
              textAlign: "center",
              height:40,
              paddingTop:20
            }}
          >
            Please add clints in your list first!
          </Caption>
        </View>
      </BackNav>
    );
  }

  
  if (outoflist === true) {
    return (
      <BackNav
        title={
          edit_item_data
            ? "Edit Call: " + create_data?.edit_data_json?.client
            : "Add Call "
        }
        navigation={props.navigation}
      >
        <View>
          <Text style={{ marginTop: "50%", textAlign: "center" }}>
            This Call for a client that is out of your active client list!
          </Text>
          <Text style={{ marginTop: 5, textAlign: "center" }}>
            Can't be edited!
          </Text>
          <TouchableOpacity
            activeOpacity={0.5}
            onPress={() => {
              props.navigation.navigate("IndexCallScreen", { isToday: false });
            }}
          >
            <Button style={{ color: "blue", fontSize: 18 }}>
              Go to Client List
            </Button>
          </TouchableOpacity>
        </View>
      </BackNav>
    );
  }

  return (
    <BackNav
      HeaderButton={
        <HeaderButton
          isLoading={screenLoading || loading}
          name="check"
          onPress={handleSubmit(onSubmit)}
        />
      }
      title={
        edit_item_data
          ? "Edit: " + create_data?.edit_data_json?.client
          : "Add Call "
      }
      navigation={props.navigation}
    >
      <Text>{visible}</Text>
      {visible && (
        <CorporationPortal
          formatData={formatData}
          hideModal={hideModal}
          multiSelectChangeHandler={multiSelectChangeHandler}
          selectedProducts={selectedProducts}
          setSelectedProducts={setSelectedProducts}
          visible={visible}
          selectedClient_id={selectedClient_id}
          setSelectedClient_idHandler={setSelectedClient_idHandler}
          setVisit_ph_servay_ids_handler={setVisit_ph_servay_ids_handler}
          isValidVistPros={isValidVistPros}
          clienttype={clienttype}
          client_id={client_id}
        />
      )}

      <ScrollView>
        {!screenLoading && (

          <View style={styles.screen}>
            <View style={{ marginHorizontal: 10 }}>
              <Accrodion
                defaultExpand={true}
                title="Account Info"
                icon={
                  <AntDesign
                    name="infocirlce"
                    size={24}
                    color={Colors.primary}
                  />
                }
              >
                <View style={styles.accountInfoBody}>
                  <MaterialCommunityIcons
                    style={styles.locationIcon}
                    name="map-marker-distance"
                    size={36}
                    color={Colors.primary}
                  />

                  <Text style={styles.accuracy}>
                    Accuracy: {location == false && <LoadingBtn size={20} />}
                    {location && (
                      <Text style={{ color: Colors.primary }}>
                        {location?.accuracy?.toFixed(0)} M
                      </Text>
                    )}
                  </Text>

                  <Text style={styles.time}>
                    Started at:{" "}
                    <Text style={{ color: Colors.primary }}>
                      {Moment(dt).format("LTS")}
                    </Text>
                  </Text>
                </View>

                <View>
                  <AccountInfo
                    control={control}
                    formatData={formatData}
                    name="cleint_id"
                    plan_id={props.route.params.plan_id}
                    plan_client_id={props.route.params.plan_client_id}
                    handelClient_idChange={handelClient_idChange}
                    address={address}
                    errors={errors}
                    client_id={client_id}
                    clienttype={clienttype}
                  />

                  {clienttype == "AM" && (
                    <AccountInfo2
                      name="specialist_id"
                      formatData={formatData}
                      control={control}
                      errors={errors}
                      clienttype={clienttype}
                      enableSearch={false}
                    />
                  )}

                  {clienttype == "PM" && (
                    <DropDownList
                      name="ladder_id"
                      enableSearch={false}
                      control={control}
                      label="Ladder"
                      data={formatData("ladder_name", "ladders")}
                      error={errors.ladder_id}
                      clienttype={clienttype}
                    />
                  )}
                </View>
                <Accrodion
                  defaultExpand={true}
                  title="Call Preparation *"
                  icon={
                    <AntDesign
                      name="customerservice"
                      size={24}
                      color={Colors.primary}
                    />
                  }
                >
                  <CallPreparation
                    edit_id={props.route.params.edit_id ? true : false}
                    clienttype={clienttype}
                    handelClient_idChange={handelClient_idChange}
                    formatData={formatData}
                    callType={visitType}
                    control={control}
                    errors={errors}
                    setVisible={setVisible}
                    visit_ph_servay_ids={visit_ph_servay_ids}
                    ph_servayHandler={ph_servayHandler}
                    removeph_pro_handler={removeph_pro_handler}
                    create_data={create_data}
                  ></CallPreparation>
                </Accrodion>
              </Accrodion>

              <Accrodion
                defaultExpand={true}
                title="Messages"
                icon={
                  <MaterialCommunityIcons
                    name="android-messages"
                    size={24}
                    color={Colors.primary}
                  />
                }
              >
                <DropDownList
                  control={control}
                  label="Message"
                  data={formatData("msg_title", "visitmessages")}
                  name="visitmessage_id"
                  error={errors.visitmessage_id}
                />
              </Accrodion>

              <Accrodion
                defaultExpand={true}
                title="Call Info"
                icon={<Fontisto name="info" size={24} color={Colors.primary} />}
              >
                <View style={{ flex: 1, flexDirection: "row" }}>
                  <View style={{ flex: 1 }}>
                    <DropDownList
                      control={control}
                      label="Call Category"
                      data={formatData("visitcategory_title", "visitcategorys")}
                      name="visitcategory_id"
                      error={errors.visitcategory_id}
                      disableSort={true}
                      required={true}
                    />
                  </View>
                  <View style={{ flex: 1 }}>
                    <View style={{ marginVertical: 0 }}>
                      <Dropdown
                        name="visittype_id"
                        error={errors.visittype_id}
                        label="Call Type"
                        data={formatData("visittype_title", "visittypes")}
                        onChange={visittypeOnchangeHandler}
                        value={visitType ? visitType : 10}
                        mode={"outlined"}
                        rippleColor="blue"
                        showLoader={false}
                        primaryColor="red"
                        disableSort={true}
                        required={true}
                      />
                    </View>
                  </View>
                </View>

                {(visitType == 20 || visitType == 30) && (
                  <View style={{ flex: 1, flexDirection: "row" }}>
                    <View style={{ flex: 1 }}>
                      <DropDownList
                        control={control}
                        label="Double User"
                        data={formatData("name", "users")}
                        name="double_user_id"
                        error={errors.double_user_id}
                        required={true}
                        cusError={true}
                      />
                    </View>
                    {visitType == 30 && (
                      <View style={{ flex: 1 }}>
                        <DropDownList
                          control={control}
                          label="Trible User"
                          data={formatData("name", "users")}
                          name="trible_user_id"
                          error={errors.trible_user_id}
                          required={true}
                          cusError={true}
                        />
                      </View>
                    )}
                  </View>
                )}

                <CustomInput
                  mode="flat"
                  label="Next Call Object"
                  placeholder="Next Call Object"
                  errors={errors.name}
                  icon={() => {
                    return (
                      <MaterialIcons
                        name="emoji-objects"
                        size={24}
                        color={Colors.primary}
                      />
                    );
                  }}
                  name="nextvisitobj"
                  autoComplete="nextvisitobj"
                  control={control}
                  error={errors.nextvisitobj}
                  multiline={true}
                  numberOfLines={3}
                  maxLength="191"
                />

                <CustomInput
                  control={control}
                  mode="flat"
                  label="Comment *"
                  placeholder="Comment *"
                  icon={() => {
                    return (
                      <MaterialIcons
                        name="comment"
                        size={24}
                        color={Colors.primary}
                      />
                    );
                  }}
                  name="comment"
                  errors={errors.comment}
                  autoComplete="comment"
                  required={true}
                  error={errors.comment}
                  multiline={true}
                  numberOfLines={3}
                  maxLength="191"
                />
              </Accrodion>

              {errMSGs != "" && (
                <View>
                  <Text style={{ color: "red" }}>{errMSGs}</Text>
                </View>
              )}

              {serverErrors && serverErrors.message && (
                <ErrorArray error={serverErrors.message} />
              )}

              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-around",
                  marginVertical: 20,
                  marginBottom: 40,
                }}
              >
                {!loading && (
                  <Button
                    loading={loading}
                    color={Colors.accent}
                    icon={() => {
                      return (
                        <MaterialIcons
                          name="call-missed-outgoing"
                          size={24}
                          color="white"
                        />
                      );
                    }}
                    mode="contained"
                    uppercase={false}
                  // onPress={handleSubmit(onSubmit)}
                  >
                    Missed
                  </Button>
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
                    }}
                  >
                    <LoadingBtn />
                  </View>
                )}

                {!loading && (
                  <Button
                    loading={loading}
                    color={Colors.primary}
                    icon={() => {
                      // if (loading) {
                      //   return <LoadingBtn />;
                      // }
                      return (
                        <MaterialIcons name="save" size={24} color="white" />
                      );
                    }}
                    mode="contained"
                    onPress={handleSubmit(onSubmit)}
                    uppercase={false}
                  >
                    {!props.route.params.edit_id ? `Submit ${(!netInfo.isInternetReachable
                        && !netInfo.isConnected) ? "as offline call" : ""}` : "Update"}
                  </Button>
                )}
              </View>
            </View>
          </View>
        )}
      </ScrollView>
    </BackNav>
  );
}

const styles = StyleSheet.create({
  screen: {
    alignContent: "center",
    flex: 1,
  },
  formcontrol: {
    marginVertical: 10,
  },
  accountInfoBody: {
    justifyContent: "center",
    alignContent: "center",
    alignItems: "center",
  },
  locationIcon: {
    marginVertical: 5,
  },
  accuracy: {
    marginVertical: 5,
    fontSize: 18,
  },
  time: {
    marginVertical: 5,
    fontSize: 18,
  },
});

export default CreateCallScreen;