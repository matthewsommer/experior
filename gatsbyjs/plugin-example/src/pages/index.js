import React from 'react'
import Link from 'gatsby-link'
import GatsbyJiraSource from 'gatsby-jira-source'

const axios = require('axios');

const IndexPage = (props) => {
  const tasks = props.data.allTask.edges;

  return (
    <div>
      {tasks.map((task, i) => {
        const taskData = task.node;
        return (
          <div key={i}>
            <h4>{taskData.summary}</h4>
            <p>{taskData.author}</p>
            <p>{taskData.description}</p>
          </div>
        )
      })}
    </div>
  );
};

export default IndexPage

export const query = graphql`
    query TaskQuery {
      allTask {
        edges {
          node {
            id
            summary
            description
            project
            author
          }
        }
      }
    }
  `;