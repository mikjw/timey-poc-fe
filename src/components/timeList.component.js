import React, { Component } from 'react';
import axios from 'axios';
import Time from './time.component';

export default class TimeList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      times: []
    }
  }

  componentDidMount() {
    axios.get('http://localhost:5001/times')
      .then(response => {
        this.setState({ 
          times: response.data
        })
      })
      .catch((error) => {
        console.log(error);
      })
  }

  listTimes() {
    return this.state.times.map(el => {
      console.log(el);
      return <Time title={el.title} seconds={el.seconds} key={el._id}/>;
    })
  }

  render() {
    return (
      <div>
        <h1>
          {this.listTimes()};
        </h1>
      </div>
    );
  }
}