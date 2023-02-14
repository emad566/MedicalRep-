import { LOGIN } from "../actions/AuthAction";


const initialState = {
    userToken: null,
};

export default  (state = initialState , action)=>{
    switch(action.type) {
        case LOGIN:
        return { ...state, userToken: action.userToken};

        default:
            return initialState
    }
}