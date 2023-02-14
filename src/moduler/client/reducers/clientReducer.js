export const clientInit = (props) => {
  return {
    edit_id: props.edit_id,
    edit_item_data: null,
    create_data: props.create_data,
    line_ids: [],
    c_state_id: null,
    allLines:null,
    lines:null,
  };
};

export const clientReducer = (state, action) => {
  switch (action.type) {
    case "data":
      let create_data = state.create_data;
      let c_state_id = null;
      let edit_item_data = null;
      let lines = [];

      if (state.edit_id) {
        if (create_data && create_data.client_region)
          c_state_id = create_data.client_region.state_id;

        edit_item_data = create_data?.client;
        if (create_data.line_ids) lines = create_data.line_ids;
      } 

      return {
        ...state,
        c_state_id: c_state_id,
        edit_item_data: edit_item_data,
        allLines:create_data.lines,
        lines:lines,
      };
      break;
  }
  return state;
};
