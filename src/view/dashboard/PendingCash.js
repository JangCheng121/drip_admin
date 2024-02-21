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
import {getBriefTimeGap} from '../../lib/common';

const style = theme => ({
    root: {
        margin:'1em',
        flex: 1,
    },
    avatar: {
        background: theme.palette.background.avatar,
    },
    cost: {
        marginRight: '1em',
        color: theme.palette.text.primary,
    },
});

export const timeago = (time, translate) => {
    const ret = getBriefTimeGap(time);
    return ret.value + translate("com.service." + ret.str) + translate("com.service.ago")
} 

const PendingCash = ({ cash = [], users = {}, translate, classes }) => (
    <Card className={classes.root}>
        <CardHeader title={translate('com.dashboard.pending_cash')} />
        <List dense={true}>
            {cash.map(record => (
                <ListItem divider
                    key={record.id}
                    button
                    component={Link}
                    to={`/cash_history/${record.id}`}
                >
                    {users[record.user_id] ? (
                        <Avatar
                            className={classes.avatar}
                            src={`${
                                users[record.user_id].picture
                            }?size=32x32`}
                        />
                    ) : (
                        <Avatar />
                    )}
                    {users[record.user_id] ? (
                        <ListItemText
                            primary={timeago(record.ctime, translate)}
                            secondary={users[record.user_id].name}
                        />
                    ) : null}
                    <ListItemSecondaryAction>
                        <Chip label={`${record.type === 1? translate('resources.cash_history.type.in'):translate('resources.cash_history.type.out')} ${record.money}` }
                        />
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

export default enhance(PendingCash);