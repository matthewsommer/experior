import React from 'react'
import Link from 'gatsby-link'
import GatsbyJiraSource from 'gatsby-jira-source'

const axios = require('axios');

const IndexPage = (props) => {
  const tasks = props.data.allJiraIssue.edges;

  let projects = new Set();
  tasks.map(({ node }) => { return projects.add(node.jiraIssue.jiraFields.project.name) });

  let types = new Set();
  tasks.map(({ node }) => { return types.add(node.jiraIssue.jiraFields.issuetype.name) });

  let statuss = new Set();
  tasks.map(({ node }) => { return statuss.add(node.jiraIssue.jiraFields.status.name) });

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
        {Array.from(types).sort().map((type, k) => {
          return (
            <div key={k}>
              <a href={type.replace(/[^\w\s]/gi, '').replace(/\s+/g, '-').toLowerCase()}>{type}</a>
            </div>
          )
        })}
      </div>
      <br/><br/>
      <div>
        {Array.from(statuss).sort().map((status, j) => {
          return (
            <div key={j}>
              <a href={status.replace(/\s+/g, '-').toLowerCase()}>{status}</a>
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
      allJiraIssue {
        edges {
          node {
              slug
              jiraIssue {
                  id
                  jiraFields {
                      summary
                      description
                      project {
                          name
                      }
                      issuetype {
                        name
                      }
                      status {
                        name
                      }
                  }
              }
          }
        }
      }
    }
  `;