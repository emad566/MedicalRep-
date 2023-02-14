import Colors from "../../constants/Colors";

export const SERVER_DATA = "SERVER_DATA";
export const CHANGE_DAY = "CHANGE_DAY";
export const SHOW_ADD_PLAN_MODAL = "SHOW_ADD_PLAN_MODAL";
export const HIED_ADD_PLAN_MODAL = "HIED_ADD_PLAN_MODAL";
export const HIDE_TIME_PICKER_MODAL = "HIDE_TIME_PICKER_MODAL";
export const SHOW_TIME_PICKER_MODAL = "SHOW_TIME_PICKER_MODAL";
export const CHANGE_MONTH = "CHANGE_MONTH";
export const CHANE_USER = "CHANE_USER";
export const CHANE_DATE_TIME_PICKER = "CHANE_DATE_TIME_PICKER";
export const SHOW_DATE_TIME_PICKER = "SHOW_DATE_TIME_PICKER";
export const CHANE_CLIENT = "CHANE_CLIENT";
export const CLIENT_LENGTH_ERROR = "CLIENT_LENGTH_ERROR";
export const ADD_PLAN_LOADING = "ADD_PLAN_LOADING";
export const ALL_USERS_PLANS = "ALL_USERS_PLANS" ;
export const initialValue = {
  plane_Filter: {
    current_login: "1",
    client_id: "",
    rep_user_id: false,
    plan_date: "",
    from_date: "",
    to_date: "",
    current_day: "",
    current_month: "1",
    by_month: {
      // year: 2020,
      // month: 5
    },
  },
  date: {},
  plans: [],
  users: [],
  edit_mode: false,
  clients: [],
  loading: true,
  modal_show: false,
  error: false,
  show_DateTimePicker: false,
  selected_Client: [],
  plansThisDaty: [],
  marktPlansObg: {},
  selected_day: "",
  constMrktPlansObg: {},
  selectedUser: null,
  dateTimePicker: {
    show: false,
    value: new Date(),
  },
  add_Plan_loading: false,
  add_edte_plan_error: false,
  server_Sucsess_Message: null,
  server_error_Message: null,
  current_login_user_id:null,
  allusers:false,
};

