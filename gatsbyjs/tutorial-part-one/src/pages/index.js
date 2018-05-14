import React from "react";
import Link from "gatsby-link";

export default () =>
  <div style={{ color: `tomato` }}>
    <h1>Hello Gatsby!</h1>
    <p>What a world.</p>
    <br />
    <div>
      <Link to="/epics">Link</Link>
    </div>
    <div>
      <Link to="/counter">Counter</Link>
    </div>
  </div>