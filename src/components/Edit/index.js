import React,{Component} from "react";
import {Form,Button} from 'react-bootstrap';
import {Link } from 'react-router-dom';
import image from '../../default-image/image';
import { getValidManager } from "../../actions/actions";
import { connect } from "react-redux";
import axios from 'axios';
const getPhoto = file => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
    reader.readAsDataURL(file);
  });
};
class Edit  extends Component{
    constructor(props){
        super(props);
        this.state = {
          ...props.location.state,
          oldManager:props.location.state.managerId,
          oldManagerName:props.location.state.managerName
          
    }
  }

  componentDidMount(){
    //console.log(this.props.location.state._id+ "  dddddddddd");
    this.props.getManager(this.state._id);

  }
  handlePhotoChange = e => {
    if (e.target.value) {
      let file = e.target.files[0];
      getPhoto(file).then(base64 => {
        this.setState({ photo: base64 });
      });
    }
  };
  handleNameChange = e => {
    this.setState({name: e.target.value});

  };
  handleTitleChange = e => {
    this.setState({title: e.target.value});

  };
  handleOfficePhoneChange = e => {
    this.setState({officePhone:e.target.value});

  };
  handleCellPhoneChange = e => {
    this.setState({cellPhone:e.target.value});

  };
  handleSMSChange = e => {
    this.setState({sms:e.target.value});

  };
  handleEmailChange = e => {
    this.setState({email:e.target.value});

  };
  handleDateChange = e => {
    console.log(e.target.value);
    this.setState({startDate: e.target.value});

  };
  handleManagerChange = e => {
    this.setState({managerId:e.target.value,managerName:e.target.options[e.target.selectedIndex].text});
    //console.log("e.target.value :"+e.target.value);
  };
  handleSexChange = (e) => {
      this.setState({sex: e.target.value})
    }
    handleSubmit = e => {
      e.preventDefault();
      const {dispatch} = this.props;
      console.log(this.state);
      axios(
        {
          method:'put',
          url:`http://localhost:8888/api/employees/${this.state._id}`,
          data:{...this.state}
        }
      )
      .then(response=>{
        this.props.history.push('/');
      })
      .catch(err=>{
            alert(err);
      }) 

    };
    render(){
      let warning ={color:"red"};
      const {manager} = this.props;
      let managerUI;
      if(manager.isFetching){
        console.log("is Fetching")
        managerUI = <p>Manager:Fetching</p> 

      }
      else if(manager.err){

        console.log("Fetching err")
        managerUI = <Form.Group controlId="manager">
        <Form.Label>Manager Fetching err:</Form.Label>
        <select onChange={this.handleManagerChange}>
      <option value ={null}>none</option>
      </select>
      </Form.Group>
      }
      else if(manager.data.length>0){

        console.log("Fetching success")
        managerUI = <Form.Group controlId="manager">
        <Form.Label>Manager:</Form.Label>
        <select onChange={this.handleManagerChange}>
        {this.state.oldManager&&
        <option value ={this.state.oldManager} selected>{this.state.oldManagerName}</option>
        }
        :<option value ={null} >none</option>
    {
      manager.data.sort((a,b)=>{
     return a.name.localeCompare(b.name);
      }).map( m=>{
        if(m._id !== this.state.oldManager)
  return <option key ={m._id} value ={m._id}>{m.name}</option>
} )
     }
      </select>
      </Form.Group>
      }

      else{
        managerUI = <Form.Group controlId="manager">
        <Form.Label>Manager:</Form.Label>
        <select onChange={this.handleManagerChange}>
      <option value ={null}>none</option>
    {
//       this.props.manager.data.map( m=>{
//   return <option key ={m._id} value ={m._id}>{m.name}</option>
// } )
console.log(this.props.manager)
     }
      </select>
      </Form.Group>
      }
return(
<Form onSubmit = {this.handleSubmit} style={{width:200,margin:"20px auto"}}>
<Form.Group controlId="photo">
    {this.state.photo == null ? (
              <img height="160px" alt="default avatar" src={image} />
            ) : (
              <img height="160px" alt="avatar" src={this.state.photo} />
            )}
              <Form.Control
                type="file"
                accept=".jpg, .jpeg, .png"
                onChange={this.handlePhotoChange}
              />
<Form.Label>Upload photo</Form.Label>
  </Form.Group>
<Form.Group controlId="name">
    <Form.Label>Name:</Form.Label>
    <Form.Control type="name" placeholder={this.state.name} onChange={this.handleNameChange}/>
    {!/^[A-Za-z]+([\ A-Za-z]+)*/.test(this.state.name)
    && this.state.name
      &&(<p style={warning}>invalid name </p>)}
  </Form.Group>
  <Form.Group controlId="title">
    <Form.Label>Title</Form.Label>
    <Form.Control type="title" placeholder={this.state.title} onChange={this.handleTitleChange}/>
    {!/^[a-zA-Z]+$/.test(this.state.title)
    && this.state.title
      &&(<p style={warning}>invalid title </p>)}
  </Form.Group>
  <Form.Group controlId="sex">
    <Form.Label inline="true">sex:</Form.Label>
    <Form.Check inline="true" label="male" type="radio" 
          value="male"
          checked={this.state.sex === 'male'}
            onChange={(e) => this.handleSexChange(e)} />
    <Form.Check inline='true' label="female" type="radio"
             value="female"
             checked={this.state.sex === 'female'}
               onChange={(e) => this.handleSexChange(e)}/>
  </Form.Group>
  <Form.Group controlId="startDate">
    <Form.Label>Start Date</Form.Label>
    <Form.Control type="date" placeholder={this.state.startDate} onChange={this.handleDateChange}/>
  </Form.Group>
  <Form.Group controlId="officePhone">
    <Form.Label>Office Phone</Form.Label>
    <Form.Control type="officePhone" placeholder={this.state.officePhone} onChange={this.handleOfficePhoneChange}/>
    {!/^\d{10}$/.test(this.state.officePhone)
    &&this.state.officePhone
      &&(<p style={warning}>invalid office phone:please input 10 digits number</p>)}
  </Form.Group>
  <Form.Group controlId="cellPhone">
    <Form.Label>Cell Phone</Form.Label>
    <Form.Control type="title" placeholder={this.state.cellPhone} onChange={this.handleCellPhoneChange}/>
    {!/^\d{10}$/.test(this.state.cellPhone)
    &&this.state.cellPhone
      &&(<p style={warning}>invalid cell phone:please input 10 digits number</p>)}
  </Form.Group>
  <Form.Group controlId="sms">
    <Form.Label>SMS</Form.Label>
    <Form.Control type="sms" placeholder={this.state.sms} onChange={this.handleSMSChange}/>
    {!/^\d{10}$/.test(this.state.sms)
    &&this.state.sms
      &&(<p style={warning}>invalid sms:please input 10 digits number</p>)}
  </Form.Group>
  <Form.Group controlId="email">
    <Form.Label>Email:</Form.Label>
    <Form.Control type="email" placeholder={this.state.email} onChange={this.handleEmailChange} />
    {!/^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/.test(this.state.email)
    && this.state.email&&
    (<p style={warning}>invalid email:please input valid email</p>)}
  </Form.Group>
{managerUI}
  <Link to ="/">
  <Button variant="secondary">
    Back
  </Button>
  </Link>
  <Button variant="primary" type="submit"
    disabled={
      !/^\d{10}$/.test(this.state.sms)||
      !/^\d{10}$/.test(this.state.officePhone)||
      !/^\d{10}$/.test(this.state.cellPhone)||
      !/^[A-Za-z]+([\ A-Za-z]+)*$/.test(this.state.name)||
      !/^[a-zA-Z]+$/.test(this.state.title)||
      !/^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/.test(this.state.email)||
      !/^(male|female)$/.test(this.state.sex.toLocaleLowerCase())||
         !this.state.name||
        !this.state.sex||
        !this.state.title||
        !this.state.startDate||
        !this.state.officePhone||
        !this.state.cellPhone||
        !this.state.sms||
        !this.state.email
    }>
    Submit
  </Button>

</Form>
        )


    }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getManager:(id)=>    
          dispatch(getValidManager(id))
  }
};
const mapStateToProps =(state) =>{

  return {manager : state.manager}

}


export default connect(mapStateToProps,mapDispatchToProps)( Edit);
