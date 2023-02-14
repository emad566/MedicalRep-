import * as React from 'react';
import { ImageBackground, StyleSheet, View } from "react-native";
import { Text } from "react-native-paper";

// const imagebg = require("../../assets/noInternet.png");

function NoInternet() {
    return ( 
        <View style={styles.container} >
            <Text>no internet</Text>
            {/* <ImageBackground
          source={imagebg}
          resizeMode="contain"
          style={styles.image}
        > */}
        {/* <Text>no internet</Text> */}
        {/* </ImageBackground> */}
        </View>
     );
}
const styles = StyleSheet.create({
    image: {
        flex: 1,
        justifyContent: "center",
        opacity: 0.8,
      },
      container: {
        flex: 1,
        backgroundColor:"#fff"
      },
})


export default NoInternet;
