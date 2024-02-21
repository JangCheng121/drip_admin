import NoteIcon from '@material-ui/icons/Note';

import React from 'react';
import { 
    Create, 
    Edit, 
    List,
    SimpleForm, 
    Toolbar, 
    Filter, 
    Datagrid, 
    Responsive, 
    ReferenceField, 
    DateField,
    TextField, 
    SaveButton, 
    ListButton, 
    DeleteButton, 
    CloneButton,
    DateInput, 
    ReferenceInput,
    AutocompleteInput,
    TextInput,
    translate,
} from 'react-admin';

import { withStyles } from '@material-ui/core/styles';

const NoteTitle = translate(({ record, translate }) => (
    <span>
        {translate('resources.note.name')} / {record.id}
    </span>
));

const NoteFilter = props => (
    <Filter {...props}>
        <ReferenceInput
            source="sender"
            reference="user"
            perPage={10}
            filter={{ role: { $ne: 'virtual' } }}
            allowEmpty
        >
            <AutocompleteInput optionText="name" />
        </ReferenceInput>
        <ReferenceInput
            source="receiver"
            reference="user"
            perPage={10}
            filter={{ role: { $ne: 'virtual' } }}
            allowEmpty
        >
            <AutocompleteInput optionText="name" />
        </ReferenceInput>

        <DateInput source="from" label="resources.popup.fields.from" alwaysOn allowEmpty />
        <DateInput source="to" label="resources.popup.fields.to"  alwaysOn allowEmpty />
    </Filter>
);


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
    rowEven: {
        backgroundColor: '#fcfcfc',
    },
}
const toolbarStyles = {
    toolbar: {
        display: 'flex',
        justifyContent: 'space-between',
    },
};

const CustomToolbar = withStyles(toolbarStyles)(props => (
    <Toolbar {...props}>
        <SaveButton />
        <CloneButton />
        <ListButton />
        <DeleteButton undoable={true} />
    </Toolbar>
));


export const NoteList = withStyles(styles) (( { classes, permissions, ...props } ) => (
    <List
        {...props} 
        filters={<NoteFilter />}
        sort={{ field: 'ctime', order: 'DESC' }}
    >
        <Responsive
            small={
                <Datagrid  rowClick="edit" classes={{ rowEven: classes.rowEven }}>
                    <ReferenceField source="sender" reference="user" linkType={false}>
                        <TextField source='name' />
                    </ReferenceField>
                    <TextField source="content" cellClassName={classes.content} />
                </Datagrid>
            }
            medium={
                <Datagrid  rowClick="edit" classes={{ rowEven: classes.rowEven }}>
                    <ReferenceField source="receiver" reference="user" linkType={false}>
                        <TextField source='name' />
                    </ReferenceField>
                    <ReferenceField source="sender" reference="user" linkType={false}>
                        <TextField source='name' />
                    </ReferenceField>
                    <TextField source="content" cellClassName={classes.content} />
                    <DateField source="ctime" options = {{ year: 'numeric', month: '2-digit', day: '2-digit', hour12: false, hour: '2-digit', minute: '2-digit'}} />
                </Datagrid>
            }
        />
    </List>
))

const NoteEdit = withStyles(styles) (( { classes, permissions, ...props } ) => (
    <Edit title={<NoteTitle />} {...props}>
        <SimpleForm toolbar={<CustomToolbar />}>
            <ReferenceInput source="sender" reference="user">
                <AutocompleteInput optionText="name" />
            </ReferenceInput>
            <ReferenceInput source="receiver" reference="user">
                <AutocompleteInput optionText="name" />
            </ReferenceInput>
            <TextInput source="content" />
            <TextInput source="type" style={{display: 'none'}} />
        </SimpleForm>
    </Edit>
))

const NoteCreate = withStyles(styles) (( { classes, permissions, ...props } ) => (
    <Create {...props}>
        <SimpleForm toolbar={<CustomToolbar />}>
            <ReferenceInput source="sender" reference="user">
                <AutocompleteInput optionText="name" />
            </ReferenceInput>
            <ReferenceInput source="receiver" reference="user">
                <AutocompleteInput optionText="name" />
            </ReferenceInput>
            <TextInput source="content" />
            <TextInput source="type" defaultValue='text' style={{display: 'none'}} />
        </SimpleForm>
    </Create>
))

export default {
    list: NoteList,
    edit: NoteEdit,
    create: NoteCreate,
    icon: NoteIcon,
};