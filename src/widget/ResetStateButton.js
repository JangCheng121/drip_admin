import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, crudUpdateMany, startUndoable } from 'react-admin';

class ResetStateButton extends Component {
    handleClick = () => {
        const {  basePath, resource, selectedIds, startUndoable } = this.props;
        startUndoable(
            crudUpdateMany(resource, selectedIds, { state: 'accept' }, basePath)
        );
    };

    render() {
        return (
            <Button label="resources.content.action.state_to_accept" onClick={this.handleClick} />
        );
    }
}

export default connect(undefined, { startUndoable })(ResetStateButton);