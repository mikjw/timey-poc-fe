import React, { Component } from 'react';

export default class Time extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: this.props.title,
      seconds: this.props.seconds,
      startTime: null
    }
    this.updateTime=this.updateTime.bind(this);
  }



  componentDidMount() {
    this.startTime()
  }

  startTime() {
    this.setState({
      startTime: new Date()
    })
    setInterval(this.updateTime, 1000);
  }

  updateTime() {
    let date = new Date()
    console.log(date.getSeconds());
    // console.log("state: " + this.state.title);
    console.log(this.state.startTime.getSeconds());
    let updatedSeconds = date.getSeconds() - this.state.startTime.getSeconds();
    this.setState({
      seconds: updatedSeconds
    })
  }

  render() {
    return (
      <div>
        <h3>
          {this.state.title} : {this.state.seconds}
        </h3>
      </div>
    );
  }
}