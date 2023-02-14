export const regionInit = (props) => {
    return {
        setSelectedRegion: props.setSelectedRegion,
        regions: props.regions,
        state: null, //take state_id and return stateObject
        states: [],
        city: null, //take city_id and return cityObject
        cities: [],
        r_place: null, //take region_id and return regionObject
        r_places: [],
      }
};


export const regionReducer = (stateRegion, action) => {
  if (!action.value) return stateRegion;

  switch (action.type) {
    case "regions":
      const regions = action.value;
      let states = null;
      if (regions) {
        states = regions.map((type) => {
          return { value: type.id, label: type.state_name };
        });
      }
      return { ...stateRegion, states: states, regions: regions };
      break;

    case "state":
      let state = stateRegion.regions.filter((reg) => reg.id == action.value);
      let cities = null;
      if (state.length > 0) {
        state = state[0];
        cities = state.cities.map((type) => {
          return { value: type.id, label: type.city_name };
        });
      }
      stateRegion.setSelectedRegion(action.value);

      return { ...stateRegion, state: state, cities: cities };
      break;

    case "city":
      let city = stateRegion.state.cities.filter(
        (reg) => reg.id == action.value
      );
      let r_places = null;
      if (city) {
        city = city[0];
        r_places = city.regions.map((type) => {
          return { value: type.id, label: type.r_name };
        });
      }
      stateRegion.setSelectedRegion(action.value);
      return { ...stateRegion, city: city, r_places: r_places };
      break;

    case "r_place":
      let r_place = stateRegion.city.regions.filter(
        (reg) => reg.id == +action.value
      );
      stateRegion.setSelectedRegion(action.value);
      if (r_place.length>0) r_place = r_place[0] 

      return { ...stateRegion, r_place: r_place };
    
  }
  return stateRegion;
};
