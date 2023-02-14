import * as React from 'react';
import { useCallback } from "react";
import { Alert, Linking } from "react-native";
import { Button } from "react-native-paper";

const OpenURLButton = (props) => {
  const handlePress = useCallback(async () => {
    const supported = await Linking.canOpenURL(props.url);

    if (supported) {
      await Linking.openURL(props.url);
    } else {
      Alert.alert(`Don't know how to open this URL: ${props.url}`);
    }
  }, [props.url]);

  return (
    <Button title={props.children} onPress={handlePress}>
      {props.children}
    </Button>
  );
};

export default OpenURLButton;