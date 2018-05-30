import React from "react";

class StoriesList extends React.Component {
    render() {
        if (this.props.value.length > 0) {
            return (
                <div>
                    <h3 style={{marginBottom: 10,marginTop:15}}>Stories</h3>
                    <ul>
                        {this.props.value.map((task, i) => {
                            const taskNode = task.node;
                            return (
                                <li key={i}>
                                    <a href={taskNode.slug}>{taskNode.project} - {taskNode.summary}</a>
                                </li>
                            )
                        })}
                    </ul>
                </div>
            );
        } else {
            return (null);
        }
    }
}

export default StoriesList;