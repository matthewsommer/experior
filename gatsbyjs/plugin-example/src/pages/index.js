import React from 'react'
import Link from 'gatsby-link'
import GatsbyJiraSource from 'gatsby-jira-source'

const axios = require('axios');

const IndexPage = (props) => {
  const tasks = props.data.allTask.edges;

  return (
    <div>
      {tasks.map((task, i) => {
        const taskNode = task.node;
        return (
          <div key={i}>
            <a href={taskNode.slug}><h4>{taskNode.summary}</h4></a>
            <p>{taskNode.author}</p>
            <p>{taskNode.description}</p>
          </div>
        )
      })}
    </div>
  );
};

export default IndexPage

export const query = graphql`
    query AllTasksQuery {
      allTask {
        edges {
          node {
            id
            summary
            description
            project
            author
            slug
          }
        }
      }
    }
  `;