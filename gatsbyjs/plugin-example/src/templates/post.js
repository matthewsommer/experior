import React from "react";
import EpicListItem from "../components/epic-list-item";
import StoriesList from "../components/stories-list";
import SubtaskList from "../components/subtask-list";

export default ({ data }) => {
    const task = data.task;
    const epic = data.epic;
    var stories = [];
    if(data.stories != null) {
        stories = data.stories.edges;
    }
    return (
        <div>
            {epic != null ? <a href={epic.id}>{epic.summary}</a> : ""}
            <h1 style={{marginBottom: 5}}>{task.summary}</h1>
            <div>{task.project + " " + task.type}</div>
            <div>
                <h2 style={{marginBottom: 5,marginTop:10}}>Description</h2>
                {task.description}
                <ul>
                    <li><a href={'https://timetopretend.atlassian.net/browse/' + task.key} target='_blank'>{task.key}</a></li>
                    <li>{task.priority}</li>
                    <li>{task.status}</li>
                    <li>{task.components.map((component, i) => { return component.name + " " })}</li>
                    <li>{task.labels.map((label, i) => { return label + " " })}</li>
                </ul>
                <SubtaskList value={task.subtasks}/>
                <StoriesList value={stories}/>
            </div>
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