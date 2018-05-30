import React from 'react'
import Link from 'gatsby-link'
import GatsbyJiraSource from 'gatsby-jira-source'

const axios = require('axios');

const EpicsPage = (props) => {
    const tasks = props.data.epics.edges;

    return (
        <div>
            {tasks.map((task, i) => {
                const taskNode = task.node;
                return (
                    <div key={i}>
                        <a href={taskNode.id}><h4>{taskNode.summary}</h4></a>
                        <p>{taskNode.author}</p>
                        <p>{taskNode.description}</p>
                    </div>
                )
            })}
        </div>
    );
};

export default EpicsPage

export const query = graphql`
    query EpicsQuery {
        epics: allTask(filter: {type: {eq: "Epic"}}) {
            edges {
                node {
                id
                summary
                project
                }
            }
        }
    }
  `;