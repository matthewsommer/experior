import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";
import NumberContext from "./context";

function Counter(props) {
  return (
    //by using consumer we are using value in our component.
    // we need to use a function to get our value
    <NumberContext.Consumer>{val => <h1>{val} 💪</h1>}</NumberContext.Consumer>
  );
}

class App extends Component {
  state = {
    number: 0
  };

  onIncHandler = () => {
    this.setState({
      number: this.state.number + 1
    });
  };

  onDecHandler = () => {
    this.setState({
      number: this.state.number - 1
    });
  };
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">React Context APi v16.3.1</h1>
        </header>

        {/* by using provider we are providing value to the counter component */}
        <NumberContext.Provider value={this.state.number}>
          <Counter />
        </NumberContext.Provider>

        <button onClick={this.onIncHandler} className="btn">
          Increment
        </button>
        <button onClick={this.onDecHandler} className="btn">
          Decrement
        </button>
      </div>
    );
  }
}
export default App;