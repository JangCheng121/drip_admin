import React from 'react';
import { 
    Datagrid, 
    Responsive, 
    List, 
    TextField,
    DateField,
    NumberField,
    ImageField,
    ReferenceField
} from 'react-admin';

import { withStyles } from '@material-ui/core/styles';
import GiftHistoryIcon from '@material-ui/icons/History';
import GiftAvatarField from '../widget/GiftAvatarField';
import UserAvatarField from '../widget/UserAvatarField';

const styles = {
    image: { maxHeight: '1.5rem' },
    rowEven: {
        backgroundColor: '#fcfcfc',
    },
}

const GiftHistoryList = withStyles(styles) (( { classes, permissions, ...props } ) => (
    <List {...props} sort={{ field: 'startTime', order: 'DESC' }}>
        <Responsive
            small={
                <Datagrid classes={{ rowEven: classes.rowEven }}>
                    <ReferenceField source="sender" reference="user" linkType={false}>
                        <UserAvatarField source="user_id" />
                    </ReferenceField>
                    <ReferenceField source="gift_id" reference="gift">
                        <TextField source="name" />
                    </ReferenceField>
                    <NumberField source="channel_id"/>
                </Datagrid>
            }
            medium={
                <Datagrid classes={{ rowEven: classes.rowEven }}>
                    <ReferenceField source="sender" reference="user" linkType={false}>
                        <UserAvatarField />
                    </ReferenceField>
                    <ReferenceField source="receiver" reference="user" linkType={false}>
                        <UserAvatarField />
                    </ReferenceField>
                    <ReferenceField source="gift_id" reference="gift" linkType={false}>
                        <GiftAvatarField source="gift_id" />
                    </ReferenceField>
                    <NumberField source="cnt"/>
                    <NumberField source="channel_id"/>
                    <DateField source="ctime" options = {{ year: 'numeric', month: '2-digit', day: '2-digit', hour12: false, hour: '2-digit', minute: '2-digit'}} />
                </Datagrid>
            }
        />
    </List>
));

export default {
    list: GiftHistoryList,
    icon: GiftHistoryIcon,
};