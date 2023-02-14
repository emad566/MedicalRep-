import { USERTOKEN, INDEX, VIEW, CREATE, STORE_ID, EDIT, UPDATE, DELETE, API } from "../actions/action";

const initialState = {
  USERTOKEN: "",
  INDEX: [],
  VIEW: [],
  CREATE: [],
  STORE_ID: [],
  EDIT: [],
  UPDATE: [],
  DELETE: [],
  API:[]
};

export default (state = initialState, action) => {
  let data =[];
  switch (action.type) {
    
    case USERTOKEN:
      return { ...state, USERTOKEN: action.USERTOKEN };
      break;

    case INDEX:
      let data = state.INDEX;
      data[action.model] = action.value;
      return { ...state, INDEX: data };
      break;

    case VIEW:
      data = state.VIEW;
      data[action.model] = action.value;
      return { ...state, VIEW: data };
      break;

    case CREATE:
      data = state.CREATE;
      data[action.model] = action.value;
      return { ...state, CREATE: data };
      break;

    case STORE_ID:
      data = state.STORE_ID;
      data[action.model] = action.value;
      return { ...state, STORE_ID: data };
      break;

    case EDIT:
      data = state.EDIT;
      data[action.model] = action.value;
      return { ...state, EDIT: data };
      break;

    case UPDATE:
      data = state.UPDATE;
      data[action.model] = action.value;
      return { ...state, UPDATE: data, VIEW: data };
      break;

    case DELETE:
      data = state.DELETE;
      data[action.model] = action.value;
      return { ...state, DELETE: data };
      break;

    case API:
      if(!action.key){
        return {...state, API: action.value};
      }else{
        let updatedAPI = state.API;
        updatedAPI[action.key] = action.value;
        return {...state, API: updatedAPI};
      }
    default:
      return initialState;
  }
};
