const show = (state={err:null,isFetching:false,isAdding:false,data:[]},action)=>{

    switch(action.type){
        case 'EMPLOYEE_FETCH_START':
        return( {
          ...state,
          isFetching: true,
        }
        )
      case 'EMPLOYEE_FETCH_FAIL':
        return ({
          ...state,
          err: action.err,
          isFetching: false,
        })
        case "EMPLOYEE_FETCH_SUCCESS":{
            return ({
                ...state,
                isFetching: false,
                err: null,
                data: action.data,
                //searchedData:action.data,
              }) 
        }
        case 'EMPLOYEE_ADD_START':
        return( {
          ...state,
          isAdding: true,
        }
        )
      case 'EMPLOYEE_ADD_FAIL':
        return ({
          ...state,
          err: action.err,
          isAdding: false,
        })
        case "EMPLOYEE_ADD_SUCCESS":{
            return ({
                ...state,
                isAdding: false,
                err: null,
              }) 
        }


        default:
            return state;
    }


}

export default show;