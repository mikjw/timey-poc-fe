import './homeScreen.component.css';
import React, { Component } from 'react';
import axios from 'axios';
import Workspace from './workspace.component'

export default class HomeScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      workspaces: [],
      times: []
    }
  }

  
  /**
   * Fetch time and workspace records for user and add to state
   */

  async componentDidMount() {
    const currentUserId = localStorage.getItem("userId");
    await axios.get(`${process.env.REACT_APP_TIMEY_API_BASE_URL}/times/user/${currentUserId}`, {
      
    })
    .then(response => {
      this.setState({ 
        times: response.data
      })
    })
    .catch((error) => {
      console.log(error);
    })
    
    await axios.get(`${process.env.REACT_APP_TIMEY_API_BASE_URL}/workspaces`)
    .then(response => {
      this.setState({ 
        workspaces: response.data
      })
    })
    .catch((error) => {
      console.log(error);
    })
  }


  /**
   * Get times associated with a given record param
   */

  getTimesForWorkspace(id) {
    return this.state.times.filter(time => time.workspace === id);
  }


  /**
   * Iterate through workspaces and return a Workspace component for each
   */

  listWorkspaces() { 
    return this.state.workspaces.map(el => {
      return <div className='Homescreen-workspace-container'>
        <Workspace name={el.name} times={this.getTimesForWorkspace(el._id)} id={el._id} key={el._id}/></div>
    })
  }

  render() {
    return (
      <div className='Homescreen'>
        <div>
          {this.listWorkspaces()}
        </div>
      </div>
    );
  }
}
