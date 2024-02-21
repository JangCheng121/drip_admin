import React from 'react';
import compose from 'recompose/compose';
import Card from '@material-ui/core/Card';
import cardIcon from '@material-ui/icons/ThumbUp';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import { translate } from 'react-admin';
import CardIcon from '../dashboard/CardIcon';

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

const SettingVirtualView = ({ value, translate, classes }) => (
    <div className={classes.main}>
        <CardIcon Icon={cardIcon} bgColor="#93059f" />
        <Card className={classes.card}>
            <Typography className={classes.title} color="textSecondary">
                {translate('resources.setting.virtual.view')} : {value.virtual.view_from} - {value.virtual.view_to}
            </Typography>
            <Typography className={classes.title} color="textSecondary">
                {translate('resources.setting.virtual.like')} : {value.virtual.like_from} - {value.virtual.like_to}
            </Typography>
            <Typography className={classes.title} color="textSecondary">
                {translate('resources.setting.virtual.save')} : {value.virtual.save_from} - {value.virtual.save_to}
            </Typography>
            <Typography className={classes.title} color="textSecondary">
                {translate('resources.setting.select_content.views')} : {value.select_content.views}
            </Typography>
            <Typography className={classes.title} color="textSecondary">
                {translate('resources.setting.select_content.likes')} : {value.select_content.likes}
            </Typography>
        </Card>
    </div>

);

const enhance = compose(
    withStyles(styles),
    translate
);

export default enhance(SettingVirtualView);