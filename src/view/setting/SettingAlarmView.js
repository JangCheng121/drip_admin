import React from 'react';
import compose from 'recompose/compose';
import Card from '@material-ui/core/Card';
import AlarmIcon from '@material-ui/icons/Notifications';
import { withStyles } from '@material-ui/core/styles';
// import Typography from '@material-ui/core/Typography';
import { translate } from 'react-admin';

import CardIcon from '../dashboard/CardIcon';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
// import withTranslate from 'ra-core/esm/i18n/translate';

const styles = {
    main: {
        margin: '1em',
        width: 400,
    },
    card: {
        overflow: 'inherit',
        textAlign: 'right',
        padding: 16,
        minHeight: 52,
    },
};

const SettingAlarmView = ({ value, translate, classes }) => (
    <div className={classes.main}>
        <CardIcon Icon={AlarmIcon} bgColor="#f44336" />
        <Card className={classes.card}>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end'}}>
            <FormControlLabel style={{width:140}}
                    control={
                        <Checkbox
                            checked={value.alarm_review}
                            color="primary"
                            label={translate("resources.setting.fields.alarm_review")}
                        />
                    }
                    label={translate("resources.setting.fields.alarm_review")}
                />        
                <FormControlLabel  style={{width:140}}
                    control={
                        <Checkbox  
                            checked={value.alarm_content}
                            color="primary"
                        />
                    }
                    label={translate("resources.setting.fields.alarm_content")}
                />
                <FormControlLabel  style={{width:140}}
                                   control={
                                       <Checkbox
                                           checked={value.alarm_cash}
                                           color="primary"
                                       />
                                   }
                                   label={translate("resources.setting.fields.alarm_cash")}
                />
                <FormControlLabel  style={{width:140}}
                                   control={
                                       <Checkbox
                                           checked={value.register_block}
                                           color="primary"
                                       />
                                   }
                                   label={translate("resources.setting.fields.register_block")}
                />
                <FormControlLabel  style={{width:140}}
                                   control={
                                       <Checkbox
                                           checked={value.invite_use}
                                           color="primary"
                                       />
                                   }
                                   label={translate("resources.setting.fields.invite_use")}
                />
                <FormControlLabel  style={{width:140}}
                                   control={
                                       <Checkbox
                                           checked={value.block}
                                           color="primary"
                                       />
                                   }
                                   label={translate("resources.setting.fields.block")}
                />
            </div>
        </Card>
    </div>
);

const enhance = compose(
    withStyles(styles),
    translate
);

export default enhance(SettingAlarmView);