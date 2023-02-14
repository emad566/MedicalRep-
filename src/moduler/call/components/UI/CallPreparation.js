import MaterialIcons  from 'react-native-vector-icons/MaterialIcons';
import * as React from 'react';
import { StyleSheet, View, Text } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import Colors from "../../../../constants/Colors";
import CallPreparationItem from "../CallPreparationItem";

const CallPreparation = (props) => {

  return (
    <View style={styles.screen}>
      <View style={styles.addIconView}>
        <TouchableOpacity
          activeOpacity={0.5}
          onPress={() => {
            props.setVisible(true);
          }}
        >
          <MaterialIcons name="add-chart" size={40} color={Colors.primary} />
        {(props.visit_ph_servay_ids?.length < 1) && <Text style={{ color:'red' }}>Call Preparation is required *</Text>}
        </TouchableOpacity>
      </View>

      {props.visit_ph_servay_ids?.length > 0 && (
        <View style={styles.itemsContainer}>
          {props.visit_ph_servay_ids.map((ph_servay, index) => {
            return (
              <CallPreparationItem
                edit_id={props.edit_id}
                clienttype={props.clienttype}
                removeph_pro_handler={props.removeph_pro_handler}
                key={index}
                ph_servay={ph_servay}
                ph_servayHandler={props.ph_servayHandler}
                index={index}
                {...props}
                create_data = {props.create_data}
              />
            );
          })}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  // screen:{

  // },
  addIconView: {
    flexDirection: "row",
    flex: 1,
    justifyContent: "center",
    alignContent: "center",
  },
});

export default CallPreparation;
