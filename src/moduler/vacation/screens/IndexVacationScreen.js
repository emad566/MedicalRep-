import * as React from 'react';
import  { useCallback, useContext, useEffect, useState } from "react";
import { StyleSheet, FlatList } from "react-native";
import BackNav from "../../../navigations/BackNav";
import { useSelector, useDispatch } from "react-redux";
import NoData from "../../../components/UI/NoData";
import Loading from "../../../components/UI/Loading";
import { context } from "../../../context/AppContext";
import { index, _delete } from "../../../store/actions/action";
import ListItem from "../../../components/UI/ListItem";
import FontAwesome5  from 'react-native-vector-icons/FontAwesome5';
import Colors from "../../../constants/Colors";
import HeaderButton from "../../../components/UI/HeaderButton";
import { CommonActions } from "@react-navigation/native";
import RoutToLogin from "../../../components/UI/RoutToLogin";

const IndexVacationScreen = (props) => {
  const index_data = useSelector((state) => state.reducer.INDEX["vacations"]);
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [error, setError] = useState();

  const myContext = useContext(context);
  const permissions = myContext.Auth_permission

  const Vacation_Permissions = {
    view: permissions.includes('Vacation_Show'),  
    delete: permissions.includes('Vacation_Delete'), 
    update: permissions.includes('Vacation_Edit') ,
    accept: permissions.includes('Vacation_Accept'),
    reject: permissions.includes('Vacation_Reject'), 
    pending: permissions.includes('Vacation_Pending') 
  }

  const dispatch = useDispatch();

  const loadIndex = useCallback(async () => {
    setError(null);

    setIsRefreshing(true);
    try {
      await dispatch(index("vacations", "vacations", myContext.userToken));
    } catch (err) {
      RoutToLogin(err, props);
      setError(err);
    }
    setIsRefreshing(false);
  }, [setError, setIsLoading]);

  useEffect(()=>{
    const getData =() => {
      setIsLoading(true);
      loadIndex().then(() => {
        setIsLoading(false);
      });
    }
    getData()
    return ()=>{}
  }, [loadIndex]);

  

  return (
    <BackNav
      HeaderButton={
        permissions.includes('Vacation_Create') && <HeaderButton
          name="plus"
          onPress={() => {
            const resetAction = CommonActions.reset({
              index: 0,
              routes: [
                { name: "CreateVacationScreen", params: { edit_id: false } },
              ],
            });
            props.navigation.dispatch(resetAction);
          }}
        /> 
      }

      navigation={props.navigation}
    >
      {!isLoading && !index_data && <NoData navigation={props.navigation} />}
      {isLoading && <Loading noBackNav={true} navigation={props.navigation} />}
      {!isLoading && (
        <FlatList
          onRefresh={loadIndex}
          refreshing={isRefreshing}
          data={index_data}
          keyExtractor={(item) => item.id}
          renderItem={(itemData) => (
            <ListItem
              permissions={Vacation_Permissions}
              setIsLoading={setIsLoading} 
              navigation={props.navigation}
              id={itemData.item.id}
              title={itemData.item.user.name}
              subtitle={itemData.item.vacation_date + ":  " + itemData.item.status.vacation_status}
              leftIcon={() => {
                var ico = "calendar";
                if(itemData.item.status.id ===20) 
                  ico = "calendar-check";
                else if (itemData.item.status.id ===30)
                  ico =  "calendar-times";
                return (
                  <FontAwesome5
                    name={ico}
                    size={24}
                    color={Colors.primary}
                  />
                );
              }}
              nextDeleteScreen="IndexVacationScreen"
              ViewScreen="ViewVacationScreen"
              EditScreen="CreateVacationScreen"
              model="Vacations"
              edit_path={"Vacations/" + itemData.item.id + "/edit"}
              index_path={"Vacations"}
              delete_path={"Vacations/" + itemData.item.id}
            />
          )}
        />
      )}
    </BackNav>
  );
};

const styles = StyleSheet.create({
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default IndexVacationScreen;