import './workspace.component.css';
import React, { Component } from 'react';
import axios from 'axios';
import Time from './time.component';

export default class Workspace extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: this.props.id,
      name: this.props.name,
      times: this.props.times,
      newTimer: ''

    }
    this.onChangeTimerTitle = this.onChangeTimerTitle.bind(this);
    this.deleteTimer = this.deleteTimer.bind(this);
  }

  onChangeTimerTitle(e) {
    this.setState({newTimer: e.target.value});
  }


  /**
   * Create new timer, send to back end, then append to timers array 
   */

  async createTimer() {
    let id = '';
    await axios.post(`${process.env.REACT_APP_TIMEY_API_BASE_URL}/times/add`, {
      withCredentials: true,
      title: this.state.newTimer,
      seconds: 0,
      workspace: this.state.id,
      user: localStorage.getItem("userId")
    })
    .then(res => {
      id = res.data;
    })

    // Query to get new timer with all props
    axios.get(`${process.env.REACT_APP_TIMEY_API_BASE_URL}/times/${id}`)
    .then(res => {
      const time = res.data;
      this.setState({ 
        times: [...this.state.times, time], 
        newTimer: ''
      })
    })
    .catch(err => {
      console.log(err);
    })
  }


  /**
   * Delete timer from database and remove from timers array
   */

  deleteTimer(id) {
    axios.delete(`${process.env.REACT_APP_TIMEY_API_BASE_URL}/times/${id}`, {
      withCredentials: true,
    })
    .then(res => {    
      this.setState(prevState => { 
        let newTimes = prevState.times.filter(time => time._id !== id);
        return {times: newTimes}
      })
    });
  }

  
  /**
   * Return a timer component for each timer in array
   */
    
  listTimes() {
    return this.state.times.map(el => {
      return <Time title={el.title} seconds={el.seconds} deleteTimer ={this.deleteTimer} id={el._id} key={el._id}/>;
    })
  }
 
  render() {
    return (
      <div className='Workspace-container'>
        <div className='Workspace-name'>
          {this.state.name}
        </div>
        <div className='Time-list-container'>
          {this.listTimes()}
        </div>
        <div>
          <input className='New-timer-form' type='text' name='Title' value={this.state.newTimer} placeholder='New timer title...' onChange={this.onChangeTimerTitle} />
          <button className='New-timer-button' onClick={() => {this.createTimer()}}>+</button>
        </div>
      </div>
    );
  }
}
