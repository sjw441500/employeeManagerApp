import { CastError } from "mongoose";

const manager = (state = {err:null,isFetching:false,data:[]},action)=>{

    switch(action.type){

        case "RESET_MANAGER":{
            return {...state,data:[]};
                
        }

        case "MANAGER_FETCH_START" :{
            return(
                {
                    ...state,
                    isFetching:true
                }

            )
        }
        case "MANAGER_FETCH_FAIL" :{
            return(
                {
                    ...state,
                    isFetching:false,
                    err:action.err
                }

            )
        }
        case 'MANAGER_FETCH_SUCCESS':{
            return (
                {...state,
                isFetching:false,
                data:action.data
            }
            )
        }
        default:
        return state;
        
    }
}

export default manager;