import React from "react";

class SubtaskList extends React.Component {
    render() {
        console.log(this.props.value);
        if (this.props.value.length > 0) {
            return (
                <div>
                    <h2>Tasks</h2>
                    <ul>
                        {this.props.value.map((task, i) => {
                            return <li key={i}>{task.fields.status.name + " - " + task.fields.summary}</li>;
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