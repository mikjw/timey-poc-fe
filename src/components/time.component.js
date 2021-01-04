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
      counting: false
    }
    this.updateSeconds=this.updateSeconds.bind(this);
    this.startTimer=this.startTimer.bind(this);
  }

  componentDidMount() {
    console.log(this.props.id)
    console.log(this.state.id)
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
    let updatedSeconds = this.state.initialSeconds + secondsSinceStart
    this.setState({
      seconds: updatedSeconds
    })
    if (updatedSeconds % 5 === 0) {this.persistSeconds()}
  }

  stopTime() {
    if (this.state.counting === true) {
      clearInterval(this.interval);
      this.persistSeconds();
      this.setState({
        counting: false
      })
    }
  }

  persistSeconds() {
    const time = {
      title: this.state.title,
      seconds: this.state.seconds
    }
    axios.post('http://localhost:5001/times/update/' + this.state.id, time)
    .then(res => console.log(res.data));
  }

  render() {
    let hours = ('0' + (Math.floor(this.state.seconds / 3600) % 60)).slice(-2)
    let minutes = ('0' + (Math.floor(this.state.seconds / 60) % 60)).slice(-2)
    let seconds = ('0' + (this.state.seconds % 60)).slice(-2)
    return (
      <div>
        <h3>
          {this.state.title}  {hours}:{minutes}:{seconds}
        </h3>
        <button onClick={() => {this.startTimer()}}>start</button>
        <button onClick={() => {this.stopTime()}}>stop</button>
      </div>
    );
  }
}