export const palnReducer = (state, action) => {
  switch (action.type) {
    case SERVER_DATA:
      const users = action.data.filter.users.map((type) => {
        return { value: type.id, label: type["name"] };
      });
      const clients = action.data.filter.clients.map((type) => {
        return { value: type.id, label: type["client_name"] };
      });
      // const plansThisDaty = action.data.filter.plans.filter(
      //   (plan) => plan.plan_date === action.data.date.current_date
      // );

      let marktPlansObg = {};
      if (action.data.filter.plans.length) {
        const marketPlans = action.data.filter.plans.map((plan) => {
          const futurPlan =
            new Date(plan.plan_date).getTime() >=
            new Date(action.data.date.current_date).getTime();
          return {
            [plan.plan_date]: {
              selected: true,
              marked: false,
              selectedColor: futurPlan ? Colors.accent : "#ffce5c6e",
            },
          };
        });
        marktPlansObg = Object.assign({}, ...marketPlans);
      }
      return {
        ...state,
        users: users,
        loading: false,
        clients: clients,
        plans: action.data.filter.plans.reverse(),
        date: action.data.date,
        plansThisMonth: action.data.filter.plans,
        marktPlansObg: marktPlansObg,
        constMrktPlansObg: marktPlansObg,
        selected_day: action.data.date.current_date,
        loading: false,
        current_login_user_id:action.data.date.current_login_user_id,
        selectedUser:state.plane_Filter.rep_user_id ?  state.plane_Filter.rep_user_id:action.data.date.current_login_user_id,
      };

    case CHANGE_DAY:
      if (state.marktPlansObg[action.date]) {
        const newMarktDay = {
          ...state.constMrktPlansObg,
          ...{
            [action.date]: {
              selected: true,
              marked: false,
              selectedColor: Colors.primary,
            },
          },
        };
        const statPlans = [...state.plansThisMonth];
        const update_plansThisDaty = [...statPlans].filter(
          (plan) => plan.plan_date === action.date
        );
        return {
          ...state,
          marktPlansObg: newMarktDay,
          selected_day: action.date,
          plans: [...update_plansThisDaty],
        };
      }
      return { ...state };

    case SHOW_ADD_PLAN_MODAL:
      return {
        ...state,
        edit_mode: action.edit_mode,
        modal_show: true,
        selected_Client: action.clients ? action.clients : [],
        dateTimePicker: {
          show: false,
          value: action.date ? new Date(action.date) : new Date(state.date.current_date),
        },
      };

    case HIED_ADD_PLAN_MODAL:
      return {
        ...state,
        
        modal_show: false,
        selected_Client: [],
        server_Sucsess_Message: null,
        server_error_Message: null,
      };

    case SHOW_TIME_PICKER_MODAL:
      return { ...state, show_DateTimePicker: true };

    case HIDE_TIME_PICKER_MODAL:
      return { ...state, show_DateTimePicker: false };

    case CHANGE_MONTH:

      const plane_Filter = {
        current_login: !state.selectedUser,
        client_id: "",
        rep_user_id: state.selectedUser,
        plan_date: "",
        from_date: "",
        to_date: "",
        current_day: "",
        current_month: "",
        by_month: {
          year: action.year,
          month: action.month,
        },
      };
      return {
        ...state, plane_Filter: plane_Filter, loading: true, by_month: {
          year: action.year,
          month: action.month,
        },
      };

    case CHANE_USER:
      const plane_user_Filter = {
        current_login: "",
        client_id: "",
        rep_user_id: action.userId,
        plan_date: "",
        from_date: "",
        to_date: "",
        current_day: "",
        current_month: !state.by_month,
        by_month: state.by_month,
      };
      return {
        ...state,
        plane_Filter: plane_user_Filter,
        loading: true,
        selectedUser: action.userId,
        allusers:false
      };

    case SHOW_DATE_TIME_PICKER:
      return {
        ...state,
        dateTimePicker: { ...state.dateTimePicker, show: true },
      };

    case CHANE_DATE_TIME_PICKER:
      return {
        ...state,
        dateTimePicker: {
          ...state.dateTimePicker,
          show: false,
          value: action.value || state.dateTimePicker.value,
        },
      };

    case CHANE_CLIENT:
      return {
        ...state,
        selected_Client: action.value,
        add_edte_plan_error: false,
      };

    case CLIENT_LENGTH_ERROR:
      return { ...state, add_edte_plan_error: action.error };

    case ADD_PLAN_LOADING:
     const plans_Filter = {
        current_login: "1",
        client_id: "",
        rep_user_id: "",
        plan_date: "",
        from_date: "",
        to_date: "",
        current_day: "",
        current_month: "1",
        by_month: state.by_month
      }
      if(action.loading){
        return { ...state,plane_Filter:plans_Filter, add_Plan_loading: action.loading, server_Sucsess_Message: action.sucsessMsg, server_error_Message: action.error };
      }else{
        return { ...state, add_Plan_loading: action.loading, server_Sucsess_Message: action.sucsessMsg, server_error_Message: action.error };

      }

      case ALL_USERS_PLANS:
        const plan_Filter = {
          current_login: state.allusers && !state.selectedUser,
          client_id: "",
          rep_user_id: state.selectedUser && state.allusers ?state.selectedUser :"" ,
          plan_date: "",
          from_date: "",
          to_date: "",
          current_day: "",
          current_month: "",
          by_month: state.by_month,
        };
        return {
          ...state, plane_Filter: plan_Filter, loading: true ,allusers : !state.allusers 
        };

      default:
      return initialValue;
  }
};

