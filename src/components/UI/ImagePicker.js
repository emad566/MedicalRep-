import * as React from 'react';
// import * as ImagePicker from "expo-image-picker";
import { StyleSheet, View, Text } from "react-native";
// import { launchCameraAsync , useCameraPermissions , PermissionStatus , launchImageLibraryAsync} from "expo-image-picker";
import { useState } from "react";
import { Provider, Modal } from "react-native-paper";
import { IconButton } from "react-native-paper";

import SimpleLineIcons  from 'react-native-vector-icons/SimpleLineIcons';
import FontAwesome  from 'react-native-vector-icons/FontAwesome';
import Colors from "../../constants/Colors";
import { Portal } from "react-native-paper";
import ImagePicker from 'react-native-image-crop-picker';

const TakeImagePicker = ({ modalVisible, handelModelVisable , setImage}) => {
    // const [permissionStatus, requestPermission] = useCameraPermissions();
    
    const verifyPermision =async ()=>{
        // if(permissionStatus.status === PermissionStatus.UNDETERMINED){
        //     const permisionRes =  await requestPermission()
        //     return permisionRes.granted
        // }

        // if(permissionStatus.status === PermissionStatus.DENIED){
        //     return false
        // }

        // return true
    }

    const takeGalaryImageHandler = async () => {
      try {
        ImagePicker.openPicker({
          width: 400,
          height: 400,
          cropping: true
        }).then(image => {
          handelModelVisable()
          setImage(image)
        });
      } catch (error) {
        console.log(error)
      }
      
      //   const hasPermision = await verifyPermision()
      //   if(!hasPermision){return }
      // let result = await launchImageLibraryAsync({
      //   allowsEditing: true,
      //   aspect: [10, 10],
      //   quality: 0.5,
      // });
      // setImage(result)
      // handelModelVisable()
    };

  const takeCameraImageHandler = async () => {
    //   const hasPermision = await verifyPermision()
    //   if(!hasPermision){return }
    // let result = await launchCameraAsync({
    //   allowsEditing: true,
    //   aspect: [10, 10],
    //   quality: 0.5,
    // });
    // setImage(result)
    // handelModelVisable()
  };
  return (
    <Provider>
      <Portal>
        <Modal
          animationType="fade"
          dismissable={true}
          style={styles.modal}
          visible={modalVisible}
          onDismiss={() => handelModelVisable()}
          contentContainerStyle={styles.contentContainerStyle}
        >
          <View
            style={{
              ...styles.modalContainer,
              justifyContent: "space-around",
              flexDirection: "row",
            }}
          >
            {/* <IconButton
              icon={() => (
                <SimpleLineIcons name="camera" size={30} color="#ccc" />
              )}
              style={{ paddingVertical: 2, paddingHorizontal: 1 }}
              mode="text"
              onPress={takeCameraImageHandler}
            >
              Camera
            </IconButton> */}
            <IconButton
              icon={() => <FontAwesome name="photo" size={30} color="#ccc" />}
              style={{ paddingVertical: 2, paddingHorizontal: 1 }}
              mode="text"
              onPress={takeGalaryImageHandler}
            >
              Photo
            </IconButton>
          </View>
        </Modal>
      </Portal>
    </Provider>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    backgroundColor: "#7B2930",
  },
  contentContainerStyle: {
    opacity: 1,
    backgroundColor: "#7B2930",
    margin: "10%",
    padding: 10,
    borderRadius: 14,
    justifyContent: "center",
  },
});

export default TakeImagePicker;
