import * as React from 'react';
import {
  Keyboard,
  StyleSheet,
  View,
  Image,
  ImageBackground,
} from "react-native";
import { Card, Button, TextInput, Text, Snackbar } from "react-native-paper";
import  { useContext, useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useDispatch } from "react-redux";
import * as authActions from "../store/actions/AuthAction";
import { LOGIN } from "../store/actions/AuthAction";
import FontAwesome  from 'react-native-vector-icons/FontAwesome';
import Colors from "../../../constants/Colors";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Loading from "../../../components/UI/Loading";
import OpenURLButton from "../../../components/UI/OpenURLButton";
import { context } from "../../../context/AppContext";
import { NotificationListner } from '../../../utils/pushnotification_helper';


const imagebg = require("../../../assets/images/loginbg.jpeg");
const logo = require("../../../assets/images/logo.png");

const schema = yup
  .object({
    email: yup.string().email().required(),
    password: "",
  })
  .required();

function LoginScreen(props) {
  const [error, setEror] = useState(false);
  const [loading, setLoading] = useState(false);
  const [loadCheck, setLoadCheck] = useState(true);
  const [isSecurePass, setIsSecurePass] = useState(true);
  const dispatch = useDispatch();
  const myContext = useContext(context);

  /*====================================
  || For Init Notification Listner and pass props
  ======================================*/

  React.useEffect(()=>{
    NotificationListner(props);
    return ()=>{};
  }, []);

  const [appV, setAppV] = useState({
    app_version: myContext.app_version,
    app_version_link: "",
  });

  const checkVersion = (props.route.params?.checkVersion !== undefined)? props.route.params.checkVersion : false; 

  useEffect(()=>{
    const getData = async()=>{
        try {
          if(checkVersion || appV.app_version_link=="" || appV.app_version_link == undefined){
            const response = await fetch(
              "http://mrep.marvel-inter.com/api/checkversion",
              {
                method: "get",
                headers: {
                  "Content-Type": "application/json",
                  accept: "application/json",
                },
              }
            );
      
            const resData = await response.json();
            setAppV(resData);
          }
        } catch (err) {
          
        }
      }
      getData()

      return()=>{

      }

  },[setAppV, myContext]);

  

  React.useEffect(()=>{
    const getData = () =>{
      props.navigation.addListener("focus", async (e) => {
        setLoadCheck(true);
  
        userToken = await AsyncStorage.getItem("userToken");
        
        if (userToken) {
          // props.navigation.navigate("MyTabNav");
          props.navigation.reset({
            index:0,
            routes:[
              {
                name:"MyTabNav"
              }
            ]
          })
        } else {
          setLoadCheck(false);
        }
      })
    }

    

    getData()
    return()=>{

    }
  });

  useEffect(() => {
    props.navigation.setOptions({
      headerShown: false,
    });

    return ()=>{

    }
  });

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  useEffect(()=>{
    const getData = async () => {
      userToken = await AsyncStorage.getItem("userToken");
      Auth_Data = await AsyncStorage.getItem("Auth_Data");
      myContext.setAuth_Data(JSON.parse(Auth_Data));
      
      if (userToken) {
        const response = await fetch(
          "https://mrep.marvel-inter.com/api/users/islogin",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json",
              Authorization: userToken,
            },
          }
        );
  
        const respData = await response.json();
        if (respData.status == 1) {
          myContext.setUserToken(userToken);
          
          dispatch({ type: LOGIN, userToken: userToken });
          // props.navigation.navigate("MyTabNav");
          props.navigation.reset({
            index:0,
            routes:[
              {
                name:"MyTabNav"
              }
            ]
          })
        }
      }
    } 
    getData()
    return ()=>{

    }

  }, [dispatch, loading, loadCheck]);

  
  const onSubmit = async (data) => {
    try {
      Keyboard.dismiss();
      setLoading(true);
      await dispatch(authActions.login(data.email, data.password, true));
      setLoading(false);
    } catch (error) {
      setEror("Not valid email/user/password");
      console.log(error);
      setLoading(false);
    }
  };

  const onToggleSnackBar = () => setEror(!error);
  const onDismissSnackBar = () => setEror(false);
  
  if (appV.app_version != myContext.app_version) {
    return (
      <View style={styles.container}>
        <ImageBackground
          source={imagebg}
          resizeMode="cover"
          style={styles.image}
        >
          <View style={styles.screen}>
            
              <Card style={styles.card}>
                <View>
                  <View style={styles.imageContainer}>
                    <Image
                      source={logo}
                      style={{
                        width: "70%",
                        height: 100,
                      }}
                    />
                    <View>
                      <Text>
                        You must download/install the new application version
                        from the link
                      </Text>
                    </View>

                    <View>
                      <OpenURLButton url={appV.app_version_link}>
                        Donwload New Version {appV.app_version}
                      </OpenURLButton>
                    </View>
                  </View>
                </View>
              </Card>
            
            <View style={styles.loadingContainer}></View>
          </View>
        </ImageBackground>
      </View>
    );
  }
  
  return (
    <View style={styles.container}>
      <ImageBackground source={imagebg} resizeMode="cover" style={styles.image}>
        <View style={styles.screen}>
          {!loadCheck && (
            <Card style={styles.card}>
              <View>
                <View style={styles.imageContainer}>
                  <Image
                    source={logo}
                    style={{
                      width: "70%",
                      height: 100,
                    }}
                  />
                </View>

                <View style={styles.formcontrol}>
                  <Controller
                    control={control}
                    rules={{
                      required: true,
                    }}
                    render={({ field: { onChange, onBlur, value } }) => (
                      <TextInput
                        mode="outlined"
                        label="Email"
                        placeholder="Type Your Email"
                        right={
                          <TextInput.Icon
                            name="envelope"
                            icon={() => {
                              return (
                                <FontAwesome
                                  name="at"
                                  size={24}
                                  color={Colors.primary}
                                />
                              );
                            }}
                          />
                        }
                        style={styles.input}
                        onBlur={onBlur}
                        onChangeText={onChange}
                        value={value}
                      />
                    )}
                    name="email"
                  />
                  {errors.email && (
                    <Text style={styles.error}>invaled email</Text>
                  )}
                </View>

                <View style={styles.formcontrol}>
                  <Controller
                    control={control}
                    rules={{
                      required: true,
                    }}
                    render={({ field: { onChange, onBlur, value } }) => (
                      <TextInput
                        label="Password"
                        secureTextEntry={isSecurePass}
                        mode="outlined"
                        placeholder="Type Your Password"
                        right={
                          <TextInput.Icon
                            icon={() => {
                              return (
                                <FontAwesome
                                  name="eye"
                                  size={24}
                                  color={Colors.primary}
                                  onPress={()=>{setIsSecurePass(!isSecurePass)}}
                                />
                              );
                            }}
                          />
                        }
                        style={styles.input}
                        onBlur={onBlur}
                        onChangeText={onChange}
                        value={value}
                      />
                    )}
                    name="password"
                  />
                </View>
              </View>
              <View style={styles.buttonConatine}>
                <Button
                  style={styles.btnSubmit}
                  loading={loading}
                  icon="login"
                  mode="contained"
                  onPress={handleSubmit(onSubmit)}
                >
                  LOGIN
                </Button>
                {error && (
                  <Snackbar
                    visible={error}
                    duration={4000}
                    style={{
                      backgroundColor: "#ff8c8c",
                      justifyContent: "center",
                    }}
                    onDismiss={onDismissSnackBar}
                    action={{
                      label: "close",
                      onPress: () => {
                        onDismissSnackBar;
                      },
                    }}
                  >
                    {error}
                  </Snackbar>
                )}
              </View>
            </Card>
          )}
          {loadCheck && (
            <View style={styles.loadingContainer}>
              <Loading navigation={props.navigation} />
            </View>
          )}
        </View>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor: "#000000c0",
  },
  card: {
    padding: 20,
    margin: "4%",
  },
  imageContainer: {
    alignItems: "center",
  },
  buttonConatine: {
    margin: 3,
    marginTop: 30,
  },
  btnSubmit: {
    backgroundColor: Colors.primary,
  },
  formcontrol: {
    marginVertical: 5,
  },
  container: {
    flex: 1,
  },
  image: {
    flex: 1,
    justifyContent: "center",
    opacity: 0.8,
  },
  error: {
    paddingLeft: 5,
    color: "red",
    fontSize: 12,
  },
  loadingContainer: {
    padding: 20,
    backgroundColor: "#fff",
    opacity: 0.5,
  },
});

export default LoginScreen;
