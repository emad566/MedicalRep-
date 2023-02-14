import * as React from 'react';
import { useContext, useState } from "react";
import { StyleSheet, View, Text, Alert } from "react-native";
import { Appbar, Card, IconButton, Modal, Portal } from "react-native-paper";
import Colors from "../../constants/Colors";
import { TouchableOpacity } from "react-native";
import { useDispatch } from "react-redux";
import { edit, index, _delete, _restore } from "../../store/actions/action";
import { context } from "../../context/AppContext";
import { CommonActions } from "@react-navigation/native";
import RoutToLogin from "./RoutToLogin";
import MaterialIcons  from 'react-native-vector-icons/MaterialIcons';


const ListItem = (props) => {
  const permissions = props.permissions
  console.log("permissions");
  console.log(permissions);
  const [visible, setVisible] = useState(false);
  const [is_itemShow, setIs_itemShow] = useState(true);
  const dispatch = useDispatch();
  const myContext = useContext(context);

  const style = require("../../constants/styles.js");

  const showModal = () => {
    setVisible(true);
  };
  const hideModal = () => setVisible(false);
  const containerStyle = { backgroundColor: "white", padding: 20 };

  const onDelet = (props) => {
    Alert.alert(`Are You Sure You Want To Delete : ${title}`, "", [
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
            if(props.deleted_at){
              setIs_itemShow(false)
            }
            await dispatch(
              _delete(props.id, delete_path, props.model, myContext.userToken)
            );
            await dispatch(index(index_path, props.model, myContext.userToken));
          } catch (err) {
            RoutToLogin(err, props);
          }
          props.navigation.navigate(props.nextDeleteScreen);
        },
      },
    ]);
  };
  
  const onRestore = (props) => {
    Alert.alert(`Are You Sure You Want To Restore : ${title}`, "", [
      {
        text: "Cancel",
        onPress: () => {
          setVisible(true);
        },
        style: "cancel",
      },
      {
        text: "Restore",
        onPress: async () => {
          const restore_path = props.restore_path;
          const index_path = props.model_path ? model_path : props.index_path;
          try {
            setIs_itemShow(true)
            await dispatch(
              _restore(props.id, restore_path, props.model, myContext.userToken)
            );
            props.delete_at = false
            await dispatch(index(index_path, props.model, myContext.userToken));
          } catch (err) {
            RoutToLogin(err, props);
          }
          props.navigation.navigate(props.nextDeleteScreen);
        },
      },
    ]);
  };

  const onEdit = async (props) => {
    try {
      props.setIsLoading(true);
      const edit_path = props.model_path
        ? model_path + "/" + props.id + "/edit"
        : props.edit_path;
      try {
        await dispatch(
          edit(props.id, edit_path, props.model, myContext.userToken)
        );
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
              title: title,
            },
          },
        ],
      });
      props.navigation.dispatch(resetAction);
      // props.setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  const title = typeof props.title == "function" ? props.title() : props.title;
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
                <Text style={{ ...style.h2, ...styles.title, fontSize: 14 }}>
                  {title.slice(0, 30)}
                </Text>
              </View>
              <View style={styles.iconsContainer}>
                {permissions?.view &&<Appbar.Action
                  color="white"
                  size={30}
                  icon="remove-red-eye"
                  onPress={() => {
                    hideModal();
                    props.navigation.navigate(props.ViewScreen, {
                      id: props.id,
                      title: title,
                      permissions:permissions
                    });
                  }}
                />}
             { permissions?.update &&   <Appbar.Action
                  color="white"
                  size={30}
                  icon="edit"
                  onPress={() => {
                    // props.setIsLoading(true)
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
               
               {permissions?.delete && props.deleted_at && <Appbar.Action
                  color="white"
                  size={30}
                  icon="restore-from-trash"
                  onPress={() => {
                    setVisible(false);
                    onRestore(props);
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
          if(!permissions?.view)return
          props.navigation.navigate(props.ViewScreen, {
            id: props.id,
            title: title,
            permissions:permissions
          });
        }}
      >
        <Card.Title
          title={title}
          id={props.id}
          size={10}
          titleStyle={{ fontSize:props.fontsize? props.fontsize : 16 }}
          subtitle={props.subtitle}
          left={props.leftIcon}
          right={(props) => {
            if(permissions?.update || permissions?.delete || permissions?.view)
            return(
              <MaterialIcons name="more-vert" size={35} color="#000" onPress={showModal}/>
            )
          }}
        />
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
});

export default ListItem;
