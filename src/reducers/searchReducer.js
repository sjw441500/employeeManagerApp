const search = (state="",action)=>{

    switch(action.type){

        case"":{

            return action.search;
        }
        default:
        return state;
    }

}

export default search;