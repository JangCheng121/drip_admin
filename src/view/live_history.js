import React from 'react';
import { 
    Datagrid, 
    Responsive, 
    List, 
    TextField,
    DateField,
    NumberField,
    ImageField,
    ReferenceField,
} from 'react-admin';

import { withStyles } from '@material-ui/core/styles';
import LiveHistoryIcon from '@material-ui/icons/History';
import UserAvatarField from '../widget/UserAvatarField';

const styles = {
    image: { maxHeight: '1.5rem' },
    rowEven: {
        backgroundColor: '#fcfcfc',
    },
}

const LiveHistoryList = withStyles(styles) (( { classes, permissions, ...props } ) => (
    <List {...props} sort={{ field: 'startTime', order: 'DESC' }}>
        <Responsive
            small={
                <Datagrid classes={{ rowEven: classes.rowEven }}>
                    <ReferenceField source="user_id" reference="user" linkType={false}>
                        <UserAvatarField />
                    </ReferenceField>
                    <NumberField source="totalGiftPrice" />
                    <DateField source="startTime" options = {{ year: 'numeric', month: '2-digit', day: '2-digit', hour12: false, hour: '2-digit', minute: '2-digit'}} />
                </Datagrid>
            }
            medium={
                <Datagrid classes={{ rowEven: classes.rowEven }}>
                    <ReferenceField source="user_id" reference="user" linkType={false}>
                        <UserAvatarField />
                    </ReferenceField>
                    <TextField source="name" />
                    <ImageField classes={{ image: classes.image }} source="image"/>
                    <DateField source="startTime" options = {{ year: 'numeric', month: '2-digit', day: '2-digit', hour12: false, hour: '2-digit', minute: '2-digit'}} />
                    <DateField source="endTime" options = {{ year: 'numeric', month: '2-digit', day: '2-digit', hour12: false, hour: '2-digit', minute: '2-digit'}} />
                    <NumberField source="totalGiftPrice"/>
                    <NumberField source="nLike"/>
                    <NumberField source="nCount"/>
                </Datagrid>
            }
        />
    </List>
));


export default {
    list: LiveHistoryList,
    icon: LiveHistoryIcon,
};