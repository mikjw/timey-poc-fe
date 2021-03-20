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
      newTimer: ""
    }
    this.onChangeTimerTitle = this.onChangeTimerTitle.bind(this);
    this.deleteTimer = this.deleteTimer.bind(this);
  }

  onChangeTimerTitle(e) {
    this.setState({newTimer: e.target.value});
  }

  async createTimer() {
    let id = "";
    const currentUserId = localStorage.getItem("userId");
    await axios.post('http://localhost:5001/times/add', {
      withCredentials: true,
      title: this.state.newTimer,
      seconds: 0,
      workspace: this.state.id,
      user: currentUserId
    })
    .then(res => {
      id = res.data;
    })
    
    await axios.get(`http://localhost:5001/times/${id}`)
    .then(res => {
      const time = res.data;
      this.setState({ 
        times: [...this.state.times, time], 
        newTimer: ""
      })
    })
    .catch(err => {
      console.log(err);
    })

    this.setState({
      newTimer: ""
    })
  }

  deleteTimer(id) {
    axios.delete(`http://localhost:5001/times/${id}`, {
      withCredentials: true,
    })
    .then(res => {    
      this.setState(prevState => { 
        let newTimes = prevState.times.filter(time => time._id !== id);
        return {times: newTimes}
      })
    });
  }
    
  listTimes() {
    return this.state.times.map(el => {
      return <Time title={el.title} seconds={el.seconds} deleteTimer ={this.deleteTimer} id={el._id} key={el._id}/>;
    })
  }
 
  render() {
    return (
      <div>
        <div className='Workspace-name'>
          {this.state.name}
        </div>
        <div className='Time-list-container'>
        {this.listTimes()}
        </div>
        <div>
        <input class="New-timer-form" type="text" name="Title" value={this.state.newTimer} placeholder="New timer title..." onChange={this.onChangeTimerTitle} />
          <button className='New-timer-button' onClick={() => {this.createTimer()}}>+</button>
        </div>
      </div>
    );
  }
}
