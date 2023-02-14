import moment from "moment";
import React from "react";
import { useState } from "react";
import { StyleSheet, View, ScrollView , Text} from "react-native";
import { Calendar, CalendarList, Agenda } from "react-native-calendars";
import { LocaleConfig } from "react-native-calendars";



const CustomCalendar = ({ style , onDayPress , selectedDayes }) => {
    const [markedDates , setMarkedDates] = useState({})

  // console.log({selectedDayes})
  return (
    <View style={{ ...styles.container, ...style }}>
      <Calendar
      disabledByDefault={false}
        style={{ borderRadius: 15 }}

        // Initially visible month. Default = now
       /// current={current}
        // Minimum date that can be selected, dates before minDate will be grayed out. Default = undefined
       // minDate={new Date(moment(new Date()).add(4,'days'))}
        // Maximum date that can be selected, dates after maxDate will be grayed out. Default = undefined
        // maxDate={"2022-05-30"}
        // Handler which gets executed on day press. Default = undefined
        onDayPress={(day) => {
          console.log({day})
          onDayPress(day)
          // console.log({day})
          // dispatchPlanState({
          //   type:CHANGE_DAY,
          //   date:day.dateString
          // })
        }}
        // Handler which gets executed on day long press. Default = undefined
        onDayLongPress={(day) => {
          onDayPress(day)
        }}
        // Month format in calendar title. Formatting values: http://arshaw.com/xdate/#Formatting
        // monthFormat={"yyyy MM"}
        // Handler which gets executed when visible month changes in calendar. Default = undefined
        onMonthChange={(month) => {
          // dispatchPlanState({
          //   type:CHANGE_MONTH,
          //   month: month.month,
          //   year:month.year
          // })

        }}
        // Hide month navigation arrows. Default = false
        hideArrows={false}
        // Replace default arrows with custom ones (direction can be 'left' or 'right')
        // renderArrow={(direction) => <disableArrowRight />}
        // Do not show days of other months in month page. Default = false
        hideExtraDays={false}
        // If hideArrows = false and hideExtraDays = false do not switch month when tapping on greyed out
        // day from another month that is visible in calendar page. Default = false
        disableMonthChange={false}
        // If firstDay=1 week starts from Monday. Note that dayNames and dayNamesShort should still start from Sunday
        // firstDay={1}
        // Hide day names. Default = false
        hideDayNames={false}
        // hideMonthNames={false}

        // Show week numbers to the left. Default = false
        showWeekNumbers={false}
        // Handler which gets executed when press arrow icon left. It receive a callback can go back month
        onPressArrowLeft={(subtractMonth) =>subtractMonth() }
        // Handler which gets executed when press arrow icon right. It receive a callback can go next month
        onPressArrowRight={(addMonth) => addMonth()}
        // Disable left arrow. Default = false
        disableArrowLeft={false}
        // Disable right arrow. Default = false
        disableArrowRight={false}
        // Disable all touch events for disabled days. can be override with disableTouchEvent in markedDates
        disableAllTouchEventsForDisabledDays={true}

        // Replace default month and year title with custom one. the function receive a date as parameter

        // renderHeader={(date) => {
        //   /*Return JSX*/
        // }}

        // Enable the option to swipe between months. Default = false
        enableSwipeMonths={true}
        // Hide knob button. Default = false
        hideKnob={false}
        // markedDates={{
        //   '2022-12-15': { color: '#000', selected: true, marked: false, selectedColor:  "#FFEFFE", },
        //   '2022-12-16': { color: '#000', selected: true, marked: false, selectedColor:  "#FFEFFE", },
        // }}

        markingType={'custom'}
        markedDates={selectedDayes}
        theme={{
          // arrowColor: colors.pinq,
          // monthTextColor: colors.black,
          // textDayHeaderFontSize: FontsSizes.font14,
          // selectedDayBackgroundColor: colors.white,
          // selectedDayTextColor: colors.black,
          // todayTextColor: "#000",
          // textMonthFontWeight: 'bold',
          // dayTextColor: '#000',
          // textSectionTitleColor:"#000",
          // textDayHeaderFontWeight: 'bold',

        }}

       

      />




    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    margin: 3,
    shadowColor: "#171717",
    shadowOffset: { width: -2, height: 2 },
    shadowOpacity: 0.4,
    shadowRadius: 10,
    elevation: 8,
    borderRadius: 10,
    overflow: "hidden"
  },
  selectedDayStyle: {
    container: {backgroundColor: '#FFEFFE',elevation: 2, borderRadius:0},
   // text: {color: colors.pinq, }
  }
});

export default CustomCalendar;
