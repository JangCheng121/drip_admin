import React from 'react';
import compose from 'recompose/compose';
import Card from '@material-ui/core/Card';
import ContentIcon from '@material-ui/icons/Image';
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

const TotalContents = ({ value, translate, classes }) => (
    <div className={classes.main}>
        <CardIcon Icon={ContentIcon} bgColor="#DC6303" />
        <Card className={classes.card}>
            <Typography className={classes.title} color="textSecondary">
                {translate('com.dashboard.total_contents')}
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

export default enhance(TotalContents);
