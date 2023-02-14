import * as React from 'react';
import { View } from 'react-native';
import { Button, Text } from 'react-native-paper';
import SimpleLineIcons  from 'react-native-vector-icons/SimpleLineIcons';
import Colors from '../../../../constants/Colors';


function SubmitButton(props) {
    return ( 
        <View
        style={{
          flexDirection: "row",
          justifyContent: "flex-end",
          marginVertical: 10,
          
        }}
      >
        {(props.serverErrorMsg) && <Text style={{ flex:1, color:'red', fontSize:18, textAlign:'center' }}>{props.serverErrorMsg}</Text>}
        <Button
          loading={props.screenLoading}
          color={props.color ? props.color : Colors.primary}
          icon={() => {
            return (
              <SimpleLineIcons name="cursor" size={24} color="white" />
            );
          }}
          mode="contained"
          onPress={props.onPress}
        >
          {props.text ? props.text : "send"}
        </Button>
      </View>
     );
}

export default SubmitButton;