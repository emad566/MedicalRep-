import * as React from 'react';
import {useCallback} from 'react';
import {StyleSheet, View, Text} from 'react-native';
import BackNav from './../../../navigations/BackNav';
import * as yup from 'yup';
import {useDispatch} from 'react-redux';
import {useState} from 'react';
import {useContext} from 'react';
import {context} from './../../../context/AppContext';
import {create, store, update} from './../../../store/actions/action';
import {useEffect} from 'react';
import {Card} from 'react-native-paper';
import CustomInput from './../../../components/UI/CustomInput';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import {yupResolver} from '@hookform/resolvers/yup';
import {useForm} from 'react-hook-form';
import SubmitButton from './../../user/components/UI/SubmitButton';
import Colors from '../../../constants/Colors';
import {useSelector} from 'react-redux';
import {MultiselectDropdown} from 'sharingan-rn-modal-dropdown';
import HeaderButton from '../../../components/UI/HeaderButton';
import ErrorArray from '../../../components/UI/ErrorArray';
import RoutToLogin from '../../../components/UI/RoutToLogin';
import CustomCalendar from '../components/CustomCalendar';

//===========
//Schema
//==========
const schema = yup.object({
  vacation_details: yup.string().required('Details is required').max(100).min(3), //? max
});

const CreateVacationScreen = props => {
  const edit_id = props.route.params.edit_id;
  const myContext = useContext(context);
  const dispatch = useDispatch();
  const [screenLoading, setScreenLoading] = useState(false);
  const [serverErrors, setServerErrors] = useState(false);
  const [serverErrorMsg, setServerErrorMsg] = useState(false);
  const [vacationDaysError, setVacationDaysError] = useState(false);

  const [markedDates, setMarkedDates] = useState({});

  const handeleAvailableDate = day => {
    const isDaySelected = markedDates?.[day?.dateString]
    if(isDaySelected === undefined){
      setMarkedDates({
        ...markedDates,
        [day?.dateString]: {customStyles: styles.selectedDayStyle},
      });
    }else{
      delete markedDates[day?.dateString];
      setMarkedDates({ ...markedDates })
    }
  };

 

  

  //===============================
  // Edite mode Data Action
  //===============================
  let edit_item_data = false;
  let edit_date = useSelector(state => state.reducer.EDIT['lines']);
 


  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: edit_item_data
      ? {
        vacation_details: edit_item_data.vacation.vacation_details,
        }
      : {},
  });

  

  //===============================
  // Submit user Data
  //===============================
  const onSubmit = async data => {
    const vacation_days = []
    for(const d in markedDates){
      vacation_days.push(d);
    }

    setServerErrors(false);
    if (vacation_days.length === 0) {
      setVacationDaysError(true);
      return;
    } else {
      const inserted_date = {
        vacation_days: vacation_days,
        vacation_details: data.vacation_details,
      };
      try {
        setScreenLoading(true);
        if (props.route.params.edit_id) {
          const id = edit_item_data.vacation.id;
          await dispatch(
            update(
              id,
              inserted_date,
              'vacations/' + id,
              'vacations',
              myContext.userToken,
            ),
          );
          setScreenLoading(false);
          props.navigation.navigate('IndexVacationScreen', {
            title: "Vacation days"
          });
        } else {
          await dispatch(
            store(inserted_date, 'vacations', 'vacations', myContext.userToken),
          );
          setScreenLoading(false);
          props.navigation.navigate('IndexVacationScreen', {
            title: "Vacation days"
          });
        }
      } catch (e) {
        RoutToLogin(e, props);
        if (e.type == 'server') {
          setScreenLoading(false);
          if (e.error.msg) {
            setServerErrorMsg(e.error.message);
          }
          if (e.error.errors) {
            setServerErrors(e.error.errors);
          }
        }
      }
    }
  };

  return (
    <BackNav
      HeaderButton={
        <HeaderButton
          isLoading={screenLoading}
          name="check"
          onPress={handleSubmit(onSubmit)}
        />
      }
      title={
        edit_item_data ? 'Edit: ' + edit_item_data.line.line_name : 'Request Vacation '
      }
      navigation={props.navigation}>
      <View>
        <Card>
          <Card.Content>
            <CustomCalendar
              selectedDayes={markedDates}
              onDayPress={handeleAvailableDate}
            />
            <CustomInput
              label="Vacation Details "
              placeholder="Vacation Details"
              errors={errors.vacation_details}
              name="vacation_details"
              control={control}
              maxLength={191}
              required={false}
              icon={() => {
                return (
                  <FontAwesome5
                    name="calendar-check"
                    size={20}
                    color={Colors.scandry}
                  />
                );
              }}
              serverErrors={serverErrors.vacation_details}
            />

            

            <SubmitButton
              errors={errors}
              color={edit_item_data ? Colors.accent : Colors.primary}
              text={edit_item_data ? 'Update Vacation' : 'Save'}
              serverErrorMsg={serverErrorMsg}
              screenLoading={screenLoading}
              onPress={handleSubmit(onSubmit)}
            />
          </Card.Content>
        </Card>
      </View>
    </BackNav>
  );
};

const styles = StyleSheet.create({
  selectedDayStyle: {
    container: { backgroundColor: '#FFEFFE', elevation: 2, borderRadius: 0 },
    text: { color: Colors.primary, }
    }
});

export default CreateVacationScreen;
