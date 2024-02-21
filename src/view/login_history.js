import React from 'react';
import { 
    Datagrid, 
    Responsive,
    Filter,
    List,
    Show,
    TextField,
    DateField,
    NumberField,
    ReferenceField,
    Pagination,
    SimpleShowLayout,
    ReferenceInput,
    AutocompleteInput,
    DateInput,
} from 'react-admin';

import { withStyles } from '@material-ui/core/styles';
import LoginHistoryIcon from '@material-ui/icons/History';
import UserAvatarField from '../widget/UserAvatarField';

const styles = {
    image: { maxHeight: '1.5rem' },
    rowEven: {
        backgroundColor: '#fcfcfc',
    },
}

const LoginHistoryFilter = props => (
    <Filter {...props}>
        <ReferenceInput
            source="user_id"
            reference="user"
            perPage={100}
            filter={{ role: { $ne: 'virtual' } }}
            label="com.user"
        >
            <AutocompleteInput optionText="name" />
        </ReferenceInput>

        <DateInput source="login_time"/>
    </Filter>
);

const LoginPagination = props => <Pagination rowsPerPageOptions={[100,50,25]} {...props} />

const LoginHistoryList = withStyles(styles) (( { classes, permissions, ...props } ) => (
    <List {...props}
          pagination={<LoginPagination />}
          sort={{ field: 'login_time', order: 'DESC' }}
          filters={<LoginHistoryFilter />}
    >
        <Responsive
            small={
                <Datagrid expand={<LoginHistoryShow />} rowClick="expand" classes={{ rowEven: classes.rowEven }}>
                    <ReferenceField source="user_id" reference="user" linkType={false} label="com.user">
                        <UserAvatarField />
                    </ReferenceField>
                    <TextField source="ip" />
                </Datagrid>
            }
            medium={
                <Datagrid classes={{ rowEven: classes.rowEven }}>
                    <ReferenceField source="user_id" reference="user" linkType={true} label="com.user">
                        <UserAvatarField />
                    </ReferenceField>
                    <DateField source="login_time" options = {{ year: 'numeric', month: '2-digit', day: '2-digit', hour12: false, hour: '2-digit', minute: '2-digit'}} />
                    <DateField source="logout_time" options = {{ year: 'numeric', month: '2-digit', day: '2-digit', hour12: false, hour: '2-digit', minute: '2-digit'}} />
                    <NumberField source="secs"/>
                    <TextField source="user_id" />
                    <TextField source="ip" />
                    <TextField source="phone_type" />
                </Datagrid>
            }
        />
    </List>
));

const show_styles = {
    image: {
        maxHeight: '3rem'
    },
};

const LoginHistoryShow = withStyles(show_styles) (( { classes, permissions, ...props } ) => (
    <Show {...props}>
        <Responsive
            small={
                <SimpleShowLayout>
                    <DateField source="login_time" options = {{ year: 'numeric', month: '2-digit', day: '2-digit', hour12: false, hour: '2-digit', minute: '2-digit'}} />
                    <TextField source="phone_type" />
                </SimpleShowLayout>
            }
        />
    </Show>
))

export default {
    list: LoginHistoryList,
    icon: LoginHistoryIcon,
    show: LoginHistoryShow,
};