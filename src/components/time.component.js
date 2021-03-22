import './time.component.css';
import React, { Component } from 'react';
import axios from 'axios';
export default class Time extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: this.props.id,
      title: this.props.title,
      seconds: this.props.seconds,
      startTime: null,
      initialSeconds: null, 
      counting: false,
      deleteTimer: this.props.deleteTimer
    }
    this.updateSeconds=this.updateSeconds.bind(this);
  }

  startTimer() {
    if (this.state.counting === false) {
      this.setState({
        initialSeconds: this.state.seconds,
        startTime: Math.round(Date.now() / 1000), 
        counting: true
      })
      this.interval = setInterval(this.updateSeconds, 1000);
    }
  }

  updateSeconds() {
    let secondsSinceStart = Math.round(Date.now() / 1000) - this.state.startTime;
    let updatedSeconds = this.state.initialSeconds + secondsSinceStart;
    this.setState({
      seconds: updatedSeconds
    })
    if (updatedSeconds % 5 === 0) {this.persistSeconds()}
  }

  stopTimer() {
    if (this.state.counting === true) {
      clearInterval(this.interval);
      this.persistSeconds();
      this.setState({
        counting: false
      })
    }
  }

  persistSeconds() {
    axios.post(`http://localhost:5001/times/update/${this.state.id}`, {
      withCredentials: true,
      title: this.state.title,
      seconds: this.state.seconds, 
      user: localStorage.getItem('userId')
    })
    .catch(err => {
      console.error(err);
    });
  }

  render() {
    let hours = ('0' + (Math.floor(this.state.seconds / 3600) % 60)).slice(-2);
    let minutes = ('0' + (Math.floor(this.state.seconds / 60) % 60)).slice(-2);
    let seconds = ('0' + (this.state.seconds % 60)).slice(-2);
    let dotClass = 'Dot ';
    this.state.counting ? dotClass += 'Counting' : dotClass += 'Not-counting';
    return (
      <div className='Time-container'>
        <div class={dotClass}></div>
        <p className='Time-title'>
          {this.state.title} 
        </p>
        <p className='Time-display'>
          {hours}:{minutes}:{seconds}
        </p>
        <div className='Button-container'>
          <button className='Time-button' onClick={() => {this.startTimer()}}>start</button>
          <button className='Time-button' onClick={() => {this.stopTimer()}}>stop</button>
        </div>
        <button className='Delete-timer-button' onClick={() => {this.props.deleteTimer(this.state.id)}}>x</button>
      </div>
    );
  }
}