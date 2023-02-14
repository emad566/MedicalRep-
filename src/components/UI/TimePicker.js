import * as React from 'react';
import  { useState } from 'react';
import { View,  Platform } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Button } from 'react-native-paper';

function TimePicker({ mode , birthDay , setBirthDay}) {
    const [date, setDate] = useState(new Date(648505060000));
    const [show, setShow] = useState(false);

    const onChange = (event, selectedDate) => {
        const currentDate = selectedDate || date;
        setShow(Platform.OS === 'ios');
        setBirthDay(`${currentDate.getFullYear()} - ${+currentDate.getMonth()+1}-${currentDate.getUTCDate()}`)
        setDate(currentDate);
    };

    const showMode = () => {
        setShow(true);
    };

    return (
        <View>
            <View>
                <Button onPress={showMode} color="#000" mode="outlined">
                    {birthDay}
                </Button>
            </View>
                {show && (
                    <DateTimePicker
                        testID="dateTimePicker"
                        value={date}
                        mode={mode}
                        is24Hour={true}
                        display="default"
                        onChange={onChange}
                    />
                )}
        </View>
    );
}

export default TimePicker;