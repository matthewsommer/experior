import React, { Component } from 'react';
import axios from 'axios'

class FetchExample extends React.Component {
  render() {
    axios.get('https://tasks.mattsommer.io/reading')
    .then(response => console.log(response.data.length));
    return <h1>Hello, {this.props.name}!</h1>;
  }
}

export default FetchExample;