import React from "react";

class SubtaskList extends React.Component {
    render() {
        if (this.props.value.length > 0) {
            return (
                <div>
                    <h3 style={{marginBottom: 10,marginTop:15}}>Tasks</h3>
                    <ul>
                        {this.props.value.map((task, i) => {
                            return <li key={i}>{task.jiraFields.status.name + " - " + task.jiraFields.summary}</li>;
                        })}
                    </ul>
                </div>
            );
        } else {
            return (null);
        }
    }
}

export default SubtaskList;