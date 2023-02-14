import * as React from 'react';
import  { useState } from "react";
import { StyleSheet, View, Text, Alert } from "react-native";
import { Appbar, Card, IconButton, Modal, Portal } from "react-native-paper";
// import { FontAwesome } from "@expo/vector-icons";
import FontAwesome  from 'react-native-vector-icons/FontAwesome';
import Colors from "../../../constants/Colors";
import { TouchableOpacity } from "react-native";
import * as clientActions from "../store/actions/ClientAction";
import { useDispatch } from "react-redux";
import RoutToLogin from "../../../components/UI/RoutToLogin";

const ClientItem = (props) => {
  const [visible, setVisible] = useState(false);
  const dispatch = useDispatch();

  const style = require("../../../constants/styles.js");

  const showModal = () => {
    setVisible(true);
  };
  const hideModal = () => setVisible(false);
  const containerStyle = { backgroundColor: "white", padding: 20 };

  const onDelet = (id, name) => {
    Alert.alert(`Are You Sure You Want To Delete this Client : ${name}`, "", [
      {
        text: "Cancel",
        onPress: () => {setVisible(true)},
        style: "cancel",
      },
      {
        text: "Delete",
        onPress: async () => {
          try {
            await dispatch(clientActions.deleteClient(id));
            await dispatch(clientActions.fetchClients());
          } catch (err) {
            RoutToLogin(err, props);
          }

          props.navigation.navigate("IndexClientScreen")
        },
      },
    ]);
  };

  const onEdit = async (id, title) => {
    try {
      await dispatch(clientActions.fetch_client_edit(id));
      props.navigation.navigate("CreateClientScreen", {
        edit_client_id: id,
        client_name: title,
        title: title,
      });
    } catch (error) {
      RoutToLogin(error, props);
      console.log(error);
    }
  }

  

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
                <Appbar.Action
                  color="white"
                  size={30}
                  icon="remove-red-eye"
                  onPress={() => {
                    hideModal();
                    props.navigation.navigate("ViewClientScreen", {
                      id: props.id,
                      client_name: props.title,
                    });
                  }}
                />
                <Appbar.Action
                  color="white"
                  size={30}
                  icon="edit"
                  onPress={() => {
                    hideModal();
                    onEdit(props.id, props.title)
                  }}
                />
                <Appbar.Action
                  color="white"
                  size={30}
                  icon="delete"
                  onPress={() => {
                    setVisible(false);
                    onDelet(props.id, props.title);
                  }}
                />
              </View>
            </View>
          </Appbar>
        </Modal>
      </Portal>

      <TouchableOpacity
        activeOpacity={0.5}
        onPress={() => {
          props.navigation.navigate("ViewClientScreen", {
            id: props.id,
            client_name: props.title,
          });
        }}
      >
        <Card.Title
          title={props.title}
          id={props.id}
          subtitle={props.region}
          left={(props) => (
            <FontAwesome
              style={{ color: Colors.primary }}
              {...props}
              name="user-circle-o"
              size={40}
              color="black"
            />
          )}
          right={(props) => (
            <IconButton
              color={Colors.primary}
              {...props}
              icon="more-vert"
              onPress={showModal}
            />
          )}
        />
      </TouchableOpacity>
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
});

export default ClientItem;
