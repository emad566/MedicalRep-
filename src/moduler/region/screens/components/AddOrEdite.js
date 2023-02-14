import * as React from 'react';

import { StyleSheet, View } from 'react-native';
import { Card, Caption, Subheading } from 'react-native-paper';
import Colors from '../../../../constants/Colors';
import { Button } from 'react-native-paper';
import CustomInput from './../../../../components/UI/CustomInput';
// import { FontAwesome5 } from '@expo/vector-icons';
import FontAwesome5  from 'react-native-vector-icons/FontAwesome5';
import DropDownList from './../../../../components/UI/DropDown';

function AddOrEdite({serverError , submitText  , onSubmit , errors ,control , resetValues , formatData}) {

    return (
        <Card style={{ marginBottom: 20 }}>
            <Card.Content>

                {serverError && <View style={{ ...styles.buttonGrop, backgroundColor: "#ff00004d", borderRadius: 5, marginBottom: 5 }}>
                    <Caption style={{ color: "red" }} >
                        {serverError}
                    </Caption>
                </View>}




                <View>
                    <Subheading style={{ color: submitText.submitText === "+ Save" ? Colors.primary : Colors.accent }} >
                        {submitText.title}
                    </Subheading>
                </View>
                <View>
                    <View>
                        <CustomInput
                            style={{ height: 100 }}
                            errors={errors.regionName}
                            label="State Name"
                            placeholder="Region Name"
                            name="regionName"
                            control={control}
                            maxLength={50}
                            icon={() => {
                                return (
                                    <FontAwesome5
                                        name="map-signs"
                                        size={20}
                                        color={Colors.scandry}
                                    />
                                );
                            }}
                        // serverErrors={serverErrors.specialistName}
                        />
                    </View>
                    <View>
                        <DropDownList
                            data={formatData("area_name", "areas", "Select an Area")}
                            control={control}
                            label="Select an area"
                            name="area"
                            error={errors.area}
                        />
                    </View>
                </View>
                <View style={{ flexDirection:'row', marginVertical:10 }}>
                    <Button style={{ flex:1, marginHorizontal:10 }} mode="outlined" color={Colors.primary} onPress={resetValues}>
                        Reset to add state
                    </Button>
                    <Button style={{ flex:1, marginHorizontal:10}} mode="contained" color={submitText.submitText === "+ Save" ? Colors.primary : Colors.accent} onPress={onSubmit}>
                        {submitText.submitText}
                    </Button>
                </View>
            </Card.Content>
        </Card>);
}

const styles = StyleSheet.create({
    dropDownList: {
        flexDirection: "column",
        justifyContent: "flex-start",
        backgroundColor: "white",
        height: 100,
        paddingBottom: 10,
    },
    buttonGrop: {
        flexDirection: "row",
        justifyContent: "space-around",
    }
});
export default AddOrEdite;