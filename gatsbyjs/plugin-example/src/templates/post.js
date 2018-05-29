import React from "react";

export default ({ data }) => {
    const task = data.task;
    const epic = data.epic;
    var stories = [];
    if(data.stories != null) {
        stories = data.stories.edges;
    }
    return (
        <div>
            <h1>{task.summary}</h1>
            <ul>
                <li>{task.type}</li>
                <li><a href={'https://timetopretend.atlassian.net/browse/' + task.key} target='_blank'>{task.key}</a></li>
                <li>{task.project}</li>
                <li>{task.priority}</li>
                <li>{task.status}</li>
                <li>{task.components.map((component, i) => { return component.name + " " })}</li>
                <li>{task.labels.map((label, i) => { return label + " " })}</li>
                <li>{task.description}</li>
                {epic != null ? <li>Epic: <a href={epic.id}>{epic.summary}</a></li> : ''}
                {task.subtasks.length > 0 ? (<li>Subtasks</li>) : ("")}
                <ul>
                    {task.subtasks.map((task, i) => {
                        return <li key={i}>{task.fields.status.name + " - " + task.fields.summary}</li>;
                    })}
                </ul>
                {stories.length > 0 ? (<li>Stories</li>) : ("")}
                <ul>
                    {stories.map((task, i) => {
                        const taskNode = task.node;
                        return (
                        <li key={i}>
                            <a href={taskNode.id}>{taskNode.summary}</a>
                        </li>
                        )
                    })}
                </ul>
            </ul>
        </div>
    );
};

export const query = graphql`
  query TaskQuery($slug: String!, $epicKey: String, $key: String) {
    task(id: { eq: $slug }) {
      key
      type
      project
      summary
      status
      labels
      priority
      description
      epic
      subtasks {
        fields {
          summary
          status {
              name
          }
        }
      }
      components {
        name
      }
    }
    epic: task(key: {eq: $epicKey}) {
        id
        summary
    }
    stories: allTask(filter: {epic: {eq: $key}}) {
        edges {
            node {
                id
                summary
            }
        }
    }
  }
`;