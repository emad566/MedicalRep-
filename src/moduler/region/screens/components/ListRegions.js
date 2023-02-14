import * as React from 'react';
import { StyleSheet, View } from "react-native";
import { Card, Headline } from 'react-native-paper';
import Colors from "../../../../constants/Colors";
import { Dropdown } from 'sharingan-rn-modal-dropdown';
import { Divider } from 'react-native-paper';
import { Snackbar } from 'react-native-paper';
import {  SERVER_ERROR, EDITE_MODE , SCREEN_LOADING, CITY_DATA, REGION_DATA, SET_REGION_VALUE, SElECTED_VALUE_ERROR, RESET} from '../../RegionStateReducer';
import { _delete } from "../../../../store/actions/action";
import { useDispatch } from 'react-redux';
import { ScrollView } from 'react-native-gesture-handler';
import EditeButtomBar from './EditeButtomBar';
import RoutToLogin from "../../../../components/UI/RoutToLogin";

function ListRegions({formatData , dispatchFormState ,formState ,errors , reset , myContext, resetValues}) {
    const dispatch = useDispatch()
//===============================
    //Handel change  State  
    //===============================
    const OnAddRegion = () => {
        const region = formState.selectedVlaue.value
        if (region) {
            const regionName = region.state_name ? region.state_name : region.city_name ? region.city_name : region.r_name
            const regionLable = region.state_name ? "City" : region.city_name ? "Region" : ""

            dispatchFormState({
                type: EDITE_MODE,
                submitText: "+ Save",
                title: `Add New ${regionLable} in  ${regionName}`
            })
            reset({
                regionName: '',
                area: 0,
            })
        } else {
            dispatchFormState({
                type: SElECTED_VALUE_ERROR,
                error: true
            })
        }
    }




    const OnEditeRegion = () => {
        const region = formState.selectedVlaue.value
        if (region) {
            dispatchFormState({
                type: EDITE_MODE,
                submitText: "Edite ",
                title: `Edite this ${formState.selectedVlaue.type === "city" ? "State" : "Region"}`
            })
            reset({
                regionName: region.state_name ? region.state_name : region.city_name ? region.city_name : region.r_name,
                area: region.area_id ? region.area_id : 0,
            })
        } else {
            dispatchFormState({
                type: SElECTED_VALUE_ERROR,
                error: true
            })
        }

    }
    const OnDeleteRegion = async () => {
        const region = formState.selectedVlaue.value
        if (region){
            const id = formState.selectedVlaue.value.id
        try {
            dispatchFormState({ type: SCREEN_LOADING, screenLoading: true })
            await dispatch(_delete(id, 'regions/' + id, 'regions', myContext.userToken));

            dispatchFormState({ type: SCREEN_LOADING, screenLoading: false, serverErrors: null, sucsees: "Deleted Sucseesfuly " })
            dispatchFormState({ type: RESET, screenLoading: false, serverErrors: null, sucsees: "Deleted Sucseesfuly " })

        } catch (e) {
            RoutToLogin(e, props);
            if (e.type == "server") {
                dispatchFormState({
                    type: SCREEN_LOADING,
                    screenLoading: false,
                    serverErrors: "! Server Error"
                })
                if (e.error.msg) {
                    dispatchFormState({
                        type: SERVER_ERROR,
                        error: e.error.msg
                    })
                }
                if (e.error.errors) {
                    dispatchFormState({
                        type: SERVER_ERROR,
                        error: e.error.msg
                    })
                }
            }
            resetValues()
        }
        }else{
            dispatchFormState({
                type: SElECTED_VALUE_ERROR,
                error: true,
                
            })
        }
        
    }




    return ( 
        <View>
             <Card>
                            <ScrollView>
                                <Card.Content style={{ flex: 1 }}>
                                    <Headline style={{ color: Colors.primary }}> Regions</Headline>

                                    <View style={styles.dropDownList} >

                                        <Dropdown
                                            label=" State "
                                            data={formatData("state_name", "regions", "Select State")}
                                            mode="outlined"
                                            rippleColor={Colors.primary}
                                            showLoader={false}
                                            onChange={async (value) => {
                                                const cities = value.cities.map(type => { return { value: type, label: type.city_name, ...type } })
                                                await dispatchFormState({
                                                    type: CITY_DATA,
                                                    data: [],
                                                })
                                                dispatchFormState({
                                                    type: CITY_DATA,
                                                    data: cities,
                                                    value: value,
                                                    valueType: "city"
                                                })
                                            }}
                                            value={(!formState.selectedVlaue.value || formState.selectedVlaue.value == undefined)? "0" : formState.selectedVlaue.value }
                                            error={formState.selectedVlaue.error}
                                            required
                                            helperText={errors.region ? errors.region.message : ""}

                                        />
                                        {/* <Text style={{color:"red"}}>Please Select State</Text> */}

                                    </View>
                                    {formState.city.data.length !== 0 && <View style={styles.dropDownList} >
                                        <Dropdown
                                            label=" City "
                                            data={formState.city.data}
                                            mode="outlined"
                                            rippleColor={Colors.primary}
                                            showLoader={false}
                                            onChange={async (value) => {
                                                const region = Array.isArray(value.regions) ? value.regions.map(type => { return { value: type, label: type.r_name, ...type } }) : []
                                                // await dispatchFormState({
                                                //     type: REGION_DATA,
                                                //     data: [],
                                                // })
                                                dispatchFormState({
                                                    type: REGION_DATA,
                                                    data: region,
                                                    value: value,
                                                    valueType: "region"
                                                })
                                            }}
                                            value={formState.selectedVlaue.value}
                                            error={errors.region ? true : false}
                                            required
                                            helperText={errors.region ? errors.region.message : ""}

                                        />
                                    </View>}


                                    {formState.region.data.length !== 0 && <View style={styles.dropDownList} >
                                        <Dropdown
                                            label="Brick "
                                            data={formState.region.data}
                                            mode="outlined"
                                            rippleColor={Colors.primary}
                                            showLoader={false}
                                            onChange={(value) => {
                                                dispatchFormState({
                                                    type: SET_REGION_VALUE,
                                                    value: value,
                                                    valueType: "canNotAddInRegion"
                                                })
                                            }}
                                            value={formState.selectedVlaue.value}
                                            error={errors.region ? true : false}
                                            required
                                            helperText={errors.region ? errors.region.message : ""}

                                        />
                                    </View>}
                                    <Divider />
                                    <EditeButtomBar formState={formState} OnAddRegion={OnAddRegion} OnEditeRegion={OnEditeRegion} OnDeleteRegion={OnDeleteRegion}/>
                                </Card.Content>
                            </ScrollView>
                        </Card>
                        <Snackbar
                            visible={formState.sucsees}
                            duration={500}
                            style={{
                                backgroundColor: "#4BB543",
                                justifyContent: "center",
                                color: "green"
                            }}
                            onDismiss={() => {
                                dispatchFormState({
                                    type: SCREEN_LOADING,
                                    screenLoading: false,
                                    serverErrors: null,
                                    sucsees: null
                                })
                            }}
                        >
                            {formState.sucsees}
                        </Snackbar>
        </View>
     );
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
    },
});
export default ListRegions;