import React from "react";

const TaskList = (props) => {
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

export default TaskList

export const query = graphql`
    query TaskTypeFilter($type: String!) {
      allTask(filter: {type: {eq: $type}}) {
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