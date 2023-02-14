import FontAwesome5  from 'react-native-vector-icons/FontAwesome5';
import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import Colors from '../../constants/Colors';

const MenuItems = (props) => {
    const menueParent = props.menueParent;

    const menueParentHandler = () => {
      props.name == menueParent
        ? props.setMenueParent("")
        : props.setMenueParent(props.name);
    };
    const fontColor = (menueParent == props.name) ? "white" : "black";
    const iconColor = (menueParent == props.name) ? "white" : Colors.primary;

    return (
      <View style={{ ...styles.menuItemsContainer }}>
        <TouchableOpacity activeOpacity={0.5} onPress={menueParentHandler}>
          <View  style={{ 
            ...styles.menuParent,
            backgroundColor: menueParent == props.name ? Colors.primary : "white", 
          }}>
            <View style={styles.menuParentHeader}>
              <FontAwesome5 style={{ paddingTop:5 }} name={props.icon} size={22} color={iconColor} />
              <Text style={{ ...styles.menuTitle, color:fontColor}}>{props.title}</Text>
            </View>
            <View>
              <FontAwesome5
                name={props.name == menueParent ? "angle-up" : "angle-down"}
                size={23}
                color={fontColor}
              />
            </View>
          </View>
        </TouchableOpacity>
        {menueParent == props.name && (
          <View style={styles.menuChildsContainer}>{props.children}</View>
        )}
      </View>
    );
}

const styles = StyleSheet.create({
  menuItemsContainer:{
    borderBottomWidth:2,
    borderColor:"#ddd",
  },  
      menuParent: {
        backgroundColor: "#fff",
        flexDirection: "row",
        justifyContent: "space-between",
        width: "100%",
        flex: 1,
        padding:8,
      },
      menuParentHeader: {
        flexDirection: "row",
        justifyContent: "flex-start",
      },
      menuTitle: {
        fontWeight: "bold",
        fontSize: 18,
        padding: 5,

      },
      menuChildsContainer:{
          paddingLeft:20,
      }
  });

export default MenuItems;