import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';
import axios from 'axios';
import Crud from './Crud';

class Login extends Component {
constructor(props){
  super(props);
  this.state={
    username:'',
    password:''
    }
 }
 handleClick(event){
    var self = this;
    var payload = {
      "username": this.state.username,
      "password": this.state.password
    }

    axios.get('/api/get-login-data/' + this.state.username )
    .then(function (response) {
      console.log(JSON.stringify(response));
      if (response.status == 200) {
        console.log("Login successfull");
       var loginscreen=[];
       var loginmessage='';
       var display='none';
       var crud=[];
       crud.push(<Crud parentContext={this} />);
       self.props.parentContext.setState({crud:crud});
       self.props.parentContext.setState({loginscreen:loginscreen});
       self.props.parentContext.setState({loginmessage:loginmessage});
       self.props.parentContext.setState({display:display});
      }
      else if (response.status == 204){
        console.log("Username password do not match");
          alert("username password do not match")
      }
      else {
        console.log("Username does not exists");
          alert("Username does not exist");
      }
    })
    .catch(function (error) {
    console.log(error);
    });
 }
render() {
    return (
      <div>
        <MuiThemeProvider>
          <div>
          <AppBar
             title="Login"
           />
           <TextField
             hintText="Enter your Username"
             floatingLabelText="Username"
             onChange = {(event,newValue) => this.setState({username:newValue})}
             />
           <br/>
             <TextField
               type="password"
               hintText="Enter your Password"
               floatingLabelText="Password"
               onChange = {(event,newValue) => this.setState({password:newValue})}
               />
             <br/>
             <RaisedButton label="Submit" primary={true} style={style} onClick={(event) => this.handleClick(event)}/>
         </div>
         </MuiThemeProvider>
      </div>
    );
  }
}
const style = {
 margin: 15,
};
export default Login;