import * as React from 'react';
import { useState } from 'react';
import { View, Platform } from "react-native";
import { Avatar, Button, Card, Divider, Title } from "react-native-paper";
import { useSelector } from "react-redux";
import { Dropdown } from 'sharingan-rn-modal-dropdown'
import DateTimePicker from '@react-native-community/datetimepicker';
// import { FontAwesome5, SimpleLineIcons } from "@expo/vector-icons";
import SimpleLineIcons  from 'react-native-vector-icons/SimpleLineIcons';
import FontAwesome5  from 'react-native-vector-icons/FontAwesome5';
import Colors from '../../../constants/Colors';





function WorkHour({ edit_id, workDays, setWorkDate }) {
    let edit_date = useSelector((state) => state.reducer.EDIT["clients"]);
    let create_data = useSelector((state) => state.reducer.CREATE["clients"]);

    if (edit_id) {
        create_data = edit_date;
    }

    if (create_data == undefined || !create_data) {
        create_data = false;
    }
    const days = create_data ? create_data["wdays"] : false;

    const [date, setDate] = useState(new Date());
    const [show, setShow] = useState(false);
    const [editHour, setEditHour] = useState({ time: "2:00", index: 0, label: "" })

    const onChange = (event, selectedDate) => {
        if (selectedDate) {
            const wday = [...workDays]
            wday[editHour.index][editHour.label] = `${selectedDate.getHours()}:${selectedDate.getMinutes()}`
            setShow(false)
            setWorkDate(wday)
        }
        setShow(Platform.OS === 'ios');
    };

    const showMode = (index, day) => {
        setShow(true);
    };

    let formatDays
    if (days) {
        formatDays = days.map(day => { return { value: day.id, label: day.wday_name } })
    }

    const handelAddDay = () => {
        const wDay = [...workDays]
        wDay.unshift({ "wday_id": "1", "hour_from": "00:00", "hour_to": "00:00" })
        setWorkDate(wDay)
    }

    const deleteWorkDay = (index)=>{
        const wDays = [...workDays]
        wDays.splice(index, 1)
        setWorkDate(wDays)
    }



    return (
        <View>
            {show && (
                <DateTimePicker
                    testID="dateTimePicker"
                    value={new Date(`3 march 2020  ${editHour.time}`)}
                    mode={"time"}
                    is24Hour={false}
                    display="default"
                    onChange={onChange}
                />
            )}

            <Button icon={() => { 
                return (<SimpleLineIcons name="plus" size={24} color="black" />) 
                }} mode="outline" onPress={handelAddDay}>
                Work Day
            </Button>

            {(formatDays && workDays) && workDays.map((day, index) => (
                <View key={Math.random().toString()} style={{ padding: 5 }}>
                    <Card>
                        <Card.Content>
                            {/* <Card.Title  right={RightContent} /> */}
                            <View style={{flexDirection:"row" , justifyContent:"flex-end" , paddingLeft:5}}>

                                <FontAwesome5
                                    name="window-close"
                                    size={20}
                                    color={Colors.primary}
                                    onPress = {deleteWorkDay.bind(this, index)}
                                />
                            </View>
                            <Dropdown
                                label="day"
                                data={formatDays}
                                // enableSearch
                                value={+day.wday_id}
                                onChange={(day) => {
                                    const wdays = [...workDays]
                                    wdays[index].wday_id = day
                                    setWorkDate(wdays)
                                }}
                                mode="outlined"
                                rippleColor="blue"
                                required
                                textInputStyle={{ fontSize: 15 }}
                                enableSearch={false}
                            />
                            <View style={{ flexDirection: "row", flex: 1, margin: 10, justifyContent: "space-between" }}>
                                <Button mode="outlined" onPress={() => {
                                    setEditHour({ time: day.hour_from, index: index, label: "hour_from" })
                                    showMode(index, day)
                                }}>
                                    {day.hour_from}
                                </Button>
                                <Title>to</Title>
                                <Button mode="outlined" onPress={() => {
                                    setEditHour({ time: day.hour_to, index: index, label: "hour_to" })
                                    showMode(index, day)
                                }}>
                                    {day.hour_to}
                                </Button>
                            </View>
                        </Card.Content>
                        <Divider />
                    </Card>
                </View>

            ))}
        </View>
    );
}


export default WorkHour;