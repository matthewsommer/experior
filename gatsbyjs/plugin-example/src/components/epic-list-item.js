import React from "react";

class Epic extends React.Component {
    render() {
        if (this.props.value != null) {
            return (
                <a href={this.props.value.id}>{this.props.value.summary}</a>
            );
        } else {
            return (null);
        }
    }
}

export default Epic;