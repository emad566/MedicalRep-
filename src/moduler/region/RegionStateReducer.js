
export const SCREEN_LOADING = 'SCREEN_LOADING';
export const CITY_DATA = "CITY_DATA";
export const REGION_DATA = "REGION_DATA";
export const SET_REGION_VALUE = "SET_REGION_VALUE";
export const SElECTED_VALUE_ERROR = "SElECTED_VALUE_ERROR";
export const EDITE_MODE = "EDITE_MODE";
export const RESET = "RSER";
export const SERVER_ERROR = "SERVER_ERROR";

export const initialValue = {
    submitText: {
        submitText: "+ Save",
        title: " Add New State",
    },
    state: {
        data: [],
    },
    city: {
        data: [],
    },
    region: {
        data: [],
    },
    selectedVlaue: {
        value: undefined,
        type: "state",
        error: false,
    },
    screenLoading: true,
    serverError: null,
    sucsees: null
}

export const formReducer = (state, action) => {
    if (action.type === SCREEN_LOADING) {
        if(action.sucsees !== undefined ){
            return ({ ...initialValue, sucsees: action.sucsees !== undefined ? action.sucsees : state.sucsees, screenLoading: action.screenLoading, serverError: action.serverErrors !== undefined ? action.serverErrors : state.serverError  })
        }
        return ({ ...state, sucsees: action.sucsees !== undefined ? action.sucsees : state.sucsees, screenLoading: action.screenLoading, serverError: action.serverErrors !== undefined ? action.serverErrors : state.serverError  })
    }
    if (action.type === CITY_DATA) {
        return ({ ...state, city: { data: action.data }, region: { data: [] }, selectedVlaue: { value: action.value, type: action.valueType } })
    }
    if (action.type === REGION_DATA) {
        return ({ ...state, region: { data: action.data }, selectedVlaue: { value: action.value, type: action.valueType } })
    }
    if (action.type === SET_REGION_VALUE) {
        return ({ ...state, selectedVlaue: { value: action.value, type: action.valueType } })
    }
    if (action.type === SElECTED_VALUE_ERROR) {
        return ({ ...state, selectedVlaue: { value: undefined, type: null, error: true } })
    }
    if (action.type === EDITE_MODE) {
        return ({ ...state, submitText: { submitText: action.submitText, title: action.title } })

    }
    if (action.type === RESET) {
        return ({ ...initialValue, screenLoading: false ,  sucsees: state.sucsees , serverError: state.serverError  })

    }
    if (action.type === SERVER_ERROR) {
        return ({ ...state, serverError: action.error  , })

    }
    return state
}