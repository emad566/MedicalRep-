import * as React from 'react';
import { StyleSheet, View, Text } from "react-native";
import { Appbar, Button, Modal, Portal, Provider } from "react-native-paper";
import { Dropdown, MultiselectDropdown } from "sharingan-rn-modal-dropdown";
import Colors from "../../../../constants/Colors";
// import { MaterialIcons } from "@expo/vector-icons";
import MaterialIcons  from 'react-native-vector-icons/MaterialIcons';
import SectionedMultiSelect from "react-native-sectioned-multi-select";
import Icon from "react-native-vector-icons/MaterialIcons"

const CorporationPortal = (props) => {
  const client_id_arr = (props.client_id) ? [props.client_id] : [];
  if(props.clienttype == "PM"){
    props.setSelectedClient_idHandler(props.client_id)
  }

  let items = props.formatData("client_name", "clients", "Select Client ...");
  let cid = props.clienttype != "PM"
            ? 
            (props.selectedClient_id < 1)? [0] : props.selectedClient_id
            : props.client_id;

  let item = items.filter((c) => c["id"] == cid);
  item = item[0]?.name

  

  return (
    // <Provider>
    <Portal>
      <Modal
        visible={props.visible}
        onDismiss={props.hideModal}
        contentContainerStyle={{
          borderRadius: 10,
          margin: 10,
          backgroundColor: "white",
          padding: 10,
        }}
      >
        <View
          style={{
            justifyContent: "flex-start",
            backgroundColor: "white",
            height: 80,
            borderWidth:1,
            borderRadius:10,
            padding:5,
            marginBottom:20,
            backgroundColor:(props.clienttype == "PM") ? "#ccc" : "white"
          }}
        >
          <Text style={{ marginBottom:-15, fontSize:16, fontWeight:'bold' }}>Client:</Text>
          <SectionedMultiSelect
            items={items}
            renderSelectText={()=>{
              return (<Text style={{ width:"90%", fontSize:18 }}>{item}</Text>)
            }}
            IconRenderer={Icon}
            uniqueKey="id"
            single={true}
            selectText="Choose a Client..."
            onSelectedItemsChange={props.setSelectedClient_idHandler}
            selectedItems={cid}

            disabled={props.clienttype != "PM"
            ? false
            : true}
          />

        </View>
        
        <View
          style={{
            justifyContent: "flex-start",
            backgroundColor: "white",
            height: 80,
            borderWidth:1,
            borderRadius:10,
            padding:5,
            marginBottom:60,
          }}
        >
          <Text style={{ marginBottom:-15, fontSize:16, fontWeight:'bold' }}>Products:</Text>
          <SectionedMultiSelect
            items={props.formatData("Product_Name", "products")}
            IconRenderer={Icon}
            uniqueKey="id"
            single={false}
            selectText="Choose a product..."
            onSelectedItemsChange={props.multiSelectChangeHandler}
            selectedItems={props.selectedProducts}

            error={props.selectedProducts.length < 1 ? true : false}
            required
          />

        </View>
        <View
          style={{
            flexDirection: "column",
            justifyContent: "flex-start",
            backgroundColor: "white",
            height: 80,
            paddingBottom: 10,
          }}
        >
          

          {!props.isValidVistPros && (
            <View
              style={{
                flex: 1,
                maxHeight: 40,
                flexDirection: "row",
                justifyContent: "space-around",
              }}
            >
              <Text>Pls, Select valid data</Text>
            </View>
          )}

          <View
            style={{
              flex: 1,
              maxHeight: 40,
              flexDirection: "row",
              justifyContent: "space-around",
            }}
          >
            <Button
              loading={false}
              color={Colors.accent}
              icon={() => {
                return <MaterialIcons name="cancel" size={24} color="white" />;
              }}
              mode="contained"
              onPress={props.hideModal}
            >
              Cacel
            </Button>

            <Button
              loading={false}
              color={Colors.primary}
              icon={() => {
                return <MaterialIcons name="save" size={24} color="white" />;
              }}
              mode="contained"
              onPress={props.setVisit_ph_servay_ids_handler}
            >
              Add
            </Button>
          </View>
        </View>
      </Modal>
    </Portal>
    // </Provider>
  );
};

const styles = StyleSheet.create({});

export default CorporationPortal;
