import React, {Component} from 'react';
import Info from '../Info';
import {Table} from 'react-bootstrap';
import {getEmployees} from '../../actions/actions';
import {connect} from "react-redux";
import axios from 'axios';
class List extends Component
//({users,editOnClick,deleteOnClick}) =>
 {
  constructor(props){
    super(props);
    //this.state={switch:true};
    this.deleteOnClick.bind(this);
  }
  componentDidMount() {
    this.props.getShowData();
  }
  deleteOnClick = (id)=>{
    axios(
        {method:'delete',
        url:`http://localhost:8888/api/employees/${id}`,
    }).then(
      this.props.getShowData
    ).then(
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
      usersUI =(
        <Table striped bordered hover >
        <thead>
        <tr>
          <th></th>
          <th>Name</th>
          <th>Title</th>
          <th>Sex</th>
          <th>Start Date</th>
          <th>Office Phone</th>
          <th>Cell Phone</th>
          <th>SMS</th>
          <th>Email</th>
          <th>Manager</th>
          <th># of DR</th>
          <th></th>
          <th></th>
        </tr>
        </thead>
    <tbody>
          {
            show.data.length!==0?(
            show.data.map(user => {
            return (
            <Info key={user._id}
            _id = {user._id}
            name = {user.name} 
            sex= {user.sex}
            photo={user.photo}
            title ={user.title}
            startDate={user.startDate}
            officePhone={user.officePhone}
            cellPhone={user.cellPhone}
            sms={user.sms}
            email={user.email}
            managerId={user.managerId}
            managerName={user.managerName}
            numberDR ={user.reportList.length}
            reportList={user.reportList}
            deleteOnClick={this.deleteOnClick}
            />
            );
            
          })
            ):<></>
          }
    </tbody>
       </Table>  
      )
    }
    return(
       <div>
         {usersUI}
         </div>
      )
      }

      }
      

      const mapStateToProps = state => {
        return {
          show: state.show,
          data:state.show.data
        };
      };
      const mapDispatchToProps = dispatch=>{
        return{
          getShowData:()=>dispatch(getEmployees())
        }

      }
    export default connect(mapStateToProps,mapDispatchToProps)(List);