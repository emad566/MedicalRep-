import * as React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text , Card ,  Checkbox} from 'react-native-paper';
import { useSelector } from 'react-redux';
import Colors from '../../constants/Colors';

function CheckBoxList(props) {

    return (
        props.renderData.map(item => {
            return (
                <Card key={item.id} style={{ margin: 5, maxWidth: "50%" }}>
                    <View >
                        <View
    
                            style={{
                                flexDirection: 'row',
                            }}>
                            <Checkbox
                                color={Colors.primary}
    
                                status={item.isChecked ? "checked" : "unChecked"}
                                onPress={() => {
                                    props.handleChange(item.id);
                                }}
                            />
                            <Text style={{ paddingTop: 5 }}>{item.specialist_name}</Text>
                        </View>
                    </View>
                </Card>
            );
        })
    );
}

export default CheckBoxList;