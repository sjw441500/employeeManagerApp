import React, {Component} from 'react';
import Info from '../Info';
import {Row,Col,Container} from 'react-bootstrap';
import {getEmployees,getManagerDetail,getReportsDetail, getInitialData, getSort} from '../../actions/actions';
import {connect} from "react-redux";
import axios from 'axios';
import InfiniteScroll from "react-infinite-scroll-component";
import { resolve } from 'url';
// import InfiniteScroll from 'react-infinite-scroller';
class List extends Component
//({users,editOnClick,deleteOnClick}) =>
 {
  constructor(props){
    super(props);
    this.state={data:this.props.data,curPage:1,itemPerPage:9,hasMore:true};
    this.managerOnClick.bind(this);
    console.log(this.state.data);
    this.drOnClick.bind(this);
    this.sortOnClick.bind(this);
  }

  componentDidUpdate(prevProps,prevState){
    if(prevProps.sortBy!==this.props.sortBy|| prevProps.order!==this.props.order){
      const {dispatch} = this.props;
      console.log("componentdidupdate",this.props.sortBy,this.props.order);
dispatch(getInitialData(this.state.itemPerPage,this.props.sortBy,this.props.order));
    }
  }


  fetchMoreData=()=>{
    this.setState({curPage:this.state.curPage+1});
    axios(
      {method:'get',
        url:`http://localhost:8888/api/employees/getMore/${this.state.curPage}/${this.state.itemPerPage}/${this.props.sortBy}/${this.props.order}`,
      }
    ).then(response =>{

      // console.log("getMore Data success!" + JSON.stringify(response))
      if(response.data.length>0)
      this.setState({data:this.state.data.concat(response.data)});
      else{
        this.setState({hasMore:false})

      }
    }).catch(e=>{
      console.log("getMore Data Err!")
      this.setState({curPage:this.state.curPage-1});
      alert(e);
    })
  }
  

 managerOnClick=(id)=>{
  this.setState({hasMore:false});
   const {dispatch} = this.props;
   dispatch(getManagerDetail(id));

  }

  // shouldComponentUpdate(nextProps, nextState){
  //   const {dispatch} = this.props;
  //   if(this.props.sort.sortBy!==nextProps.sort.sortBy|| this.props.sort.order!==nextProps.sort.order)
  //   dispatch(getInitialData(this.state.itemPerPage,nextProps.sort.sortBy,nextProps.sort.order));
  // }
sortOnClick=(sortBy)=>{
const {dispatch} = this.props;
dispatch(getSort(sortBy));


}
  drOnClick=(list)=>{
    
    const {dispatch} = this.props;
    dispatch(getReportsDetail(list));
  }
   render(){
 return(
  <div style={{width:"100%"}}>
   <Row>

          <Col ></Col>
          <Col style={{cursor:'pointer'}} md={1} onClick={()=>{this.sortOnClick("name")}} > 
          Name
          {this.props.sortBy==="name"&&(this.props.order==='ascending'?<i class="fas fa-angle-double-up"></i>:
          <i class="fas fa-angle-double-down"></i>)}
          </Col>
          <Col style={{cursor:'pointer'}} md={1}   onClick={()=>{this.sortOnClick("title")}}>
          Title  
          {this.props.sortBy==="title"&&(this.props.order==='ascending'?<i class="fas fa-angle-double-up"></i>:
          <i class="fas fa-angle-double-down"></i>)}
          </Col>
          <Col style={{cursor:'pointer'}}   onClick={()=>{this.sortOnClick("sex")}}>
          Sex
          {this.props.sortBy==="sex"&&(this.props.order==='ascending'?<i class="fas fa-angle-double-up"></i>:
          <i class="fas fa-angle-double-down"></i>)}
          </Col>
          <Col style={{cursor:'pointer'}}md={1}   onClick={()=>{this.sortOnClick("startDate")}}>
          
          Start Date
          {this.props.sortBy==="startDate"&&(this.props.order==='ascending'?<i class="fas fa-angle-double-up"></i>:
          <i class="fas fa-angle-double-down"></i>)}
          </Col>
          <Col style={{cursor:'pointer'}} md={1}  onClick={()=>{this.sortOnClick("officePhone")}}>Office Phone
          {this.props.sortBy==="officePhone"&&(this.props.order==='ascending'?<i class="fas fa-angle-double-up"></i>:
          <i class="fas fa-angle-double-down"></i>)}</Col>
          <Col style={{cursor:'pointer'}}  md={1}   onClick={()=>{this.sortOnClick("cellPhone")}}>Cell Phone
          {this.props.sortBy==="cellPhone"&&(this.props.order==='ascending'?<i class="fas fa-angle-double-up"></i>:
          <i class="fas fa-angle-double-down"></i>)}</Col>
          <Col style={{cursor:'pointer'}}  md={1}  onClick={()=>{this.sortOnClick("sms")}}>SMS
          {this.props.sortBy==="sms"&&(this.props.order==='ascending'?<i class="fas fa-angle-double-up"></i>:
          <i class="fas fa-angle-double-down"></i>)}</Col>
          <Col style={{cursor:'pointer'}} md={1}  onClick={()=>{this.sortOnClick("email")}}>Email
          {this.props.sortBy==="email"&&(this.props.order==='ascending'?<i class="fas fa-angle-double-up"></i>:
          <i class="fas fa-angle-double-down"></i>)}</Col>
          <Col>Manager</Col>
          <Col># of DR</Col>
          <Col></Col>
          <Col></Col>

</Row>
       
    
      <InfiniteScroll
      dataLength={this.state.data.length}
      next={this.fetchMoreData}
      hasMore={this.state.hasMore}
      // loader={<h4>Loading...</h4>}
      >
          {
            this.state.data.length!==0?(
            this.state.data.map((user,index) => {
            return (
            <Info key={index}
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
            deleteOnClick={this.props.deleteOnClick}
            managerOnClick={this.managerOnClick}
            drOnClick={this.drOnClick}
            />
            );
            
          })
            ):<></>
          }

          </InfiniteScroll>

          

       </div>
  

 )
      
    }

      }
      

      const mapStateToProps = state => {
        return {
          show: state.show,
          data:state.show.data,
          sortBy:state.sort.sortBy,
          order:state.sort.order
        };
      };
      // const mapDispatchToProps = dispatch=>{
      //   return{
      //     managerOnClick:(_id)=>{
      //       dispatch(getManagerDetail(_id))
      //       ;
      //     }
      //   }

      // }
    export default connect(mapStateToProps)(List);