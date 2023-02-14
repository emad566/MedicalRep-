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
import { Card } from "react-native-paper";
// import { FontAwesome5 } from "@expo/vector-icons";
import FontAwesome5  from 'react-native-vector-icons/FontAwesome5';
import Colors from "../../../constants/Colors";
import { view } from "../../../store/actions/action";
import HeaderButton from "../../../components/UI/HeaderButton";
import RowData from "../../../components/UI/RowData";
import { ScrollView } from "react-native-gesture-handler";
import ListItem from "../../../components/UI/ListItem";
import { CommonActions } from "@react-navigation/native";
import RoutToLogin from "../../../components/UI/RoutToLogin";

const ViewSpecialistScreen = (props) => {

  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState();
  const myContext = useContext(context);
  const permissions = myContext.Auth_permission;

  let view_id = useSelector((state) => state.reducer.STORE_ID["specialists"]);
  if (!props.route.params.added_id) {
    view_id = props.route.params.id;
  }

  let view_data = useSelector((state) => state.reducer.VIEW["specialists"]);

  const dispatch = useDispatch();

  const loadRefresh = useCallback(async () => {
    setError(false);
    try {
      await dispatch(
        view(view_id, "specialists/" + view_id, 'specialists', myContext.userToken)
      );
    } catch (err) {
      RoutToLogin(err, props);
      setError(err);
    }
  }, [dispatch, setError, setIsLoading]);

  useEffect(()=>{
    const getData =() => {
      setIsLoading(true);
      loadRefresh().then(() => {
        setIsLoading(false);
      });
    }
    getData()
    return ()=>{}
  }, [dispatch, loadRefresh]);

  return (
    <BackNav
      HeaderButton={
        permissions.includes('Specialist_Create') && <HeaderButton
          name="plus"
          onPress={() => {
            const resetAction = CommonActions.reset({
              index: 0,
              routes: [
                { name: "CreateSpecialistScreen", params: { dit_id: false } },
              ],
            });
            props.navigation.dispatch(resetAction);
          }}
        />
      }
      title={"Specialist: " + (view_data? view_data.specialist_name : "")}
      navigation={props.navigation}
    >
      {error && <Text>Error Loading data from server</Text>}
      {!isLoading && !view_data && <NoData navigation={props.navigation} />}
      {isLoading && <Loading noBackNav={true} navigation={props.navigation} />}
      {!isLoading && (
        <Card style={{ margin: 20 }}>
          <ListItem
            permissions={props.route.params.permissions}
            setIsLoading={setIsLoading}
            navigation={props.navigation}
            id={(view_data? view_data.id : "")}
            title={(view_data? view_data.specialist_name : "")}
            subtitle=""
            leftIcon={() => {
              return (
                <FontAwesome5 name="codepen" size={24} color={Colors.primary} />
              );
            }}
            nextDeleteScreen="IndexSpecialistScreen"
            ViewScreen="ViewSpecialistScreen"
            EditScreen="CreateSpecialistScreen"
            model="specialists"
            edit_path={"specialists/" + (view_data? view_data.id : "") + "/edit"}
            index_path={"specialists"}
            delete_path={"specialists/" + (view_data? view_data.id : "")}
          />

          <ScrollView style={{ paddingBottom: 200 }}>
            <View style={{ paddingLeft: 10 }}>
              <RowData
                color={Colors.accent}
                label="Specialist"
                value={(view_data? view_data.specialist_name : "")}
              />
            </View>

            <View style={{ padding: 50 }}></View>
          </ScrollView>
        </Card>
      )}
    </BackNav>
  );
};

const styles = StyleSheet.create({});

export default ViewSpecialistScreen;
