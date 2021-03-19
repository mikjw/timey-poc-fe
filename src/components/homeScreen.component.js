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

  async componentDidMount() {
    await axios.get('http://localhost:5001/times')
    .then(response => {
      this.setState({ 
        times: response.data
      })
    })
    .catch((error) => {
      console.log(error);
    })
    
    await axios.get('http://localhost:5001/workspaces')
    .then(response => {
      this.setState({ 
        workspaces: response.data
      })
    })
    .catch((error) => {
      console.log(error);
    })
  }

  getTimesForWorkspace(id) {
    let times = [];
    this.state.times.forEach(time => {
      if (time.workspace === id) {
        times.push(time);
      }
    })
    return times;
  }

  listWorkspaces() { 
    return this.state.workspaces.map(el => {
      return <div className='Homescreen-workspace-container'>
        <Workspace name={el.name} times={this.getTimesForWorkspace(el._id)} id={el._id} key={el._id}/></div>
    })
  }

  render() {
    return (
      <div className="Homescreen">
        <div>
          {this.listWorkspaces()}
        </div>
      </div>
    );
  }
}