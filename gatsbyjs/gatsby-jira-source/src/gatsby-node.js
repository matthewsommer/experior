exports.sourceNodes = async ({ boundActionCreators }) => {
    const { createNode } = boundActionCreators;
    // Create nodes here, generally by downloading data
    // from a remote API.
    const data = await fetch(
      axios.get('https://tasks.mattsommer.io/reading')
        .then(response => console.log(response.data.length)
        ));
  
    // Process data into nodes.
    data.forEach(datum => createNode(processDatum(datum)));
  
    // We're done, return.
    return;
  };