import React from 'react';
import compose from 'recompose/compose';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import { withStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';
import { translate } from 'react-admin';
import Chip from '@material-ui/core/Chip';
import {timeago} from './PendingCash'

const style = theme => ({
    root: {
        margin:'1em',
        flex: 1,
    },
    avatar: {
        background: theme.palette.background.avatar,
    },
});

const PendingService = ({ ps = [], translate, classes }) => (
    <Card className={classes.root}>
        <CardHeader title={translate('com.dashboard.pending_qa')} />
        <List >
            {ps.map(record => (
                <ListItem divider
                    key={record.id}
                    button
                    component={Link}
                    to={`/service`}
                >
                    <Avatar
                        className={classes.avatar}
                        src={`${
                            record.picture
                        }?size=32x32`}
                    />
                    <ListItemText
                        primary={timeago(record.ctime, translate)}
                        secondary={record.name}
                    />
                    <ListItemSecondaryAction style={{marginTop:12}}>
                        <Chip label={record.count}/>    
                    </ListItemSecondaryAction>
                </ListItem>
            ))}
        </List>
    </Card>
);

const enhance = compose(
    withStyles(style),
    translate
);

export default enhance(PendingService);