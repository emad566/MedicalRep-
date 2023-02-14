
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ViewCallScreen from '../../call/screens/ViewCallScreen';
import Notification from '../components/Notification';

const Stack = createNativeStackNavigator();

export const NotificationNav = (props) => {
    return (
        <Stack.Navigator initialRouteName="notification">
          <Stack.Screen name='notifications' component={Notification} options={{ title:'Notifications' }}/>
          <Stack.Screen name='ViewCallScreen' component={ViewCallScreen} options={{ title:'Call View ' }}/>
        </Stack.Navigator>
    );
}

export default NotificationNav;