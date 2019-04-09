const sort = (state = {sortBy:null,order:null} ,action)=>{
    switch(action.type){
        case "SORT":{
            if(state.sortBy!==action.sortBy){
                return(
                    {
                        sortBy:action.sortBy,
                        order:"ascending"
                    }
                )
            }
            else
            {
                if(state.order==="ascending"){

                    return({
                        ...state,
                        order:"descending"
                    })
                }
                else{
                    return({
                        ...state,
                        order:"ascending"
                    })
                }
            }
        }

        default:
        
        return state;
    }

}

export default sort;