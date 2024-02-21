import React from 'react';
import compose from 'recompose/compose';
import Card from '@material-ui/core/Card';
import cardIcon from '@material-ui/icons/Grade';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import { translate } from 'react-admin';
import CardIcon from '../dashboard/CardIcon';

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

const SettingPointView = ({ value, translate, classes }) => (
    <div className={classes.main}>
        <CardIcon Icon={cardIcon} bgColor="#3e9211" />
        <Card className={classes.card}>
            <Typography className={classes.title} >
                {translate('resources.setting.fields.point_invite')} : {value.point_invite}
            </Typography>
            <Typography className={classes.title} >
                {translate('resources.setting.fields.point_first_cash_in')} : {value.point_first_cash_in}
            </Typography>
            <Typography className={classes.title} >
                {translate('resources.setting.fields.point_first_cash_out')} : {value.point_first_cash_out}
            </Typography>
            <Typography className={classes.title} >
                {translate('resources.setting.fields.point_follow')} : {value.point_follow}
            </Typography>
        </Card>
    </div>
);

const enhance = compose(
    withStyles(styles),
    translate
);

export default enhance(SettingPointView);