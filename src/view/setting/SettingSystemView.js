import React from 'react';
import compose from 'recompose/compose';
import Card from '@material-ui/core/Card';

import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import { translate } from 'react-admin';
import CardIcon from '../dashboard/CardIcon';

import settingIcon from '@material-ui/icons/Settings';


const styles = {
    main: {
        width: 400,
        margin: '1em',
    },
    card: {
        overflow: 'inherit',
        textAlign: 'right',
        padding: 16,
        minHeight: 52,
    },
};

const SettingSystemView = ({ value, translate, classes }) => (
    <div className={classes.main}>
        <CardIcon Icon={settingIcon} bgColor="#058dc3" />
        <Card className={classes.card}>
            <Typography className={classes.title} color="textSecondary">
                {translate('resources.setting.fields.work_start_time')} : {value.work_start_time}
            </Typography>
            <Typography className={classes.title} color="textSecondary">
                {translate('resources.setting.fields.work_end_time')} : {value.work_end_time}
            </Typography>
            <Typography className={classes.title} color="textSecondary">
                {translate('resources.setting.fields.first_page')} : {value.first_page}
            </Typography>
        </Card>
    </div>
);

const enhance = compose(
    withStyles(styles),
    translate
);

export default enhance(SettingSystemView);