import React from 'react';
import compose from 'recompose/compose';
import Card from '@material-ui/core/Card';
import PersonIcon from '@material-ui/icons/Person';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import { translate } from 'react-admin';

import CardIcon from './CardIcon';

const styles = {
    main: {
        flex: '1',
        margin: '1em',
    },
    card: {
        overflow: 'inherit',
        textAlign: 'right',
        padding: 16,
        minHeight: 52,
    },
};

const TotalUsers = ({ value, translate, classes }) => (
    <div className={classes.main}>
        <CardIcon Icon={PersonIcon} bgColor="#31708f" />
        <Card className={classes.card}>
            <Typography className={classes.title} color="textSecondary">
                {translate('com.dashboard.total_users')}
            </Typography>
            <Typography variant="headline" component="h2">
                {value}
            </Typography>
        </Card>
    </div>
);

const enhance = compose(
    withStyles(styles),
    translate
);

export default enhance(TotalUsers);
