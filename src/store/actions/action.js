import * as React from 'react';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useDispatch } from "react-redux";
import Routes from "../../constants/Routes";
export const USERTOKEN = "USERTOKEN";
export const INDEX = "INDEX";
export const VIEW = "VIEW";
export const CREATE = "CREATE";
export const STORE_ID = "STORE_ID";
export const EDIT = "EDIT";
export const UPDATE = "UPDATE";
export const DELETE = "DELETE";
export const RESTOR = "RESTOR";
export const API = "API";



export const get_userToken = async (userToken = false) => {
  if (!userToken) {
    const dispatch = useDispatch();
    await dispatch(set_userToken());
  }
};

export const set_userToken = (currentToken = false) => {
  return async (dispatch) => {
    try {
      let userToken;
      if (!currentToken) {
        userToken = await AsyncStorage.getItem("userToken");
        userToken = userToken.replace(/"/g, "");
        userToken = `Bearer ${userToken}`;
      } else {
        userToken = currentToken;
      }

      dispatch({ type: USERTOKEN, value: userToken, model: model });
    } catch (err) {
      throw err;
    }
  };
};

export const index = (path, model = "model", token = false, abs = false) => {
  const fullPath = !abs ? Routes.domain + path : path;
  return async (dispatch) => {
    const response = await fetch(fullPath, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        accept: "application/json",
        Authorization: token,
      },
    });
    const resData = await response.json();
    if (resData.status == 1) {
      dispatch({ type: INDEX, value: resData.data, model: model });
      
      AsyncStorage.setItem("index_"+model , JSON.stringify(resData.data))
    } else {
      throw { type: "server", error: resData };
    }
  };
};

export const view = (id, path, model = "model", token = false, abs = false) => {
  const fullPath = !abs ? Routes.domain + path : path;

  return async (dispatch) => {
    const response = await fetch(fullPath, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        accept: "application/json",
        Authorization: token,
      },
    });
    const resData = await response.json();

    if (resData.status == 1) {
      dispatch({ type: VIEW, value: resData.data, model: model });
    } else {
      throw { type: "server", error: resData };
    }
  };
};


export const create = (path, model = "model", token = false, isPrint=false,  abs = false) => {
  const fullPath = !abs ? Routes.domain + path : path;
  return async (dispatch) => {
    
    const response = await fetch(fullPath, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        accept: "application/json",
        Authorization: token,
      },
    });
    const resData = await response.json();
    if(isPrint){
      console.log(model + ": Path: " + path );
      console.log(resData);
    }
    if (resData.status == 1) {
      dispatch({ type: CREATE, value: resData.data, model: model });
      if(path === "visits/create"){
        await AsyncStorage.setItem("DataToCreateCall", JSON.stringify(resData.data));
      }
    } else {
      throw { type: "server", error: resData };
    }
  };
};

export const store = (
  data,
  path,
  model = "model",
  token = false,
  abs = false
) => {
  const fullPath = !abs ? Routes.domain + path : path;

  return async (dispatch) => {

    const response = await fetch(fullPath, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        accept: "application/json",
        Authorization: token,
      },
      body: JSON.stringify(data),
    });

    const resData = await response.json();
    if (resData.status == 1) {
      dispatch({ type: STORE_ID, value: resData.data.added_id, model: model });
    } else {
      throw { type: "server", error: resData };
    }
  };
};

export const edit = (id, path, model = "model", token = false, abs = false) => {
  const fullPath = !abs ? Routes.domain + path : path;
  return async (dispatch) => {
    const response = await fetch(fullPath, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        accept: "application/json",
        Authorization: token,
      },
    });
    const resData = await response.json();
    if (resData.status == 1) {
      dispatch({ type: EDIT, value: resData.data, model: model });
    } else {
      throw { type: "server", error: resData };
    }
  };
};

export const update = (
  id,
  data,
  path,
  model = "model",
  token = false,
  abs = false
) => {
  const fullPath = !abs ? Routes.domain + path : path;

  return async (dispatch) => {
    const response = await fetch(fullPath, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        accept: "application/json",
        Authorization: token,
      },
      body: JSON.stringify(data),
    });
    const resData = await response.json();

    if (resData.status == 1) {
      dispatch({ type: UPDATE, value: resData.data, model: model });
    } else {
      throw { type: "server", error: resData };
    }
  };
};

export const _delete = (
  id,
  path,
  model = "model",
  token = false,
  abs = false
) => {
  const fullPath = !abs ? Routes.domain + path : path;
  return async (dispatch) => {
    const response = await fetch(fullPath, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        accept: "application/json",
        Authorization: token,
      },
    });
    const resData = await response.json();
    if (resData.status == 1) {
      dispatch({ type: DELETE, value: resData.data, model: model });
    } else {
      throw { type: "server", error: resData };
    }
  };
};

export const _restore = (
  id,
  path,
  model = "model",
  token = false,
  abs = false
) => {
  const fullPath = !abs ? Routes.domain + path : path;
  return async (dispatch) => {
    const response = await fetch(fullPath, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        accept: "application/json",
        Authorization: token,
      },
    });
    const resData = await response.json();
    if (resData.status == 1) {
      dispatch({ type: RESTOR, value: resData.data, model: model });
    } else {
      throw { type: "server", error: resData };
    }
  };
};

export const api = (
  path,
  method,
  data = false,
  token = false,
  key = false,
  consleKey = false,
  abs = false
) => {
  const fullPath = !abs ? Routes.domain + path : path;
  
  return async (dispatch) => {
    const response = await fetch(fullPath, {
      method: method,
      headers: {
        "Content-Type": "application/json",
        accept: "application/json",
        Authorization: token,
      },
      body: data !== false ? JSON.stringify(data) : "",
    });

    const resData = await response.json();

    if(consleKey && consleKey == key){
      console.log("resData: "+ key + " fullPath: "+ fullPath);
      console.log(resData);
    }

    if (resData.status == 1) {
      dispatch({ type: API, value: resData.data, key: key });
    } else {
      throw { type: "server", error: resData };
    }
  };
};

export const apiFormData = (
  path,
  name,
  data = false,
  token = false,
  key = false,
  abs = false
) => {
  const fullPath = !abs ? Routes.domain + path : path;
  return async (dispatch) => {
    let imageData = new FormData();
    imageData.append('image', {uri: data.path , name: 'photo.png', filename :'imageName.png',type: 'image/png'});
    imageData.append('Content-Type', 'image/png');

    try {
    const response = await fetch(fullPath, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "content-type": "multipart/form-data",
        Authorization: token,
      },
      body: imageData,
    });
      const resData = await response.json();
    } catch (error) {
      console.log(error)
    }
  };
};
