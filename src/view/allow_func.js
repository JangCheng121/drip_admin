import AllowFuncIcon from '@material-ui/icons/Notifications';

import React from 'react';
import { 
    Create, 
    Datagrid, 
    TextField, 
    Edit, 
    SimpleForm, 
    Toolbar, 
    Responsive, 
    ListButton, 
    TextInput,
    SimpleList, 
    SaveButton, 
    DeleteButton, 
    List 
} from 'react-admin';

import { withStyles } from '@material-ui/core/styles';

const AllowFuncTitle = ({ record }) => {
    console.log(record)
    return <span>AllowFunc {record ? `"${record.id}"` : ''}</span>;
};

const styles = {
    image: { 
        maxHeight: '2rem' 
    },
    content: {
        maxWidth: '18em',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap',
    },
}

const rowStyle = (record, index) => ({
    backgroundColor: record.state === 'pending' ? '#F9E3FD' : index % 2 ? '#fbfbfb' : 'white',
});

export const AllowFuncList = withStyles(styles) (( { classes, permissions, ...props } ) => (
    <List 
        {...props} 
    >
        <Responsive
            small={
                <SimpleList
                    primaryText={record => record.title}
                    secondaryText={record => `${record.views} views`}
                    tertiaryText={record => new Date(record.published_at).toLocaleDateString()}
                />
            }
            medium={
                <Datagrid  rowStyle={rowStyle} rowClick="edit">
                    <TextField source="id" />
                    <TextField source="name" cellClassName={classes.content} />
                </Datagrid>
            }
        />
    </List>
))

const AllowFuncEdit = withStyles(styles) (( { classes, permissions, ...props } ) => (
    <Edit title={<AllowFuncTitle />} {...props}>
        <SimpleForm  toolbar={<CustomToolbar />}>
            <TextInput source="name" />
        </SimpleForm>
    </Edit>
))


const toolbarStyles = {
    toolbar: {
        display: 'flex',
        justifyContent: 'space-between',
    },
};

const CustomToolbar = withStyles(toolbarStyles)(props => (
    <Toolbar {...props}>
        <SaveButton />
        <ListButton />
        <DeleteButton undoable={true} />
    </Toolbar>
));

const AllowFuncCreate = props => (
    <Create {...props}>
        <SimpleForm  toolbar={<CustomToolbar />}>
            <TextInput source="name"/>
        </SimpleForm>
    </Create>
);

export default {
    list: AllowFuncList,
    edit: AllowFuncEdit,
    create: AllowFuncCreate,
    icon: AllowFuncIcon,
};