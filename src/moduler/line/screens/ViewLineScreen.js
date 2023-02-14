import * as React from 'react';
import  { useCallback, useState } from "react";
import { StyleSheet, View, Text } from "react-native";
import BackNav from "../../../navigations/BackNav";
import { useContext } from "react";
import { context } from "../../../context/AppContext";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import LoadingBtn from "../../../components/UI/LoadingBtn";
import NoData from "../../../components/UI/NoData";
import {
  Card,
  Divider,
  Subheading,
} from "react-native-paper";
import FontAwesome5  from 'react-native-vector-icons/FontAwesome5';
import Colors from "../../../constants/Colors";
import { view } from "../../../store/actions/action";
import ListItem from "./../../../components/UI/ListItem";
import { ScrollView } from "react-native-gesture-handler";
import RowData from "../../../components/UI/RowData";
import HeaderButton from "../../../components/UI/HeaderButton";
import ErrorArray from '../../../components/UI/ErrorArray';
import { CommonActions } from "@react-navigation/native";
import RoutToLogin from "../../../components/UI/RoutToLogin";


const ViewLineScreen = (props) => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState();
  const myContext = useContext(context);
  const permissions = myContext.Auth_permission;

  let view_id;
  view_id = useSelector((state) => state.reducer.STORE_ID['lines']);
  if (!props.route.params.added_id) {
    view_id = props.route.params.id;
  }

  let view_data = useSelector((state) => state.reducer.VIEW['lines']);

  const dispatch = useDispatch();
 
  const loadRefresh = useCallback(async () => {
    setError(null);
    try {
      await dispatch(view(view_id, "lines/" + view_id, 'lines', myContext.userToken));
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
        permissions.includes('Line_Create') &&  <HeaderButton
          name="plus"
          onPress={() => {
            const resetAction = CommonActions.reset({
              index: 0,
              routes: [
                { name: "CreateLineScreen", params: { dit_id: false } },
              ],
            });
            props.navigation.dispatch(resetAction);
          }} 
        />
      }
      title={"line: " + ((view_data && view_data.line) ? view_data.line.line_name : " ")}
      navigation={props.navigation}
    >
        {error && <ErrorArray error="Error in load data from server!" />}

        {(!isLoading && !view_data) && 
          <NoData noBackNav={true} title="List Lines: No Internet" navigation={props.navigation} />
        }

        {isLoading && <LoadingBtn />}

        <Card style={{ margin: 20 }}>
          <ListItem
            permissions={props.route.params.permissions}
            setIsLoading={setIsLoading}
            navigation={props.navigation}
            id={((view_data && view_data.line)? view_data.line.id : " ")}
            title={((view_data && view_data.line)? view_data.line.line_name : " ")}
            subtitle={view_data ? view_data.region?.r_name : " "}
            leftIcon={() => {
              return (
                <FontAwesome5
                  name="grip-lines"
                  size={24}
                  color={Colors.primary}
                />
              );
            }}
            nextDeleteScreen="IndexLineScreen"
            ViewScreen="ViewLineScreen"
            EditScreen="CreateLineScreen"
            model="lines"
            edit_path={"lines/" + ((view_data && view_data.line)? view_data.line.id : " ") + "/edit"}
            index_path={"lines"}
            delete_path={"lines/" + ((view_data && view_data.line)? view_data.line.id : " ")}
          />

          <ScrollView style={{ paddingBottom: 200 }}>
            {(view_data && view_data.line && view_data.line.products) && (
              <View>
                <Card.Title
                  titleStyle={{
                    fontSize: 20,
                    padding: 0,
                    margin: 0,
                    color: Colors.primary,
                  }}
                  style={{ color: Colors.primary, padding: 1, maxHeight: 10 }}
                  title="Products"
                />
                <View style={{ paddingLeft: 20, paddingRight: 20 }}>
                  {view_data.line.products.map((product) => {
                    return (
                      <View key={product.id}>
                        <Divider />
                        <View style={{ padding: 10 }}>
                          <Subheading style={{ color: Colors.primary }}>
                            <FontAwesome5
                              name="capsules"
                              size={16}
                              color={Colors.primary}
                            />
                            {product.Product_Name}
                          </Subheading>
                          <View style={{ paddingLeft: 10 }}>
                            <RowData
                              color={Colors.accent}
                              label="Properties"
                              value={product.properties}
                            />
                            <RowData
                              color={Colors.accent}
                              label="Active Ingredient"
                              value={product.active_ingredient}
                            />
                            <RowData
                              color={Colors.accent}
                              label="Packs"
                              value={product.packs}
                            />
                            <RowData
                              color={Colors.accent}
                              label="brand"
                              value={product.brand}
                            />
                            <RowData
                              color={Colors.accent}
                              label="Public Price"
                              value={product.Public_Price}
                            />
                          </View>
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
    </BackNav>
  );
};

const styles = StyleSheet.create({});

export default ViewLineScreen;
