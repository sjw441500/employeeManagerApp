import React,{Component} from 'react';
import List from '../List';
import Search from '../Search';
import {Link } from 'react-router-dom';
import {Button} from 'react-bootstrap';
//import * as actions from '../../actions/actions';
//import {connect} from 'react-redux';
// import Add from '../Add';
class Home extends Component{
    constructor(props){
        super(props);
    }
   
    render(){
        return (
            <div>
            <Search/>
            <Link to="/add">
            <Button>Add</Button>
            </Link>
            <List/>
            </div>

        )
    }
}

  export default Home;
