import * as React from 'react';
import { useState } from "react";
import {  StyleSheet, View } from "react-native";
import { Checkbox, Card } from "react-native-paper";
import Colors from "../../../constants/Colors";
import { TouchableOpacity } from "react-native";
import { _delete } from "../../../store/actions/action";

const ListItemClient = (props) => {
  const [itemClientId, setItemClientId] = useState(props.itemClientId);
  const title = typeof props.title == "function" ? props.title() : props.title;

  const itemCheckHandler = ()=>{
    if (itemClientId != props.client_id) {
      setItemClientId(props.client_id);

      const sclients = [props.client_id, ...props.myClientList];
      props.setMyClientList(sclients);
    } else {
      setItemClientId(false);

      const sclients = props.myClientList.filter((c)=> c != props.client_id);
      props.setMyClientList(sclients);
    }
  }

  return (
    <Card
      style={[
        styles.card,
        itemClientId == props.client_id ? styles.selected : styles.unselected,
      ]}
    >
      

      <TouchableOpacity
        activeOpacity={0.5}
        onPress={itemCheckHandler}
      >
        <Card.Title
          color="red"
          title={title}
          id={props.client_id}
          subtitle={props.subtitle}
          left={props.leftIcon}
          right={(props) => (
            <View>
              <Checkbox
                status={itemClientId != false  ? 'checked' : 'unchecked'}
                color="red"
              />
            </View>
          )}
        />
      </TouchableOpacity>
    </Card>
  );
};

const styles = StyleSheet.create({
  checkbox:{
    color:"red"
  },
  card: {
    marginVertical: 5,
  },
  selected: {
    backgroundColor: "#ccc",
  },
  unselected: {
    backgroundColor: "white",
  },
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

export default ListItemClient;
