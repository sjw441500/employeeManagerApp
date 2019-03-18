import React, {Component} from 'react';
import Home from '../../components/Home'
import {BrowserRouter, Route,Switch} from 'react-router-dom';
import Edit from '../../components/Edit';
import Add from '../../components/Add'
class App extends Component{
    constructor(props){
        super(props);
    }
    render(){
        return(
    <BrowserRouter>
        <Switch>
        <Route path="/edit" component = {Edit} />
        <Route path="/add" component = {Add} />
        <Route exact={true} path="/" render={()=><Home users = {[{_id:12,name:"Jiawen Sun",sex:"male"}]} /> } /> 
        {/* <Route exact={true} path="/" component={Home} />  */}
    </Switch>
     </BrowserRouter>
     
        )
    }
}

export default App;