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
            <p>{i}: {taskData.summary}</p>
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
        totalCount
        pageInfo {
          hasNextPage
        }
        edges {
          node {
            id
            summary
          }
        }
      }
    }
  `;