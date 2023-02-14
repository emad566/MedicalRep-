import * as React from 'react';

import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'; 
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons'; 

import  { useCallback, useContext, useEffect, useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  Pressable,
} from "react-native";
import {
  Avatar,
  Banner,
  Button,
  Card,
  Divider,
  Headline,
  IconButton,
  Modal,
  Paragraph,
  Portal,
  Provider,
  TextInput,
} from "react-native-paper";
import BackNav from "../../../navigations/BackNav";
import Colors from "../../../constants/Colors";
import { Dropdown } from "sharingan-rn-modal-dropdown";
import TakeImagePicker from "../../../components/UI/ImagePicker";
import { color } from "react-native-reanimated";
import { useDispatch, useSelector } from "react-redux";
import { api, apiFormData } from "../../../store/actions/action";
import { context } from "../../../context/AppContext";
import RowData from "../../../components/UI/RowData";
import PrintValue from "../../../components/PrintValue";
import RoutToLogin from "../../../components/UI/RoutToLogin";
import AsyncStorage from "@react-native-async-storage/async-storage";


export const FeedTypes = [
  {
    value: "1",
    label: "Tiger Nixon",
  },
  {
    value: "2",
    label: "Garrett Winters",
  },
  {
    value: "3",
    label: "Ashton Cox",
  },
  {
    value: "4",
    label: "Cedric Kelly",
  },
];
const ProfileScreen = (props) => {
  const view_data = useSelector((state) => state.reducer.API["profile"]);
  const [visible, setVisible] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  const [image, setImage] = useState(false);
  const myContext = useContext(context);
  
  useEffect(() => {
    loadIndex_data();
  }, []);

  const handelModelVisable = () => {
    setModalVisible(false);
  };

  useEffect(()=>{
    if(view_data !== undefined && myContext.profile_path != view_data.profile_path){
      myContext.setProfile_path(view_data.profile_path)
    }
    return ()=>{};
  }, [view_data]);
  

  const dispatch = useDispatch();
  const loadIndex_data = useCallback(()=>{
    const getData =async () => {
      try {
        userToken = await AsyncStorage.getItem("userToken");
        if(userToken && myContext.userToken != userToken ){
          myContext.setUserToken(userToken);
        }
  
        await dispatch(
          api(
            "users/clients/auto",
            "post",
            {},
            userToken,
            "clientsauto"
          )
        );
  
        await dispatch(
          api("users/profile", "GET", false, userToken, "profile")
        );
      } catch (err) {
        RoutToLogin(err, props);
        RoutToLogin(err, props)
      }
    }
    getData()
    return ()=>{}
  }, []);

  const sendImage = useEffect(()=>{
    const getData =async () => {
      try {
        if(image !== false){
          let formData = new FormData();
          await dispatch(
            apiFormData("user/profileimage", "image", image, myContext.userToken, "profileimage")
          );
        }
      } catch (err) {
        // RoutToLogin(err, props)
      }
    }
    getData()
    return ()=>{}
  }, [image]);

  useEffect(() => {
    loadIndex_data();
  }, []);


  return (
    <BackNav title={(view_data !== undefined ? view_data.user.name : "")} noBackBtn={true} navigation={props.navigation}>
      <View>
        <ScrollView style={styles.screen}>
          <Card style={styles.profile}>
            <View style={styles.profileIconView}>
              {((image === false) &&  (view_data === undefined || view_data.profile_path == ""))? (
                <IconButton
                  icon={() => (
                    <FontAwesome5
                      style={styles.profileIcon}
                      name="user"
                      color="white"
                    />
                  )}
                  color={Colors.red500}
                  size={50}
                  onPress={() => setModalVisible(true)}
                />
              ) : (
                <Avatar.Image size={75} source={{ uri: (image !== false && image?.path !== undefined )?  image?.path : view_data.profile_path }} />
              )}
              <IconButton
                style={{
                  position: "absolute",
                  // textAlign: "center",
                  justifyContent: "flex-end",
                  marginTop: "1%",
                }}
                icon={() => (
                  <SimpleLineIcons name="camera" size={15} color="#ccc" />
                )}
                color={Colors.red500}
                size={50}
                onPress={() => setModalVisible(true)}
              />
            </View>
            <Text style={styles.accountName}>
              {view_data !== undefined ? view_data.user.name : "Account Name"}
            </Text>
            <Text style={styles.accountPosition}>
              {view_data !== undefined
                ? view_data.user_role
                : "Account Position"}
            </Text>
          </Card>

          <View>
              {view_data && view_data.user.areas && view_data.user.areas.length > 0 && (
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
                      view_data.user.areas &&
                      view_data.user.areas.map((areas, index) => (
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
          </View>


          <View style={{ marginTop: 15 }}>
            <Banner
              visible={visible}
              actions={[]}
              icon={({ size }) => (
                <SimpleLineIcons name="user" size={30} color={Colors.scandry} />
              )}
            >
              <View style={{ flexDirection: "row" }}>
                <Button
                  uppercase={false}
                  color={Colors.scandry}
                  onPress={() => {
                    {
                      props.navigation.navigate("ClientsAutoScreen");
                    }
                  }}
                >
                  <Text style={{ fontSize: 20, color: Colors.scandry }}>
                    My List
                  </Text>
                </Button>
                {/* <Button color={Colors.primary}>My Clients</Button> */}
              </View>
            </Banner>
          </View>

          <KeyboardAvoidingView style={{ margin: 10 }}>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
              <View style={styles.formContainer}>
                <View style={styles.formItemContainer}>
                  <Dropdown
                    label="Feed Type"
                    data={FeedTypes}
                    mode="outlined"
                    rippleColor="blue"
                    showLoader={false}
                    primaryColor="red"
                    required
                  />
                </View>

                <View style={styles.formItemContainer}>
                  <TextInput
                    // mode="outlined"
                    label="Details"
                    multiline={true}
                    placeholder="Type Your Details"
                    style={{ backgroundColor: "#fff", paddingVertical: 10 }}
                  />
                </View>

                <View
                  style={{
                    // flexDirection: "row",
                    justifyContent: "center",
                    alignItems: "center",
                    alignContent: "center",
                  }}
                >
                  <FontAwesome5
                    style={{
                      ...styles.profileIcon,
                      backgroundColor: Colors.primary,
                    }}
                    name="share-alt"
                    color="white"
                  />
                  <Text>Share</Text>
                </View>
              </View>
            </TouchableWithoutFeedback>
          </KeyboardAvoidingView>
        </ScrollView>
        <TakeImagePicker
          modalVisible={modalVisible}
          handelModelVisable={handelModelVisable}
          setImage={setImage}
        />
      </View>
    </BackNav>
  );
};

const styles = StyleSheet.create({
  // screen: {
  //   flex: 1,
  // },
  profile: {
    marginHorizontal: 20,
    justifyContent: "center",
    alignItems: "center",
    alignContent: "center",
    marginVertical: 10,
    padding: 10,
    backgroundColor: Colors.primary,
    borderRadius: 10,
  },
  profileIconView: {
    justifyContent: "center",
    flexDirection: "row",
  },
  profileIcon: {
    backgroundColor: "#ccc",
    padding: 10,
    borderRadius: 200,
    fontSize: 50,
    width: 70,
    height: 70,
    textAlign: "center",
  },
  accountName: {
    textAlign: "center",
    color: "white",
    fontWeight: "bold",
    fontSize: 22,
  },
  accountPosition: {
    textAlign: "center",
    color: "white",
    fontWeight: "normal",
    fontSize: 18,
  },
  formContainer: {
    padding: 20,
    marginBottom: 50,
    backgroundColor: "#fff",
  },
  formItemContainer: {
    marginVertical: 10,
  },
  modalContainer: {
    backgroundColor: "#7B2930",
  },
  contentContainerStyle: {
    opacity: 1,
    backgroundColor: "#7B2930",
    margin: "10%",
    padding: 10,
    borderRadius: 14,
    justifyContent: "center",
  },
});

export default ProfileScreen;
