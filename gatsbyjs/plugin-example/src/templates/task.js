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
            {epic != null ? <a href={epic.slug}>{epic.summary}</a> : ""}
            <h1 style={{marginBottom: 10}}>{task.summary}</h1>
            <div>{task.project + " " + task.type}</div>
            <div>
                {task.description != null ? <h3 style={{marginBottom: 10,marginTop:15}}>Description</h3> : ""}
                {task.description}
                <h3 style={{marginBottom: 10,marginTop:15}}>Details</h3>
                <ul>
                    <li><a href={'https://timetopretend.atlassian.net/browse/' + task.key} target='_blank'>Jira Link: {task.key}</a></li>
                    <li><b>Priority:</b> {task.priority}</li>
                    <li><b>Status:</b> {task.status}</li>
                    <li><b>Components:</b> {task.components.map((component, i) => { return (<a href={component.description} target='_blank' key={i}>{component.name}, </a>) })}</li>
                    <li><b>Labels:</b> {task.labels.map((label, i) => { return label + " " })}</li>
                </ul>
                <SubtaskList value={task.subtasks}/>
                <StoriesList value={stories}/>
            </div>
        </div>
    );
};

export const query = graphql`
  query TaskQuery($id: String!, $epicKey: String, $key: String) {
    task(id: { eq: $id }) {
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
        description
      }
    }
    epic: task(key: {eq: $epicKey}) {
        id
        summary
        slug
    }
    stories: allTask(filter: {epic: {eq: $key}}) {
        edges {
            node {
                id
                summary
                project
                slug
            }
        }
    }
  }
`;