import * as React from 'react';
import { Button, Caption, Card, Text } from "react-native-paper";
import AntDesign  from 'react-native-vector-icons/AntDesign';
import { ScrollView, StyleSheet, View } from "react-native";
import Colors from "../../../constants/Colors";
import { useState } from 'react'
import { Dropdown, GroupDropdown, MultiselectDropdown, } from 'sharingan-rn-modal-dropdown';
import DropdownFilter from "./DropDown";
import { useForm } from 'react-hook-form';
import Input from "./Input";


const formatDropdownData = (data, item) => {
  const formatedData = data.map(ele => {
    return { ...ele, label: ele[item], value: ele[item] }
  })
  return formatedData
}
//////////////////////////////////////////////////////

function Filter({ data, filter, setSearchResult }) {
  const filterParam = data?.filter
  const { control, handleSubmit } = useForm()
  const [ show, setShow ] = useState(false)

  const handle_Filter_button = ()=>{ 
    setShow(!show)
  }

  const [result , setResult ] = useState( data?.clients)

  const onSearch = (filterData) => {
    // const filterData = {
    //   "class":  [], 
    //   "clienttype":  [ "AM","PH"],//trur
    //   "specialists": ["Pediatric" , "IM" ], //true
    //   "typecategory":  ["Hospital", "Clienc" ], //false
    // }

    // const filterData = {
    //   "class":  [], 
    //   "clienttype":  [], 
    //   "specialists": [], 
    //   "typecategory":[], 
    // }

    const searchResult = data?.clients?.filter(client => {
      // client 
      let filter_Data_Search_Result = true
      for (let key in filterData) {

        // clientType
        if (!filter_Data_Search_Result) return false

        if (
          (!Array.isArray(client[key]) && filterData[key].length && !filterData[key].includes(client[key])
            || (!Array.isArray(client[key]) && typeof filterData[key] == "string" && filterData[key].trim().length && !client[key].includes(filterData[key]))
            || (Array.isArray(client[key]) && filterData[key].length && !filterData[key].some(ele => client[key].indexOf(ele) !== -1))
          )) {
          filter_Data_Search_Result = false
        }

        // if(Array.isArray(client[key]) &&  !filterData[key].some(ele=>client[key].indexOf(ele) !== -1) ){
        //   filter_Data_Search_Result = false
        // }

        // filterData[key].map(searchParam=>{
        //   //or
        //   if(client[key] === searchParam) {
        //   }
        // })
      }
      // if(filter_Data_Search_Result){
      // }
      return filter_Data_Search_Result
    })

    setSearchResult(searchResult)
    setResult(searchResult)

  }


  return (
    <View >
      <View style={styles.buttonContainer}>
      <Caption style={styles.caption}> {result?.length} / { data?.clients?.length} </Caption>
        <Button color={Colors.primary} style={styles.filterButton}
          icon={() => (
            <AntDesign style={{ padding: 0, margin: 0 }} name="filter" size={17} color={'#fff'} />
          )}
          uppercase={false} mode="contained" onPress={handle_Filter_button}>
          Filter
        </Button>
       
      </View>

      {show && <Card.Content style={styles.card}>
        <ScrollView style={styles.screen}>
          {filter.map((item, index) => {
            if (item.inputLable) return <Input Key={index} name={item.resultLable} control={control} lable={item.inputLable} />

            const searchKey = item.searchKey
            const data = formatDropdownData(filterParam[searchKey], item.searchLable)
            return <DropdownFilter Key={index} lable={item.lableName} data={data} name={item.resultLable} control={control} />
          })}
        </ScrollView >
        <View style={styles.buttonContainer}>
          <Button color={Colors.primary} style={styles.filterButton} uppercase={false} mode="outLine" onPress={handleSubmit(onSearch)}>
            Search
          </Button>
        </View>
      </Card.Content>}


    </View>
  );
}


const styles = StyleSheet.create({
  screen: {
    height: 200
  },
  card:{
    backgroundColor:"#fff",
    marginHorizontal:20,
    marginBottom:10
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "flex-end",
    margin: 5,
  },
  caption:{
    color:Colors.primary,
    backgroundColor:"#fff",
    flexDirection:"column",
    justifyContent:"center",
    alignContent:'center',
    textAlign:"center",
    margin:1 , 
    borderRadius:10, 
    height:20,
    paddingHorizontal:5
  }
})

export default Filter;


