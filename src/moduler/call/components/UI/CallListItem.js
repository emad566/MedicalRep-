import * as React from 'react';
import  { useContext, useState } from "react";
import { StyleSheet, View, Text, Alert } from "react-native";
import { Appbar, Card, IconButton, Modal, Portal, Button } from "react-native-paper";
import Colors from "../../../../constants/Colors";
import { TouchableOpacity } from "react-native";
import { useDispatch } from "react-redux";
import { edit, index, _delete } from "../../../../store/actions/action";
import { context } from "../../../../context/AppContext";
// import { FontAwesome5 } from "@expo/vector-icons";
import FontAwesome5  from 'react-native-vector-icons/FontAwesome5';
import { CommonActions } from "@react-navigation/native";
import RoutToLogin from "../../../../components/UI/RoutToLogin";

const CallListItem = (props) => {
  const [visible, setVisible] = useState(false);
  const [is_itemShow, setIs_itemShow] = useState(true);

  const dispatch = useDispatch();
  const myContext = useContext(context);
  const permissions = props.permissions

  const style = require("../../../../constants/styles.js");

  const showModal = () => {
    setVisible(true);
  };
  const hideModal = () => setVisible(false);
  const containerStyle = { backgroundColor: "white", padding: 20 };

  const onDelet = (props) => {
    Alert.alert(`Are You Sure You Want To Delete : ${props.title}`, "", [
      {
        text: "Cancel",
        onPress: () => {
          setVisible(true);
        },
        style: "cancel",
      },
      {
        text: "Delete",
        onPress: async () => {
          const delete_path = props.model_path
            ? model_path + "/" + props.id
            : props.delete_path;
          const index_path = props.model_path ? model_path : props.index_path;
          try {
            setIs_itemShow(false)
            await dispatch(_delete(props.id, delete_path, props.model, myContext.userToken));
            await dispatch(index(index_path, props.model, myContext.userToken));
          } catch (err) {
            RoutToLogin(err, props);
          }

          props.navigation.navigate(props.nextDeleteScreen, {isToday:false, permissions:props.permissions});
        },
      },
    ]);
  };

  const onEdit = async (props) => {
    try {
      const edit_path = props.model_path
        ? model_path + "/" + props.id + "/edit"
        : props.edit_path;
      try {
        await dispatch(edit(props.id, edit_path, props.model, myContext.userToken));
      } catch (err) {
        RoutToLogin(err, props);
      }
      const resetAction = CommonActions.reset({
        index: 0,
        routes: [
          {
            name: props.EditScreen,
            params: {
              edit_id: props.id,
              title: props.title,
            },
          },
        ],
      });
      props.navigation.dispatch(resetAction);
      props.setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Card style={{ marginVertical: 5 }}>
      <Portal>
        <Modal
          visible={visible}
          onDismiss={hideModal}
          contentContainerStyle={containerStyle}
        >
          <Appbar style={{ ...styles.bottom }}>
            <View style={styles.hNav}>
              <View>
                <Text style={{ ...style.h2, ...styles.title }}>
                  {props.title}
                </Text>
              </View>
              <View style={styles.iconsContainer}>
                {permissions?.view && <Appbar.Action
                  color="white"
                  size={30}
                  icon="remove-red-eye"
                  onPress={() => {
                    hideModal();
                    props.navigation.navigate(props.ViewScreen, {
                      id: props.id,
                      title: props.title,
                      permissions: permissions
                    });
                  }}
                />}
                {permissions?.update && <Appbar.Action
                  color="white"
                  size={30}
                  icon="edit"
                  onPress={() => {
                    hideModal();
                    onEdit(props);
                  }}
                />}
                {permissions?.delete && <Appbar.Action
                  color="white"
                  size={30}
                  icon="delete"
                  onPress={() => {
                    setVisible(false);
                    onDelet(props);
                  }}
                />}
              </View>
            </View>
          </Appbar>
        </Modal>
      </Portal>

      {is_itemShow && <TouchableOpacity
        activeOpacity={0.5}
      onPress={() => {
        if (props.deleteFromLocalStorage) return;
        if(!permissions?.view ) return;
        props.navigation.navigate(props.ViewScreen, {
          id: props.id,
          title: props.title,
          permissions:permissions
        });
      }}
      >
        <View style={props.is_new == 1 ? styles.itemContainer_is_new : styles.itemContainer}>
          <View style={{ flex: 2, justifyContent: "flex-start" }}>
            <View style={{ flexDirection: "row" }}>
              <FontAwesome5 name={"user-md"} size={24} color={Colors.primary} />
              <Text
                style={{
                  fontSize: 18,
                  fontWeight: "bold",
                  marginLeft: 5,
                  marginBottom: 5,
                }}
              >
                {props.client}
              </Text>
            </View>
            <Text
              style={{
                fontSize: 16,
                fontWeight: "bold",
                textAlign: "left",
                marginBottom: 5,
              }}
            >
              {props.region}
            </Text>
            <Text style={{ fontSize: 16, fontWeight: "bold" }}>
              {props.created_at}
            </Text>
          </View>

          <View style={{ flex: 1 }}>
            <TouchableOpacity onPress={props.deleteFromLocalStorage}>
              <Text
                style={{
                  padding: 3,
                  backgroundColor: props.inPlace === "InPlace" ? "green" : "red",
                  borderRadius: 10,
                  textAlign: "center",
                  fontSize: 16,
                  fontWeight: "bold",
                  marginBottom: 5,
                }}
              >
                {props.inPlace}
              </Text>
            </TouchableOpacity>

            <Text
              style={{
                padding: 3,
                backgroundColor: props.status === "Rejected" ? "red" : props.status === "Approved" ? "green" :
                props.status === "Loading..."?  "blue" : "yellow",
                borderRadius: 10,
                textAlign: "center",
                fontSize: 16,
                fontWeight: "bold",
              }}
            >
              {props.status}
            </Text>

            <Text
              style={{
                padding: 3,
                textAlign: "center",
                fontSize: 16,
                fontWeight: "bold",
              }}
            >
              {props.period}
            </Text>
          </View>

          <View>
            {(props.permissions && props.isOnline) && <IconButton
              color={Colors.primary}
              {...props}
              icon="more-vert"
              onPress={showModal}
              size={30}
            />}
          </View>
        </View>
      </TouchableOpacity>}
    </Card>
  );
};

const styles = StyleSheet.create({
  screen: {
    padding: 20,
    backgroundColor: "#f90",
    borderWidth: 5,
    borderColor: "red",
  },
  bottom: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    padding: 0,
    margin: 0,
    backgroundColor: Colors.primary,
    flexDirection: "row",
    justifyContent: "flex-end",
  },
  hNav: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  iconsContainer: {
    justifyContent: "space-between",
    flexDirection: "row",
  },
  icon: {
    fontSize: 50,
  },
  title: {
    color: "white",
    paddingTop: 12,
    paddingLeft: 10,
  },

  itemContainer: {
    flexDirection: "row",
    flex: 1,
    padding: 10
  },
  itemContainer_is_new: {
    flexDirection: "row",
    flex: 1,
    padding: 10,
    borderLeftWidth: 20,
    borderLeftColor: Colors.primary,
  }
});

export default CallListItem;
