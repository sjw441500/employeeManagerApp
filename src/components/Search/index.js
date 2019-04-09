import React ,{Component} from 'react';
import {connect} from "react-redux";
import {getSearch} from '../../actions/actions';
class Search  extends Component{
constructor(props){
     super(props);
    this.state={searchInput:""};
}
    handleSearchChange = e => {
        this.setState({searchInput:e.target.value});
        this.props.search(e.target.value);
      };
    render(){
        return (
            <div>
                Search:<input type = "text" onChange={this.handleSearchChange}></input>
                </div>
        )    
    }
}

const mapStateToProps = state => {
    return {
    };
  };
  const mapDispatchToProps = dispatch=>{
    return{
      search:(content)=>{
        dispatch(getSearch(content))
        ;
      }
    }

  }

export default connect(mapStateToProps,mapDispatchToProps)(Search);