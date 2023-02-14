import React from "react";
import { StyleSheet, View, ScrollView } from "react-native";
import BackNav from "../../../navigations/BackNav";
import { Calendar, CalendarList, Agenda } from "react-native-calendars";
import { LocaleConfig } from "react-native-calendars";
import { Modal, Portal, Provider } from "react-native-paper";
import Colors from "../../../constants/Colors";
import { CHANGE_DAY , CHANGE_MONTH} from "../planeReducer";

const PlaneCalender = ({ planState, style , dispatchPlanState }) => {
  return (
    <View style={{ ...styles.container, ...style }}>
      <Calendar
        style={{ borderRadius: 15 }}
        // Initially visible month. Default = now
        current={planState.date.current_date}
        // Minimum date that can be selected, dates before minDate will be grayed out. Default = undefined
        // minDate={planState.date.current_date}
        // Maximum date that can be selected, dates after maxDate will be grayed out. Default = undefined
        // maxDate={"2022-05-30"}
        // Handler which gets executed on day press. Default = undefined
        onDayPress={(day) => {
          dispatchPlanState({
            type:CHANGE_DAY,
            date:day.dateString
          })
        }}
        // Handler which gets executed on day long press. Default = undefined
        onDayLongPress={(day) => {

        }}
        // Month format in calendar title. Formatting values: http://arshaw.com/xdate/#Formatting
        // monthFormat={"yyyy MM"}
        // Handler which gets executed when visible month changes in calendar. Default = undefined
        onMonthChange={(month) => {
          dispatchPlanState({
            type:CHANGE_MONTH,
            month: month.month,
            year:month.year
          })

        }}
        // Hide month navigation arrows. Default = false
        hideArrows={false}
        // Replace default arrows with custom ones (direction can be 'left' or 'right')
        // renderArrow={(direction) => <disableArrowRight />}
        // Do not show days of other months in month page. Default = false
        hideExtraDays={true}
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
        onPressArrowLeft={(subtractMonth) => subtractMonth()}
        // Handler which gets executed when press arrow icon right. It receive a callback can go next month
        onPressArrowRight={(addMonth) => addMonth()}
        // Disable left arrow. Default = false
        disableArrowLeft={false}
        // Disable right arrow. Default = false
        disableArrowRight={false}
        // Disable all touch events for disabled days. can be override with disableTouchEvent in markedDates
        disableAllTouchEventsForDisabledDays={false}
        // Replace default month and year title with custom one. the function receive a date as parameter

        // renderHeader={(date) => {
        //   /*Return JSX*/
        // }}

        // Enable the option to swipe between months. Default = false
        enableSwipeMonths={false}
        // Hide knob button. Default = false
        hideKnob={false}
        markedDates={planState.marktPlansObg}
        theme={{
          arrowColor: Colors.accent,
          monthTextColor: Colors.primary,
          textDayHeaderFontSize: 19,
          selectedDayBackgroundColor: 'red',
          selectedDayTextColor: '#000',
          todayTextColor: 'red',
        }}
      />



      
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 15,
    shadowColor: "#171717",
    shadowOffset: { width: -2, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 15,
    elevation: 10,
    borderRadius: 15,
    borderWidth: 1,
    borderBottomColor: Colors.primary,
    borderLeftColor: Colors.primary,
    borderTopColor: Colors.accent,
    borderRightColor: Colors.accent,
  },
});

export default PlaneCalender;
