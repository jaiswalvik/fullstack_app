// /client/App.js
import React, { Component } from "react";
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';
import MUIDataTable from "react-mui-datatables";
import axios from "axios";

class Crud extends Component {
  // initialize our state 
  state = {
    data: [],
    id: 0,
    message: null,
    intervalIsSet: false,
    idToDelete: null,
    idToUpdate: null,
    objectToUpdate: null
  };

  // when component mounts, first thing it does is fetch all existing data in our db
  // then we incorporate a polling logic so that we can easily see if our db has 
  // changed and implement those changes into our UI
  componentDidMount() {
    this.getDataFromDb();
    if (!this.state.intervalIsSet) {
      let interval = setInterval(this.getDataFromDb, 1000);
      this.setState({ intervalIsSet: interval });
    }
  }

  // never let a process live forever 
  // always kill a process everytime we are done using it
  componentWillUnmount() {
    if (this.state.intervalIsSet) {
      clearInterval(this.state.intervalIsSet);
      this.setState({ intervalIsSet: null });
    }
  }

  // just a note, here, in the front end, we use the id key of our data object 
  // in order to identify which we want to Update or delete.
  // for our back end, we use the object id assigned by MongoDB to modify 
  // data base entries

  // our first get method that uses our backend api to 
  // fetch data from our data base
  getDataFromDb = () => {
    fetch("/api/getData")
      .then(data => data.json())
      .then(res => this.setState({ data: res.data }));
  };

  // our put method that uses our backend api
  // to create new query into our data base
  putDataToDB = message => {
    let currentIds = this.state.data.map(data => data.id);
    let idToBeAdded = 0;
    while (currentIds.includes(idToBeAdded)) {
      ++idToBeAdded;
    }

    axios.post("/api/putData", {
      id: idToBeAdded,
      message: message
    });
  };


  // our delete method that uses our backend api 
  // to remove existing database information
  deleteFromDB = idTodelete => {
    let objIdToDelete = null;
    this.state.data.forEach(dat => {
      if (dat.id === idTodelete) {
        objIdToDelete = dat._id;
      }
    });

    axios.delete("/api/deleteData", {
      data: {
        id: objIdToDelete
      }
    });
  };


  // our update method that uses our backend api
  // to overwrite existing data base information
  updateDB = (idToUpdate, updateToApply) => {
    let objIdToUpdate = null;
    this.state.data.forEach(dat => {
      if (dat.id === idToUpdate) {
        objIdToUpdate = dat._id;
      }
    });

    axios.post("/api/updateData", {
      id: objIdToUpdate,
      update: { message: updateToApply }
    });
  };


  // here is our UI
  // it is easy to understand their functions when you 
  // see them render into our screen
  render() {
    const { data } = this.state;
    return (
      <div>
      <MuiThemeProvider>
        <div>
            <AppBar title="CRUD" />
        </div>
        <div>
        <MUIDataTable title={""} data={data.map(dat => dat)} columns={columns} options={options} />      
        </div>
        <div style={{ padding: "10px" }}>
            <TextField
             hintText="add something in the database"
             floatingLabelText="Message"
             onChange = {e => this.setState({ message: e.target.value })}
             />
             <RaisedButton label="ADD" primary={true} style={style} onClick={() => this.putDataToDB(this.state.message)}/>
        </div>
        <div style={{ padding: "10px" }}>
            <TextField
             hintText="put id of item to delete here"
             floatingLabelText="Id"
             onChange = {e => this.setState({ idToDelete: e.target.value })}
             />
             <RaisedButton label="DELETE" primary={true} style={style} onClick={() => this.deleteFromDB(this.state.idToDelete)}/>
        </div>
        <div style={{ padding: "10px" }}>
            <TextField
             hintText="id of item to update here"
             floatingLabelText="Id"
             onChange = {e => this.setState({idToUpdate: e.target.value })}
             />
             <TextField
             hintText="put new value of the item here"
             floatingLabelText="Id"
             onChange = {e => this.setState({updateToApply: e.target.value })}
             />
             <RaisedButton label="UPDATE" primary={true} style={style} onClick={() => this.updateDB(this.state.idToUpdate, this.state.updateToApply)}/>
        </div>
       </MuiThemeProvider>
      </div>
    );
  }
}
const style = {
 margin: 15,
};
const columns = [
            { 
                label: "Id", 
                key: "id", /* this value is the your array object key.if you did't add this table is not working */
                sort: true  /* you can set column sort true / false as your own */
            },
            { label: "Message", key: "message"},
        ]; /* <-- Table header columns. this is required */
 
 
        const options = {
            hasIndex: true, /* <-- use numbers for rows*/
            indexColumn: "_id" /* <-- add your data first unique column name for this like _id, i used fname because i don't have a _id field in my array */
        };

export default Crud;