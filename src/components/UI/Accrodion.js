import * as React from 'react';
import FontAwesome5  from 'react-native-vector-icons/FontAwesome5';
import { useState } from "react";
import { StyleSheet, View, Text } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import Colors from "../../constants/Colors";

const Accrodion = (props) => {
  const [expand, setExpand] = useState(props.defaultExpand);
  return (
    <View style={styles.compoWraper} {...props}>
      <TouchableOpacity
        activeOpacity={0.5}
        onPress={() => {setExpand(!expand);}}
      >
        <View style={styles.head}>
          <View style={styles.headher}>
            <View style={styles.iconView}>{props.icon}</View>
            <Text style={styles.text}>{props.title}</Text>
          </View>
          <View style={styles.colIconView}>
            <FontAwesome5
              name={expand ? "angle-up" : "angle-down"}
              size={24}
              color={Colors.primary}
            />
            
          </View>
        </View>
      </TouchableOpacity>

      {expand && <View style={styles.body}>{props.children}</View>}
    </View>
  );
};

const styles = StyleSheet.create({
  compoWraper: {
    marginTop: 10,
    flex: 1,
    borderTopWidth: 2,
    borderTopColor: Colors.borderTopColor,
  },
  head: {
    padding: 10,
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: Colors.backColor,
  },
  headher: {
    flexDirection: "row",
    justifyContent: "flex-start",
  },
  iconView: {},
  text: {
    fontSize: 18,
    fontWeight:'bold',
    marginLeft: 20,
  },
  colIconView: {},
  body: {
      padding:5,
  },
});

export default Accrodion;
