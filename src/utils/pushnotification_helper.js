import messaging from '@react-native-firebase/messaging';
import AsyncStorage from '@react-native-async-storage/async-storage';
import notifee, { EventType } from '@notifee/react-native';
import { useNavigation } from "@react-navigation/native";


export async function requestUserPermission() {
  const authStatus = await messaging().requestPermission();
  const enabled =
    authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
    authStatus === messaging.AuthorizationStatus.PROVISIONAL;

  if (enabled) {
    GetFCMToken()
  }else{
  }
}

async function GetFCMToken() {
  let fcmtoken = await AsyncStorage.getItem('fcmtoken');
  if (fcmtoken == null) {
    try {
      const fcmtoken_c = await messaging().getToken();
      if (fcmtoken_c) {
        AsyncStorage.setItem('fcmtoken', fcmtoken_c);
      } else {
        
        
      }
    } catch (error) {
      console.log("GetFCMToken: error");
      console.log(error);
    }
  }
}

export const NotificationListner = (props) => {
  // Assume a message-notification contains a "type" property in the data payload of the screen to open
  messaging().onNotificationOpenedApp(remoteMessage => {
    const data = remoteMessage.data
    if(data.is_route == 1){
      props.navigation.navigate('CallNavScreen', {
        screen: data.screen,
        params: {
          id: data.notifiable_id,
          reload: data.notifiable_id,
        }
      });
    }
});

// Check whether an initial notification is available
messaging()
  .getInitialNotification()
  .then(remoteMessage => {
    if (remoteMessage) {
      console.log( 'Notification caused app to open from quit state:', );
    }
});

messaging().onMessage(async remoteMessage => {
  console.log("remoteMessage: Notification in forground state");
});

messaging().setBackgroundMessageHandler(async remoteMessage => {
  const data = remoteMessage.data;

  /*====================================
  || Send Local Notification via Notifee
  ======================================*/
  // Request permissions (required for iOS)
  // await notifee.requestPermission()

  // Create a channel (required for Android)
  // const channelId = await notifee.createChannel({
  //   id: 'default',
  //   name: 'Default Channel',
  // });

  // Display a notification
  // await notifee.displayNotification({
  //   title: data.title,
  //   body: data.body,
  //   android: {
  //     channelId,
  //     smallIcon: 'ic_stat_icon_marvel', // optional, defaults to 'ic_launcher'.
  //     // pressAction is needed if you want the notification to open the app when pressed
  //     pressAction: {
  //       id: 'com.reactfire1',
  //     },
  //   },
  // });

});

}