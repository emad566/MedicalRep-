export const LOGIN = "LOGIN";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { create } from "../../../../store/actions/action";


export const login = (email, password, isPrint=false) => {
  return async (dispatch) => {
    const fcmtoken = await AsyncStorage.getItem('fcmtoken');
    const response = await fetch(
      "https://mrep.marvel-inter.com/api/users/login",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          password: password,
          device_token:fcmtoken
        }),
      }
    );
    
    const respData = await response.json();
    const status = respData.status;
    
    if (status !== 1) {
      throw new Error("Inalid Data , Login Failed");
    }
    
    let userToken = respData.access_token;
    
    userToken = userToken.replace(/"/g, "");
    let userToken_Bearer = `Bearer ${userToken}`;

    if (status === 1) {
      try {
        await AsyncStorage.setItem("userToken", userToken_Bearer);
        await AsyncStorage.setItem("Auth_Data", JSON.stringify(respData));
           // create call data to handel offline call
      const callData = await AsyncStorage.getItem("Data_To_Create_Call")
      
      if(callData == null){
        await dispatch(create("visits/create", "visits",  userToken_Bearer));
      }
      } catch (error) {
        console.log(error);
      }
    }

    userToken = await AsyncStorage.getItem("userToken");
  };
};

export const checkLogin = () => {
  const dispatch = useDispatch();
  const [auth, setIsAouth] = useState(false);
  const [isLoading, setisLoading] = useState(true);
  
  useEffect(async () => {
    userToken = await AsyncStorage.getItem("userToken");
    if (userToken) {
      userToken = userToken.replace(/"/g, "");
      const response = await fetch(
        "https://mrep.marvel-inter.com/api/users/islogin",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: `Bearer ${userToken}`,
          },
        }
      );

      const respData = await response.json();
      if (respData.status == 1) {
        setIsAouth(true);
      } else {
        setIsAouth(false);
      }
      setisLoading(false);
    } else {
      setIsAouth(false);
      setisLoading(false);
    }
  }, [dispatch]);
  return { auth: auth, isLoading: isLoading };
};
