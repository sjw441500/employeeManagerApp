import React,{Component} from "react";
import {Form,Button} from 'react-bootstrap';
import {Link,Redirect} from 'react-router-dom';
import image from '../../default-image/image';
import{getEmployees} from '../../actions/actions';
import {connect} from 'react-redux';
import axios from 'axios';
const getPhoto = file => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
    reader.readAsDataURL(file);
  });
};
class Add extends Component{
    constructor(props){
        super(props);
        this.state = {
          photo:null,
          name:"",
          title:"",
          sex:"male",
          startDate:"",
          officePhone:"",
          cellPhone:"",
          sms:"",
          email:"",
          managerId:null,
          managerName:"",
    }
  }
  componentDidMount(){
    this.props.getManager();
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
  handleDateChange = e => {
    this.setState({startDate: e.target.value});

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
  handleManagerChange = e => {
    this.setState({managerId:e.target.value,managerName:e.target.options[e.target.selectedIndex].text});
    console.log(this.state.managerName+"  this is manager name");

  };
    handleSexChange = (e) => {
      this.setState({sex: e.target.value});
    };
    handleSubmit = e => {
        e.preventDefault();
        const {dispatch} = this.props;
        axios(
          {
            method:'post',
            url:'http://localhost:8888/api/employees',
            data:{...this.state}
          }
        )
        .then(response=>{
          //dispatch(addSuccess()) 
          this.props.history.push('/');
        })
        .catch(err=>{
          // dispatch(addtFail(err));
              alert(err);
        }) 

      };
    render(){
return(
<Form onSubmit = {this.handleSubmit} style={{width:200}}>
<Form.Group controlId="photo">
    {this.state.photo === null ? (
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
    <Form.Control type="name" placeholder="name" onChange={this.handleNameChange}/>
  </Form.Group>
  <Form.Group controlId="title">
    <Form.Label>Title</Form.Label>
    <Form.Control type="title" placeholder="title" onChange={this.handleTitleChange}/>
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
    <Form.Control type="date" placeholder="date" onChange={this.handleDateChange}/>
  </Form.Group>
  <Form.Group controlId="officePhone">
    <Form.Label>Office Phone</Form.Label>
    <Form.Control type="officePhone" placeholder="office Phone" onChange={this.handleOfficePhoneChange} />
  </Form.Group>
  <Form.Group controlId="cellPhone">
    <Form.Label>Cell Phone</Form.Label>
    <Form.Control type="title" placeholder="cell Phone" onChange={this.handleCellPhoneChange}/>
  </Form.Group>
  <Form.Group controlId="sms">
    <Form.Label>SMS</Form.Label>
    <Form.Control type="sms" placeholder="SMS"onChange={this.handleSMSChange} />
  </Form.Group>
  <Form.Group controlId="email">
    <Form.Label>Email:</Form.Label>
    <Form.Control type="email" placeholder="Email" onChange={this.handleEmailChange}/>
  </Form.Group>
  <Form.Group controlId="manager">
    <Form.Label>Manager:</Form.Label>
<select onChange={this.handleManagerChange}>
<option value ={null}>None</option>
{
  this.props.all.map( manager=>{
  return <option key ={manager._id} value ={manager._id}>{manager.name}</option>
} )
}
  
  
  </select>
  </Form.Group>
  <Link to ="/">
  <Button variant="secondary">
    Back
  </Button>
  </Link>
  <Button variant="primary" type="submit">
    Submit
  </Button>
</Form>

 // )
        )
    }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getManager:()=>    
          dispatch(getEmployees()) 
  }
};
const mapStateToProps =(state) =>{

  return {all : state.show.data}

}


export default connect(mapStateToProps,mapDispatchToProps)(Add);