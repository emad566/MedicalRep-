import * as React from 'react';
import { View, StyleSheet } from "react-native";
import Colors from "../../../../constants/Colors";
// import { Entypo } from "@expo/vector-icons";
import Entypo  from 'react-native-vector-icons/Entypo';
import PrintValue from "../../../../components/PrintValue";
import SectionSelect from "../../../../components/UI/SectionSelect";

// function AccountInfo({control, errors, defaultValue}) {
function AccountInfo(props) {
  // const cid = +props.client_id !=0? [+props.client_id] : [];
  let cid = props.client_id
  let items = props.formatData("client_name", "clients", "Client ...")
  if(cid[0] == 0 && props.plan_client_id !== undefined){
    let isFound = items.filter( (i) => i.id == props.plan_client_id )
    if(isFound.length>0){
      cid = [props.plan_client_id];
    }else{
      cid = [0]
    }
  }

  
  return (
    <View>
      <SectionSelect
        label="Client"
        items={items}
        single={true}
        selectText="Select a client ..."
        onSelectedItemsChange={props?.handelClient_idChange}
        selectedItems={cid}
        disabled={false}
        required={true}
        backgroundColor="#F2F2F2"
      />

      {props?.address && (
        <PrintValue
          style={{ backgroundColor: "rgba(255,255,255, 0.3)", marginBottom:10 }}
          icon={<Entypo name="address" size={24} color={Colors.primary} />}
          printKeyVal="Adress "
          value={props.address}
        ></PrintValue>
      )}
    </View>
  );
}

const styles = StyleSheet.create({});
export default AccountInfo;
