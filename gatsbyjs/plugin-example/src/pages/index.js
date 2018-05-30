import React from 'react'
import Link from 'gatsby-link'
import GatsbyJiraSource from 'gatsby-jira-source'

const axios = require('axios');

const IndexPage = (props) => {
  const tasks = props.data.allTask.edges;
  let projects = new Set();
  tasks.map(({ node }) => { return projects.add(node.project) });

  let types = new Set();
  tasks.map(({ node }) => { return types.add(node.type) });

  return (
    <div>
      {Array.from(projects).sort().map((project, i) => {
        return (
          <div key={i}>
            <a href={project.replace(/[^\w\s]/gi, '').replace(/\s+/g, '-').toLowerCase()}>{project}</a>
          </div>
        )
      })}
      <br/><br/>
      <div>
        {Array.from(types).sort().map((type, i) => {
          return (
            <div key={i}>
              <a href={type.replace(/[^\w\s]/gi, '').replace(/\s+/g, '-').toLowerCase()}>{type}</a>
            </div>
          )
        })}
      </div>
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
            type
          }
        }
      }
    }
  `;