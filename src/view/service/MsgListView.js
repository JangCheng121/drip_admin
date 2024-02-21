import React, {Component} from 'react';

import Card from '@material-ui/core/Card';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
import compose from 'recompose/compose';
import { connect } from 'react-redux';

import MsgItem from './MsgItem';

const styles = {
    list: {
        height: '70vh',
        overflow: 'auto',
    },
    avatar: {
        width: 40,
        height: 40,
    },
};

class MsgListView extends Component {
    
    componentDidUpdate () {
        let messageList = this.refs.messageList;
        if(messageList) messageList.scrollTop = 1000000000;
    }

    render() {
        const { msgs, total, handleClick, classes } = this.props;
        if (!msgs || !msgs.length) return null

        return (
            <Card  >
                <div className={classes.list} ref="messageList" id='messageList'>
                    {msgs.map(msg => (
                        <MsgItem msg={msg} handleClick={handleClick}/>
                    ))}
                </div>
                {msgs.length < total && (
                    <Button variant="contained" onClick={console.log('') }> 
                        Load more events
                    </Button>
                )}
            </Card>
        );
    }
}

const mapStateToProps = state => ({
    version: state.admin.ui.viewVersion,
});

export default compose(
    connect(mapStateToProps),
    withStyles(styles),
)(MsgListView);