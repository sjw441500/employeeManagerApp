import React,{Component}from 'react';
import{Button,Col,Row} from 'react-bootstrap';
import image from '../../default-image/image'
import {Link,withRouter} from 'react-router-dom';

const Info 
= ({_id,deleteOnClick,
    managerOnClick,drOnClick,
    photo,name,title,sex,startDate,officePhone,cellPhone,
    sms,email,managerName,managerId,reportList,numberDR})=>
    {
    var editPath = {
        pathname:'/edit',
        state:{_id,photo,name,title,sex,startDate,officePhone,cellPhone,sms,email,managerId,managerName,numberDR,reportList}
      }
    return(
        <Row style={{height:80}} >
        <Col> {!photo ? (
        <img  src={image} alt="default avatar" className="show-img" />
      ) : (
        <img src={photo} alt="avatar"className="show-img" />
      )} </Col>
      
            <Col md={1}>{name}</Col>
            <Col  md={1}>{title} </Col>
            <Col  md={1}>{sex}   </Col>
            <Col md={1}>{startDate}</Col>
            <Col md={1}><a href={`tel:${officePhone}`}>{officePhone} </a>  </Col>
            <Col  md={1} >   <a href={`tel:${cellPhone}`}>{cellPhone}  </a>   </Col>
            <Col md={1} >{sms}  </Col>
            <Col  ><a href={`mailto:${email}`}>{email}</a></Col>
            <Col > <a href="javascript:void(0);"  onClick={()=>managerOnClick(managerId)} >{managerName}</a> </Col>
            {(numberDR>0)?
              <Col> 
              <a href="javascript:void(0);" onClick={()=>drOnClick(reportList)}> {numberDR}
               </a>
               </Col>
              :
            <Col > {numberDR}</Col>
            }
            <Col  ><Link to ={editPath} ><Button>Edit</Button> </Link></Col>
            <Col>             
            <Button variant="outline-dark" onClick = {()=>deleteOnClick(_id)}><i className="fas fa-trash-alt">Delete</i></Button>
            </Col>
        </Row>       
    )
      }

export default Info;