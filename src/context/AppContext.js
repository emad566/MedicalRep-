import * as React from 'react';
import { useState, useEffect } from "react";
import { AsyncStorage } from '@react-native-async-storage/async-storage';
import { useReducer } from "react";
import { contextInit, contextReducer } from "./contextReducer";
export const context = React.createContext();

const AppContext = (props) => {
  const [userToken, setUserToken] = useState(false);
  const [profile_path, setProfile_path] = useState("https://mrep.marvel-inter.com/uploads/images/profiles/loginbg.jpeg");
  const app_version = "2.0.2BetaCli";

  const [contextState, dipatchContextState] = useReducer(contextReducer, contextInit());
  
  const  Auth_permission_temp =  [
      "Area",//done
      "Area_Create",//done
      "Area_Index",//done
      "Area_Delete", //done
      "Area_Edit", //done
      "Area_Show", //done

      "Line",//done
      "Line_Create",//done
      "Line_Index",//done
      "Line_Show",//done
      "Line_Delete",//done
      "Line_Edit",//done

      "Product",//done
      "Product_Create",//done
      "Product_Index",//done
      "Product_Show",//done
      "Product_Delete",//done
      "Product_Edit",//done

      
      "Specialist",//done
      "Specialist_Create",//done
      "Specialist_Index",//done
      "Specialist_Show", //done
      "Specialist_Delete", //done
      "Specialist_Edit", //done

      
      "Role",//done
      "Role_Create",//done
      "Role_Index",//done
      "Role_Show", //done
      "Role_Delete", //done
      "Role_Edit", //done


      "Permission",//done
      "Permission_Create",//done
      "Permission_Index",//done
      "Permission_Show",//done
      "Permission_Delete",//done
      "Permission_Edit",//done


      "Region",//done
    
      "User",//done
      "User_Create",//done
      "User_Index",//done
      "User_Show",//done
      "User_Edit",//done
      "User_Delete",//done



      "Client" ,//done
      "Client_Create",//done
      "Client_Index", //done
      "Client_Show",//done
      "Client_Edit",//done
      "Client_Delete",//done



      "Call",//done
      "Call_Index",//index
      "Call_Create",//done
      "Call_Delete",//done
      "Call_Show",//done
      "Call_Edit",//done
      "Call_Reject",//done
      "Call_approve",//done

      "Plan" , //done
      // "All_Users_Plans",//done
      "Plan_show_All_Users_Plans",//done
  ]
  
  const [Auth_Data, setAuth_Data] = useState([]);
  const contextParms = {
    userToken: userToken,
    setUserToken: setUserToken,
    app_version: app_version,
    profile_path: profile_path,
    setProfile_path: setProfile_path,
    Auth_permission :  (Auth_Data?.Auth_Permission !== undefined)? Auth_Data?.Auth_Permission : [],
    Auth_Data : Auth_Data,
    setAuth_Data : setAuth_Data,
    contextState:contextState,
    dipatchContextState:dipatchContextState
  }

  return (
    <context.Provider
      value={contextParms}
    >
      {props.children}
    </context.Provider>
  );
};
export default AppContext;
