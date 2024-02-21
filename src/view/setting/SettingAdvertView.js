import React from 'react';
import compose from 'recompose/compose';
import Card from '@material-ui/core/Card';
import cardIcon from '@material-ui/icons/Subtitles';
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
        <CardIcon Icon={cardIcon} bgColor="#31708f" />
        <Card className={classes.card}>
            <Typography className={classes.title} color="textSecondary">
                {translate('resources.setting.fields.advert_content_cnt')} : {value.advert_content_cnt}
            </Typography>
            <Typography className={classes.title} >
                {translate('resources.setting.fields.advert_video_cnt')} : {value.advert_video_cnt}
            </Typography>
            <Typography className={classes.title} >
                {translate('resources.setting.fields.advert_categories')} : {value.advert_categories? value.advert_categories.length:0}개
            </Typography>
            
        </Card>
    </div>
);

const enhance = compose(
    withStyles(styles),
    translate
);

export default enhance(SettingAdvertView);