// import { AntDesign } from "@expo/vector-icons";
import * as React from 'react';
import AntDesign  from 'react-native-vector-icons/AntDesign';
import { useSelector } from "react-redux";
import  { useState } from "react";
import { StyleSheet, View, Text } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { TextInput } from "react-native-paper";
import Colors from "../../../constants/Colors";
import { onChange } from "react-native-reanimated";

const CallPreparationItem = (props) => {
  const [consumption, setConsumption] = useState();
  const [stock, setStock] = useState();
  const [comment, setComment] = useState();

  let edit_date = useSelector((state) => state.reducer.EDIT);
  // let create_data = useSelector((state) => state.reducer.CREATE['visits']);
  let create_data = props.create_data

  if (props.edit_id) {
    create_data = edit_date['visits']
  }
  

  const clients = create_data.clients;
  let client = clients.filter((c) => c.id == props.ph_servay.client_id)[0];
 
  const products = create_data.products;
  const product = products.filter((p) => p.id == props.ph_servay.product_id)[0];

  const onChangeHandler = (label, value) => {
    switch (label) {
      case "consumption":
        setConsumption(value);
        break;
      case "stock":
        setStock(value);
        break;
      case "comment":
        setComment(value);
        break;
    }
    props.ph_servayHandler(props.index, label, value);
  };

  return (
    <View style={styles.itemContainer}>
      <View style={styles.deleteIcon}>
        <TouchableOpacity
          activeOpacity={0.5}
          onPress={(index) => {
            props.removeph_pro_handler(props.index);
          }}
        >
          <AntDesign
            style={{ padding: 5 }}
            name="delete"
            size={28}
            color={Colors.primary}
          />
        </TouchableOpacity>
      </View>

      <View style={styles.labels}>
        <Text style={styles.phy}>{client.client_name}</Text>
        <Text style={styles.pro}>{product.Product_Name}</Text>
      </View>
      {props.clienttype == "PH" && <View style={{ flex: 1, flexDirection: "row" }}>
        <View style={{ flex: 1 }}>
          <TextInput
            mode="outlined"
            label="Consumption"
            placeholder="Consumption"
            right={
              <TextInput.Icon color={props.errors && "red"} name={props.icon} />
            }
            value={props.ph_servay.consumption}
            defaultValue={props.ph_servay.consumption}
            onChangeText={(value) => {
              onChangeHandler("consumption", value);
            }}
            keyboardType="numeric"
            style={styles.input}
            theme={props.errors && { colors: { placeholder: "red" } }}
          />
        </View>
        <View style={{ flex: 1 }}>
          <TextInput
            mode="outlined"
            label="Stock"
            placeholder="Stock"
            right={
              <TextInput.Icon color={props.errors && "red"} name={props.icon} />
            }
            style={styles.input}
            value={props.ph_servay.stock}
            defaultValue={props.ph_servay.stock}
            onChangeText={(value) => {
              onChangeHandler("stock", value);
            }}
            keyboardType="numeric"
            theme={props.errors && { colors: { placeholder: "red" } }}
          />
        </View>
      </View>}

      <View>
        <TextInput
          mode="outlined"
          label="Comment"
          placeholder="Comment"
          right={
            <TextInput.Icon color={props.errors && "red"} name={props.icon} />
          }
          style={styles.input}
          value={props.ph_servay.comment}
          defaultValue={props.ph_servay.comment}
          onChangeText={(value) => {
            onChangeHandler("comment", value);
          }}
          keyboardType="default"
          theme={props.errors && { colors: { placeholder: "red" } }}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  deleteIcon: {
    flexDirection: "row",
    flex: 1,
    justifyContent: "center",
    alignContent: "center",
  },
  itemContainer: {
    padding: 5,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: Colors.borderTopColor,
    marginVertical: 5,
  },
  labels: {
    flexDirection: "row",
    flex: 1,
  },
  phy: {
    width: "50%",
    borderRightWidth: 1,
    borderRightColor: Colors.borderRightColor,
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 18,
    color: Colors.primary,
  },
  pro: {
    width: "50%",
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 18,
    color: Colors.primary,
  },
});

export default CallPreparationItem;
