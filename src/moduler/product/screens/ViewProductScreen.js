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
import {
  Avatar,
  Caption,
  Card,
  Divider,
  Headline,
  Subheading,
} from "react-native-paper";
import FontAwesome5  from 'react-native-vector-icons/FontAwesome5';
import Colors from "../../../constants/Colors";
import { view } from "../../../store/actions/action";
import ListItem from "./../../../components/UI/ListItem";
import { ScrollView } from "react-native-gesture-handler";
import RowData from "../../../components/UI/RowData";
import HeaderButton from "../../../components/UI/HeaderButton";
import { CommonActions } from "@react-navigation/native";
import RoutToLogin from "../../../components/UI/RoutToLogin";

const ViewProductScreen = (props) => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState();
  const myContext = useContext(context);
  const permissions = myContext.Auth_permission;

  let view_id = useSelector((state) => state.reducer.STORE_ID["products"]);
  if (!props.route.params.added_id) {
    view_id = props.route.params.id;
  }

  let view_data = useSelector((state) => state.reducer.VIEW["products"]);


  const dispatch = useDispatch();

  const loadRefresh = useCallback(async () => {
    setError(null);
    try {
      await dispatch(view(view_id, "products/" + view_id, 'products', myContext.userToken));
    } catch (err) {
      RoutToLogin(err, props);
      setError(err);
    }
  }, [dispatch, setError, setIsLoading]);

  useEffect(() => {
    setIsLoading(true);
    loadRefresh().then(() => {
      setIsLoading(false);
    });
  }, [dispatch, loadRefresh]);

  return (
    <BackNav
      HeaderButton={
        permissions.includes('Product_Create') && <HeaderButton
          name="plus"
          onPress={() => {
            const resetAction = CommonActions.reset({
              index: 0,
              routes: [
                { name: "CreateProductScreen", params: { dit_id: false } },
              ],
            });
            props.navigation.dispatch(resetAction);
          }}
        />
      }
      title={"Product: " + (view_data? view_data.Product_Name : "")}
      navigation={props.navigation}
    >
      {error && <Text>Error loading data from the host</Text>}
      {!isLoading && !view_data && <NoData navigation={props.navigation} />}
      {isLoading && <Loading noBackNav={true} navigation={props.navigation} />}

      {!isLoading && (
        <Card style={{ margin: 20 }}>
          <ListItem
            permissions={props.route.params.permissions}
            setIsLoading={setIsLoading}
            navigation={props.navigation}
            id={(view_data? view_data.id : "")}
            title={(view_data? view_data.Product_Name : "")}
            subtitle={(view_data? view_data.brand : "")}
            leftIcon={() => {
              return (
                <FontAwesome5
                  name="capsules"
                  size={24}
                  color={Colors.primary}
                />
              );
            }}
            nextDeleteScreen="IndexProductScreen"
            ViewScreen="ViewProductScreen"
            EditScreen="CreateProductScreen"
            model="products"
            edit_path={"products/" + (view_data? view_data.id : "") + "/edit"}
            index_path={"products"}
            delete_path={"products/" + (view_data? view_data.id : "")}
          />

          <ScrollView style={{ paddingBottom: 200 }}>
            <View style={{ paddingLeft: 10 }}>
              <RowData
                color={Colors.accent}
                label="properties"
                value={(view_data? view_data.properties : "")}
              />
              <RowData
                color={Colors.accent}
                label="Active Ingredient"
                value={(view_data? view_data.active_ingredient : "")}
              />
              <RowData
                color={Colors.accent}
                label="Packs"
                value={(view_data? view_data.packs : "")}
              />
              <RowData
                color={Colors.accent}
                label="brand"
                value={(view_data? view_data.brand : "")}
              />
              <RowData
                color={Colors.accent}
                label="Public Price"
                value={(view_data? view_data.Public_Price : "")}
              />
              <RowData
                color={Colors.accent}
                label="Is Active"
                value={(view_data && view_data.is_active === "1") ? "True" : "False"}
              />
            </View>
            {(view_data && view_data.specialists) && (
              <View>
                <Card.Title
                  titleStyle={{
                    fontSize: 18,
                    padding: 0,
                    margin: 0,
                    color: Colors.primary,
                    fontWeight: "bold",
                  }}
                  style={{ color: Colors.primary, padding: 1, maxHeight: 10 }}
                  title="Specialists"
                  left={() => (
                    <FontAwesome5
                      name="codepen"
                      size={24}
                      color={Colors.primary}
                    />
                  )}
                />
                <View style={{ paddingLeft: 20, paddingRight: 20 }}>
                  {view_data.specialists.map((specialists, index) => {
                    return (
                      <View key={specialists.id}>
                        <Divider />
                        <View style={{ padding: 10 }}>
                          <RowData
                            color={Colors.accent}
                            label={index + 1}
                            value={specialists.specialist_name}
                          />
                        </View>
                      </View>
                    );
                  })}
                </View>
              </View>
            )}
            <View style={{ padding: 50 }}></View>
          </ScrollView>
        </Card>
      )}
    </BackNav>
  );
};

const styles = StyleSheet.create({});

export default ViewProductScreen;
