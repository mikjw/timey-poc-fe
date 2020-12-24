import React, { Component } from 'react';

export default class Time extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: this.props.title,
      seconds: this.props.seconds,
      startTime: null
    }
    this.updateSeconds=this.updateSeconds.bind(this);
  }

  // componentDidMount() {
  //   this.startTime()
  // }

  startTime() {
    this.setState({
      startTime: new Date()
    })
    this.interval = setInterval(this.updateSeconds, 1000);
  }

  updateSeconds() {
    let date = new Date()
    let updatedSeconds = Math.round(date.getTime() / 1000) - Math.round(this.state.startTime.getTime() / 1000);
    this.setState({
      seconds: updatedSeconds
    })
  }

  stopTime() {
    clearInterval(this.interval);
  }

  render() {
    return (
      <div>
        <h3>
          {this.state.title} : {this.state.seconds}
        </h3>
        <button onClick={() => { this.startTime() }}>start</button>
        <button onClick={() => { this.stopTime() }}>stop</button>
      </div>
    );
  }
}