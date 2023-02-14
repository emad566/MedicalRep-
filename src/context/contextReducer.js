export const contextInit = (props) => {
    return {
        unRead_notif_num:'',
    }
};

export const contextReducer = (stateContext, action) => {
  switch (action.type) {
    case "unRead_notif_num":
      const unRead_notif_num = stateContext.unRead_notif_num + 1
      return { ...stateContext, unRead_notif_num: unRead_notif_num };
    break;   

    case "reset_notif_num":
      return { ...stateContext, unRead_notif_num: action.value };
    break;   
  }
  
  return stateContext;
};
