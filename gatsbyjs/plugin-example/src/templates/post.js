import React from "react";

export default ({ data }) => {
    const task = data.task;
    const epic = data.epic;
    console.log(epic);
    return (
        <div>
            <h1>{task.summary}</h1>
            <ul>
                <li><a href={'https://timetopretend.atlassian.net/browse/' + task.key} target='_blank'>{task.key}</a></li>
                <li>{task.priority}</li>
                <li>{task.status}</li>
                <li>{task.components.map((component, i) => { return component.name + " " })}</li>
                <li>{task.labels.map((label, i) => { return label + " " })}</li>
                <li>{task.description}</li>
                <li>{task.epic}</li>
                {epic != null ? 'epic' : 'no-epic'}
                {/* <li><a href={epic.id}>{epic.summary}</a></li> */}
                <li>Subtasks</li>
                <ul>
                    {task.subtasks.map((task, i) => {
                        return <li key={i}>{task.fields.status.name + " - " + task.fields.summary}</li>;
                    })}
                </ul>
            </ul>
        </div>
    );
};

export const query = graphql`
  query TaskQuery($slug: String!, $epicKey: String) {
    task(id: { eq: $slug }) {
      key
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
  }
`;