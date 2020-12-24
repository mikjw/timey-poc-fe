import React, { Component } from 'react';

export default class Time extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: this.props.title,
      seconds: this.props.seconds
    }
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