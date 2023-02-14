import React from "react";
import { StyleSheet, View, Text } from "react-native";
import BackNav from "./../../../navigations/BackNav";
import { useSelector } from "react-redux";
import { useState } from "react";
import { useContext } from "react";
import { context } from "./../../../context/AppContext";
import Loading from "./../../../components/UI/Loading";
import { FlatList } from "react-native";
import FontAwesome5  from 'react-native-vector-icons/FontAwesome5';
import Colors from "../../../constants/Colors";
import { useDispatch } from "react-redux";
import { useCallback } from "react";
import { useEffect } from "react";
import { index } from "./../../../store/actions/action";
import ListItem from "./../../../components/UI/ListItem";
import HeaderButton from "../../../components/UI/HeaderButton";
import { CommonActions } from "@react-navigation/native";
import NoData from "../../../components/UI/NoData";
import RoutToLogin from "../../../components/UI/RoutToLogin";

const IndexProductScreen = (props) => {
  const index_data = useSelector((state) => state.reducer.INDEX["products"]);
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [error, setError] = useState();
  const myContext = useContext(context);
  const permissions = myContext.Auth_permission
  const Product_Permissions = {
          view: permissions.includes('Product_Show'),  
          delete: permissions.includes('Product_Delete'), 
          update: permissions.includes('Product_Edit') 
  }

  const dispatch = useDispatch();


  const loadIndex_data = useCallback(async () => {
    setError(null);

    setIsRefreshing(true);
    try {
      await dispatch(index("products", "products", myContext.userToken));
    } catch (err) {
      RoutToLogin(err, props);
      setError(err);
    }
    setIsRefreshing(false);
  }, [dispatch, setError, setIsLoading]);

  useEffect(() => {
    setIsLoading(true);
    loadIndex_data().then(() => {
      setIsLoading(false);
    });
  }, [dispatch, loadIndex_data]);

  return (
    <BackNav
      HeaderButton={
        permissions.includes('Product_Create') &&  <HeaderButton
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
      title="List Products"
      navigation={props.navigation}
    >
      {error && <Text>Error loading data from the host</Text>}
      {!isLoading && !index_data && <NoData navigation={props.navigation} />}
      {isLoading && <Loading noBackNav={true} navigation={props.navigation} />}

      {(!isLoading && index_data) && (
        <FlatList
          onRefresh={loadIndex_data}
          refreshing={isRefreshing}
          data={index_data}
          keyExtractor={(item) => item.id}
          renderItem={(itemData) => (
            <ListItem
              permissions={Product_Permissions}
              setIsLoading={setIsLoading}
              navigation={props.navigation}
              id={itemData.item.id}
              title={itemData.item.Product_Name}
              subtitle={itemData.item.line? itemData.item.line.line_name : itemData.item.brand}
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
              edit_path={"products/" + itemData.item.id + "/edit"}
              index_path={"products"}
              delete_path={"products/" + itemData.item.id}
            />
          )}
        />
      )}
    </BackNav>
  );
};

const styles = StyleSheet.create({});

export default IndexProductScreen;
