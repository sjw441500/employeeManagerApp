import React,{Component} from 'react';
import List from '../List';
import Search from '../Search';
import {Link,Redirect } from 'react-router-dom';
import {Button} from 'react-bootstrap';
import axios from 'axios';
import {getEmployees,getInitialData,getDelete} from '../../actions/actions';
import {connect} from 'react-redux';
// import Add from '../Add';
const PAGE_SIZE =9;
class Home extends Component{
    constructor(props){
        super(props);
   this.deleteOnClick.bind(this);
    }

    componentDidMount() 
    {
        // this.props.getAllData();
    
        this.props.getInitialData();
      
      }

      deleteOnClick = (id)=>{
        axios(
            {method:'delete',
            url:`http://localhost:8888/api/employees/${id}`,
        })
        .then(
          this.props.getInitialData
        )
        .then(
          this.forceUpdate()
          )
        .catch(err => {
              alert(err);
            });
    
    }
   
    render(){
        const {show} = this.props;
        let usersUI;
       if (show.isFetching){
         usersUI = <p>Loading</p>;
       }else if (show.err) {
         usersUI = <p style={{ color: 'red' }}>{show.err}</p>;
       } else {
         usersUI =<List data={this.props.data} deleteOnClick={this.deleteOnClick}/>
       }
        return (
            <div>
            <h1>Employee Management</h1>
            <Search/>
            <Link to="/add">
            <Button >Add</Button>
            </Link>
            {usersUI}
          
            <Button onClick={()=>{window.location.reload()}}>Back Home </Button>
        
         
            </div>

        )
    }
}

const mapStateToProps = state => {
    return {
      show: state.show,
      data:state.show.data,
      sort:state.sort
    };
  };
  const mapDispatchToProps = dispatch=>{
    return{
      //getAllData:()=>dispatch(getEmployees()),
      getInitialData:()=>dispatch(getInitialData(PAGE_SIZE,null,null)),
      // deleteOnClick:(id)=>dispatch(getDelete(id,PAGE_SIZE,null,null))

    }

  }

  export default connect(mapStateToProps,mapDispatchToProps)(Home);
