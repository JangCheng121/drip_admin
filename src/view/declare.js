import DeclareIcon from '@material-ui/icons/SpeakerNotesOff';

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
    SelectField,
    SaveButton,
    ListButton, 
    DeleteButton, 
    CloneButton,
    DateInput, 
    ReferenceInput,
    AutocompleteInput,
    TextInput,
    SelectInput,
    translate,
} from 'react-admin';

import { withStyles } from '@material-ui/core/styles';
import {states} from '../lib/common';

const DeclareTitle = translate(({ record, translate }) => (
    <span>
        {translate('resources.declare.name')} / {record.id}
    </span>
));

const DeclareFilter = props => (
    <Filter {...props}>
        <ReferenceInput
            source="user_id"
            reference="user"
            perPage={10}
            filter={{ role: { $ne: 'virtual' } }}
            allowEmpty
        >
            <AutocompleteInput optionText="name" />
        </ReferenceInput>
        <ReferenceInput
            source="declared_id"
            reference="user"
            perPage={10}
            filter={{ role: { $ne: 'virtual' } }}
            allowEmpty
        >
            <AutocompleteInput optionText="name" />
        </ReferenceInput>

        <DateInput source="ctime" allowEmpty />
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


export const DeclareList = withStyles(styles) (( { classes, permissions, ...props } ) => (
    <List
        {...props} 
        filters={<DeclareFilter />}
        sort={{ field: 'ctime', order: 'DESC' }}
    >
        <Responsive
            small={
                <Datagrid  rowClick="edit" classes={{ rowEven: classes.rowEven }}>
                    <ReferenceField source="user_id" reference="user" linkType={false}>
                        <TextField source='name' />
                    </ReferenceField>
                    <TextField source="text" cellClassName={classes.content} />
                </Datagrid>
            }
            medium={
                <Datagrid  rowClick="edit" classes={{ rowEven: classes.rowEven }}>
                    <ReferenceField source="user_id" reference="user" linkType={false}>
                        <TextField source='name' />
                    </ReferenceField>
                    <ReferenceField source="declare_id" reference="user" linkType={false}>
                        <TextField source='name' />
                    </ReferenceField>
                    <ReferenceField source="content_id" reference="content" linkType={false}>
                        <TextField source='name' />
                    </ReferenceField>
                    <TextField source="text" cellClassName={classes.content} />
                    <SelectField source="state"  choices={states} />
                    <DateField source="ctime" showTime/>
                    <DateField source="utime" showTime/>
                </Datagrid>
            }
        />
    </List>
))

const DeclareEdit = withStyles(styles) (( { classes, permissions, ...props } ) => (
    <Edit title={<DeclareTitle />} {...props}>
        <SimpleForm toolbar={<CustomToolbar />}>
            <ReferenceInput source="user_id" reference="user">
                <AutocompleteInput optionText="name" />
            </ReferenceInput>
            <ReferenceInput source="declare_id" reference="user">
                <AutocompleteInput optionText="name" />
            </ReferenceInput>
            <ReferenceInput source="content_id" reference="content">
                <AutocompleteInput optionText="name" />
            </ReferenceInput>
            <TextInput source="text" />
            <SelectInput source="state" choices={states} />
        </SimpleForm>
    </Edit>
))

const DeclareCreate = withStyles(styles) (( { classes, permissions, ...props } ) => (
    <Create {...props}>
        <SimpleForm toolbar={<CustomToolbar />}>
            <ReferenceInput source="user_id" reference="user">
                <AutocompleteInput optionText="name" />
            </ReferenceInput>
            <ReferenceInput source="declare_id" reference="user">
                <AutocompleteInput optionText="name" />
            </ReferenceInput>
            <ReferenceInput source="content_id" reference="content">
                <AutocompleteInput optionText="name" />
            </ReferenceInput>
            <TextInput source="text" />
            <SelectInput source="state" choices={states} />
        </SimpleForm>
    </Create>
))

export default {
    list: DeclareList,
    edit: DeclareEdit,
    create: DeclareCreate,
    icon: DeclareIcon,
};