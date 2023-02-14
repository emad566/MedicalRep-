import * as React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import BackNav from '../../navigations/BackNav';
import {FlatList } from 'react-native';
import Notification from './components/Notification';
import { ScrollView } from 'react-native';
// import App from './hooks/useNotification';
import { useSelector, useDispatch } from 'react-redux';
import { index } from '../../store/actions/action';
import { context } from './../../context/AppContext';
import { useState } from 'react';
import { useContext } from 'react';
import { useEffect } from 'react';

function Notificationes(props) {
    const navigation = props.navigation
    
    const notification_data = useSelector(state => state.reducer.INDEX["notifs"])
    const [loading, setLoading] = useState(false)
    const myContext = useContext(context)
    const unRead_notif_num = myContext.contextState.unRead_notif_num
    const dispatch = useDispatch()
    
    //======================
    //get all Notification
    //======================
    const getNotification = async () => {
        setLoading(true)
        try {
            await dispatch(index("notifs", "notifs", myContext.userToken));
        } catch (error) {
            console.log(error)

        }
        setLoading(false)
    }

    useEffect(() => {
        getNotification()
    }, [unRead_notif_num])

    return (
        <BackNav navigation={navigation}>
            {/* <App/> */}
            <FlatList
                onRefresh={getNotification}
                refreshing={loading}
                data={notification_data?.notifs}
                keyExtractor={(item) => item.notif_id}
                renderItem={({ item, index }) => (<Notification item={item} navigation={navigation} /> )}
            />
        </BackNav>
    );
}

export default Notificationes;