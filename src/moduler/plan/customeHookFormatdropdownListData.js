
import { useSelector } from 'react-redux';
const useformatData = (lable, selectFormat) => {
    let formateType
    const create_data = useSelector(state => state.reducer.CREATE['plans'])
    const selectFormat_data = create_data[selectFormat];
    if (selectFormat_data) {
      formateType = selectFormat_data.map(type => { return { value: type.id, label: type[lable] } })
    }
    return ([formateType])
  }
export default useformatData;