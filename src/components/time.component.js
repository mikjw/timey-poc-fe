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


/**
 * Begin incrementing seconds and store start value 
 */

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


  /**
   * Get difference from start value and add to seconds   
   */

  updateSeconds() {
    let secondsSinceStart = Math.round(Date.now() / 1000) - this.state.startTime;
    let updatedSeconds = this.state.initialSeconds + secondsSinceStart;
    this.setState({
      seconds: updatedSeconds
    })
    if (updatedSeconds % 5 === 0) {this.persistSeconds()}
  }


  /**
   * Stop incrementing and save seconds 
   */

  stopTimer() {
    if (this.state.counting === true) {
      clearInterval(this.interval);
      this.persistSeconds();
      this.setState({
        counting: false
      })
    }
  }


  /**
   * Send updated seconds to back end 
   */

  persistSeconds() {
    axios.post(`${process.env.REACT_APP_TIMEY_API_BASE_URL}/times/update/${this.state.id}`, {
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
        <div className={dotClass}></div>
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