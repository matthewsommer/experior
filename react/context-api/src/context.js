import React from "react";

const state = {
  number: 0
};

const NumberContext = React.createContext(state.number); //passing initial value



export default NumberContext;