import * as React from 'react';
import { FlatList, Text, TouchableOpacity, View } from "react-native";
import { Card, Avatar } from "react-native-paper";
import Colors from "../../constants/Colors";

function ListNavItems(props) {

  return (
    <View>
      <FlatList
        keyExtractor={(item) => item.title}
        data={props.screenData}
        renderItem={({ item }) =>{
          if(!item.show) return;
          
          return  (
            <TouchableOpacity onPress={item.onPress} style={{ padding: 10 }}>
              <Card>
                <Card.Title
                  title={item.title}
                  left={(props) => (
                    <Avatar.Icon
                      color={Colors.primary}
                      {...props}
                      style={{ backgroundColor: "#fff" }}
                      icon={item.icon}
                    />
                  )}
                />
              </Card>
            </TouchableOpacity>
          )
        }}
      />
    </View>
  );
}

export default ListNavItems;
