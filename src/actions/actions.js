import axios from 'axios';

/**get employee */
export const requestStart=()=> {
    return {
      type: 'EMPLOYEE_FETCH_START',
    };
  }
export const  requestSuccess=(response)=> {

    //console.log(response.data.length);
    return {
      type: 'EMPLOYEE_FETCH_SUCCESS',
      data: response.data,
      //count:response.data.length
      
    };
  }
export const requestFail=(err)=> {
    return {
      type: 'EMPLOYEE_FETCH_FAIL',
      err,
    };
  }

  export const getManagerStart=()=> {
    return {
      type: 'MANAGER_FETCH_START',
    };
  }
export const  getManagerSuccess=(response)=> {

    return {
      type: 'MANAGER_FETCH_SUCCESS',
      data: response.data.data,
    };
  }
export const getManagerFail=(err)=> {
    return {
      type: 'MANAGER_FETCH_FAIL',
      err,
    };
  }

  export const resetManager=()=>{
    return {
      type: 'RESET_MANAGER',
    };
  }

  export const getManagerDetail =(_id)=>{
    return{
      type:'GET_MANAGER_DETAIL',
      _id
    }

  }
  export const getEmployees=()=> {
    return (dispatch,getState) => {
      dispatch(requestStart());
      axios
        .get('http://localhost:8888/api/employees')
        .then(response => {
          dispatch(requestSuccess(response));
        })
        .catch(err => {
          dispatch(requestFail(err));
        });
    };
  }


  export const getValidManager=(id)=> {
    return (dispatch,getState) => {
      dispatch(getManagerStart());
      axios
        .get(`http://localhost:8888/api/valids/${id}`)
        .then(response => {
          dispatch(getManagerSuccess(response));
        })
        .catch(err => {
          dispatch(getManagerFail(err));
        });
    };
  }

  /**add employee */
  export const addStart=()=> {
    return {
      type: 'EMPLOYEE_ADD_START',
    };
  }
  export const  addSuccess=()=> {
    return {
      type: 'EMPLOYEE_ADD_SUCCESS',
    };
  }
export const addtFail=(err)=> {
    return {
      type: 'EMPLOYEE_ADD_FAIL',
      err,
    };
  }

  export const addEmployee=(photo,name,title,sex,startDate,officePhone,cellPhone,sms,email,manager)=> {
    return (dispatch,getState) => {
        dispatch(addStart());
        axios(
          {
            method:'post',
            url:'http://localhost:8888/api/employees',
            data:{photo,name,title,sex,startDate,officePhone,cellPhone,sms,email,manager}
          }
        )
        .then(response=>{
          dispatch(addSuccess()) 
        })
        .catch(err=>{
          dispatch(addtFail(err));
              
        })

          }
  }
