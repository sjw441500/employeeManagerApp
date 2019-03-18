import React,{Component}from 'react';
import{Button} from 'react-bootstrap';
import image from '../../default-image/image'
import {Link,withRouter} from 'react-router-dom';

const Info 
= ({_id,editOnClick,deleteOnClick,
    dialOnClick,emailOnClick,managerOnClick,drOnClick,
    photo,name,title,sex,startDate,officePhone,cellPhone,
    sms,email,managerName,managerId,reportList,numberDR})=>
    {
    var editPath = {
        pathname:'/edit',
        state:{_id,photo,name,title,sex,startDate,officePhone,cellPhone,sms,email,managerId,managerName,numberDR,reportList}
        // state:{...this.props}
      }
    return(
        <tr>
        <td > {!photo ? (
        <img  src={image} alt="default avatar" className="li-avatar" />
      ) : (
        <img src={photo} alt="avatar"className="li-avatar" />
      )} </td>
      
            <td>{name}  </td>
            <td>{title} </td>
            <td>{sex}   </td>
            <td>{startDate}</td>
            <td>
            <a href={`tel:${officePhone}`}>
            {officePhone}  </a>  </td>
            <td>   <a href={`tel:${cellPhone}`}>
            {cellPhone}  </a>   </td>
            <td>{sms}   </td>
            <td>
              <a href={`mailto:${email}`}>
              {email}
              </a></td>
            <td>{managerName}   </td>
            <td>{numberDR}   </td>
            <td>
            <Link to ={editPath} >
            <Button>Edit</Button>
            </Link>
        
            </td>
            <td>             
            <Button variant="outline-dark" onClick = {()=>deleteOnClick(_id)}><i className="fas fa-trash-alt">Delete</i></Button>
            </td>
        </tr>       
    )
      }

export default Info;