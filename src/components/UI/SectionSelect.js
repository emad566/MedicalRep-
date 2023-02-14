import * as React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import SectionedMultiSelect from 'react-native-sectioned-multi-select';
import Icon from "react-native-vector-icons/MaterialIcons"

const SectionSelect = (props) => {
    let items = props.items;
    let item = items?.filter((c) => c["id"] == props.selectedItems);
    item = item[0]?.name

    return (
        <View
          style={{...{
            justifyContent: "flex-start",
            backgroundColor:(props.disabled) ? "#ccc" : "white",
            backgroundColor: props.backgroundColor ? props.backgroundColor : "white",
            height:75,
            borderWidth:1,
            borderRadius:10,
            padding:5,
            paddingBottom:0,
            marginBottom:(props.required && props.selectedItems < 1)? 20 : 10,
            
          }, ...props.style}}
        >
          <Text style={{ marginBottom:-15, fontSize:16, fontWeight:'bold' }}>{props.label}:</Text>
          <SectionedMultiSelect
            items={items}
            renderSelectText={()=>{
              return (<Text style={{ width:"90%", fontSize:18 }}>{item}</Text>)
            }}
            IconRenderer={Icon}
            uniqueKey="id"
            single={props.single? props.single : false}
            selectText={props.selectText}
            onSelectedItemsChange={props.onSelectedItemsChange}
            selectedItems={props.selectedItems}
            disabled={props.disabled}
            style
          />
        {(props.required && props.selectedItems < 1) && <Text style={{ color:'red' }}>{props.label} is required</Text>}
        </View>
    );
}

const styles = StyleSheet.create({
    
});

export default SectionSelect;