import * as React from 'react';
import { View, StyleSheet, ScrollView, Text } from "react-native";
import Colors from "../../../constants/Colors";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { Caption } from "react-native-paper";
import {
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { useDispatch, useSelector } from "react-redux";
import AdressInfo from "../components/AdressInfo";
import ContactInfo from "../components/ContactInfo";
import ClientInfo from "../components/ClientInfo";
import Loading from "../../../components/UI/Loading";
import BackNav from "../../../navigations/BackNav";
import { create, store, update } from "../../../store/actions/action";
import { context } from "../../../context/AppContext";
import HeaderButton from "../../../components/UI/HeaderButton";
import SubmitButton from "../../user/components/UI/SubmitButton";
import RoutToLogin from "../../../components/UI/RoutToLogin";

const schema = yup.object({
  name: yup.string().required().max(100).min(3),
  clienttypes: yup.string().required(),
  classes: yup.string().required(),
  typecategorys: yup.string(),
  email: yup.string().email().nullable().max(50),
  phone: yup.string().nullable().min(10).transform((_, val) => val === Number(val) ? val : null),
  ladders: yup.string().required(),
  landMark: yup.string().max(50).required(),
  note: yup.string().nullable().max(50).transform((_, val) => val === Number(val) ? val : null),
  // region: yup.string().required(),
  fees: yup.number().min(0).max(1000),
  wdays: yup.array(),
  spcialist : yup.number()
});

function CreateClientScreen(props) {
  const componentMounted = useRef(true);
  const myContext = useContext(context);

  let edit_item_data = null;
  let line_ids = [];
  let edit_date = useSelector((state) => state.reducer.EDIT["clients"]);
  let create_data = useSelector((state) => state.reducer.CREATE["clients"]);

  const edit_id = props.route.params.edit_id;
  if (edit_id) {
    create_data = edit_date;
    edit_item_data = create_data?.client;
    line_ids = create_data.line_ids;
  }

  if (create_data == undefined || !create_data) {
    create_data = false;
  }

  const [loading, setLoading] = useState(false);
  const [screenLoading, setScreenLoading] = useState(true);
  const [lines, setLines] = useState(line_ids);
  const [workDays, setWorkDate] = useState([]);
  const [birthDay, setBirthDay] = useState("birthday");

  const [serverErrors, setServerErrors] = useState(false);
  const [isLoadData, setIsLoadData] = useState(false); //For chack load data for first time only
  const [selectedRegion, setSelectedRegion] = useState(
    edit_item_data ? edit_item_data.region_id : null
  );
  // const [clientType, setclientType] = useState(0);
  const [selectedSpcialist, setSelectedSpcialist] = useState(edit_item_data ? edit_item_data.specialists.length == 1 ?  edit_item_data.specialists[0].id.toString() :null : null)

  const [isdispatched_create, setIsdispatched_create] = useState(false);
  const gitdata = useCallback(async () => {
    try {
      await dispatch(create("clients/create", "clients", myContext.userToken));
      if (componentMounted.current) {
        setScreenLoading(false);
        setIsdispatched_create(true);
      }
    } catch (error) {console.log(error)}
    return () => {
      componentMounted.current = false;
    };
  }, []);

  const [spcialists, setSpcialist] = useState(false);
  if(create_data != undefined && spcialists === false && isdispatched_create ){
    setSpcialist(create_data.specialists)
  }

  useEffect(()=>{
    const getData =() => {
      if (componentMounted.current && !edit_id) {
        gitdata();
      }else{
        setSpcialist(create_data.specialists)
        setSelectedSpcialist(create_data.specialists_ids[0])
        setScreenLoading(false);
      }
      return () => {
        componentMounted.current = false;
      };
    }
    getData()
    return ()=>{}
  }, [gitdata]);

  useEffect(()=>{
    const getData =() => {
      if (componentMounted.current) {
        if (edit_item_data) {
          if (edit_item_data.whours) {
            const wDay = edit_item_data.whours.map((wHour) => ({
              wday_id: wHour.wday_id,
              hour_from: wHour.hour_from,
              hour_to: wHour.hour_to,
            }));
            setWorkDate(wDay);
          }
  
          if (edit_item_data.spcialist) {
            const spcialist = edit_item_data.specialists.map((spcialists) => {
              return { ...spcialists, isChecked: !spcialists.isChecked };
            });
            setSpcialist(spcialist);
          }
        }
      }
      return () => {
        componentMounted.current = false;
      };
    }
    getData()
    return ()=>{}
  }, [edit_item_data]);


  let allLines;

  allLines = create_data ? create_data.lines : false;


  const dispatch = useDispatch();

  const {
    control,
    handleSubmit,
    formState: { errors },
    getValues,
    reset,
    setValue
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: edit_id
      ? {
          name: edit_item_data.client_name,
          clienttypes: +edit_item_data.clienttype_id,
          classes: +edit_item_data.class_id,
          typecategorys: +edit_item_data.typecategory_id,
          email: edit_item_data.client_email,
          phone: edit_item_data.client_phone,
          ladders: +edit_item_data.ladder_id,
          landMark: edit_item_data.landmark,
          note: edit_item_data.note,
          region: +create_data.client_region.state_id,
          fees: edit_item_data.fees,
        }
      : {},
  });


  const handelLins = (data) => {
    // setLines(data)
    // let UpdateSpcialist = [];
    // if (allLines) {
    //   data.map((lineID) => {
    //     const spcialist = allLines.filter((line) => line.id === lineID);
    //     UpdateSpcialist = [...UpdateSpcialist, ...spcialist[0].specialists];
    //   });
    // }

    // if (UpdateSpcialist === undefined) {
    //   setSpcialist([]);
    //   return;
    // }

    // const uniqeSpcialist = [
    //   ...new Map(
    //     UpdateSpcialist.map((item) => [item["specialist_id"], item])
    //   ).values(),
    // ];
    // UpdateSpcialist === undefined
    //   ? setSpcialist([])
    //   : setSpcialist(uniqeSpcialist);
  };

  useEffect(()=>{
    const getData =() => {
      if (componentMounted.current) {
        if (edit_item_data) handelLins(line_ids);
      }
      return () => {
        componentMounted.current = false;
      };
    }
    getData()
    return ()=>{}
  }, []);

  const onSubmit = async (data) => {
   
    
    // setServerErrors(false);
    // setLoading(false);
    let spId = [] 
    if(data.typecategorys != 3 && data.typecategorys != 7  ){
      const sp = spcialists.filter((spcialists) => spcialists.isChecked);
      // const spId = sp.map((sp) => (edit_item_data ? edit_item_data.specialist_ids : sp.specialist_id));
      if(sp.length === 0 ){
        setServerErrors({message :"spcialist is required",errors :{specialist_ids : true }})
        return;
      }else{
        setServerErrors(false)
        spId = sp.map((sp) => sp.id);
      }
    
    }
    
    if(data.typecategorys == 7){
      if(!selectedSpcialist){
        setServerErrors({message :"Spcialist is required",errors :{"specialist_ids.0" : true }})
        serverErrors.errors["specialist_ids.0"] = "spcialist is required"
        return
      }
      setServerErrors(false)
      spId = [selectedSpcialist]
    } 

    if(!selectedRegion){
        setServerErrors({message :"Address is required please select the state",errors :{"region_id" : true }})
      return
    }

    const inserted_date = {
      client_name: data.name,
      region_id: selectedRegion,
      clienttype_id: data.clienttypes,
      class_id: data.classes,
      typecategory_id: data.typecategorys,
      // typecategory_id: catogory,
      ladder_id: data.ladders,
      fees: data.fees,
      note: data.note,
      landmark: data.landMark,
      // birthdate: birthDay,
      client_email: data.email,
      client_phone: data.phone,
      client_mobile: data.phone,
      specialist_ids: spId,
      whours: workDays,
    };

      try {
        if (edit_item_data) {
          const id = edit_item_data.id;
          await dispatch(
            update(
              id,
              inserted_date,
              "clients/" + id,
              "clients",
              myContext.userToken
            )
          );
          setLoading(false);

          props.navigation.navigate("ViewClientScreen", {
            id: id,
            title: edit_item_data.client_name,
          });
        } else {
          await dispatch(
            store(inserted_date, "clients", "clients", myContext.userToken)
          );
          setLoading(false);
          props.navigation.navigate("ViewClientScreen", {
            added_id: true,
            title: data.name,
          });
        }
      } catch (e) {
        console.log(e);
        setLoading(false);
        if (e.type == "server") {
          if (e.error) {
            setServerErrors(e.error);
          }
        }
      }

  };

  if (screenLoading) {
    return (
      <Loading
        isLoading={screenLoading && loading}
        title={"Create Client: Loading"}
        navigation={props.navigation}
      />
    );
  }

  return (
    <BackNav
      HeaderButton={
        <HeaderButton isLoading={loading} name="check" onPress={handleSubmit(onSubmit)} />
      }
      title={
        edit_item_data ? "Edit: " + edit_item_data.client_name : "Add Client "
      }
      navigation={props.navigation}
    >
      <ScrollView>
        {!screenLoading && (
          <View style={styles.screen}>
            <View style={{ marginHorizontal: 33 }}>
              <ClientInfo
                getValues = {getValues}
                serverErrors={serverErrors}
                setServerErrors={setServerErrors}
                edit_id={edit_id}
                birthDay={birthDay}
                setBirthDay={setBirthDay}
                workDays={workDays}
                setWorkDate={setWorkDate}
                setSpcialist={setSpcialist}
                spcialists={spcialists}
                lines={lines}
                handelLins={handelLins}
                errors={errors}
                control={control}
                edit_item_data={edit_item_data}
                isLoadData={isLoadData}
                setIsLoadData={setIsLoadData}

                setValue={setValue}
                selectedSpcialist =  {selectedSpcialist}
                setSelectedSpcialist = {setSelectedSpcialist}
              />

              <ContactInfo
                setServerErrors={setServerErrors}
                serverErrors={serverErrors}
                errors={errors}
                control={control}
              />

              <AdressInfo
                setServerErrors={setServerErrors}
                serverErrors={serverErrors}
                selectedRegion={selectedRegion}
                setSelectedRegion={setSelectedRegion}
                edit_id={props.route.params.edit_id}
                errors={errors}
                control={control}
              />

              {((serverErrors && serverErrors.msg) ||
                Object.keys(errors).length != 0) && (
                <View
                  style={{
                    ...styles.error,
                    backgroundColor: "#ff00004d",
                    borderRadius: 5,
                    marginBottom: 5,
                  }}
                >
                  {serverErrors && serverErrors.msg && (
                    <Caption style={{ color: "red", padding: 5 }}>
                      {serverErrors.msg}
                    </Caption>
                  )}

                  {errors && (
                    <Caption style={{ color: "red", padding: 5 }}>
                      Not Valid Data, revise your inputs
                    </Caption>
                  )}
                </View>
              )}

              <SubmitButton
                errors={errors}
                serverErrorMsg={serverErrors ? serverErrors.message : false}
                color={edit_item_data ? Colors.accent : Colors.primary}
                text={edit_item_data ? "Update Client" : "Save"}
                // serverErrorMsg={serverErrorMsg}
                screenLoading={loading}
                onPress={handleSubmit(onSubmit)}
              />
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
});

export default CreateClientScreen;
