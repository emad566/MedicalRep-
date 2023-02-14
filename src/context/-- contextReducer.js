const NAVSTACK = 'NAVSTACK';

export const contextInit ={
    current_nav: 'ProfileScreen',
    NAVSTACK: ['ProfileScreen']
};

export const contextReducer = (state, action) => {
    switch (action.type){
        case NAVSTACK:
            
        break;
    };

    return state;
}