import React from 'react';
import compose from 'recompose/compose';
import Card from '@material-ui/core/Card';
import cardIcon from '@material-ui/icons/AttachMoney';
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

const SettingAdvertView = ({ value, translate, classes }) => (
    <div className={classes.main}>
        <CardIcon Icon={cardIcon} bgColor="#CBC557" />
        <Card className={classes.card}>
            <Typography className={classes.title} >
                {translate('resources.setting.fields.exchange_dollar_rmb')} : {value.exchange_dollar_rmb}
            </Typography>
            <Typography className={classes.title} >
                {translate('resources.setting.fields.exchange_dollar_won')} : {value.exchange_dollar_won}
            </Typography>
            <Typography className={classes.title} >
                {translate('resources.setting.fields.exchange_rate_coin')} : {value.exchange_rate_coin}
            </Typography>
            <Typography className={classes.title} color="textSecondary">
                {translate('resources.setting.fields.exchange_rate_point')} : {value.exchange_rate_point}
            </Typography>
            <Typography className={classes.title} >
                {translate('resources.setting.fields.cash_out_rate')} : {value.cash_out_rate}
            </Typography>
        </Card>
    </div>
);

const enhance = compose(
    withStyles(styles),
    translate
);

export default enhance(SettingAdvertView);