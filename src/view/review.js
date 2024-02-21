import React, { Fragment } from 'react';
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
    NumberField,
    SelectField,
    DateField, 
    TextField, 
    SaveButton, 
    ListButton, 
    DeleteButton, 
    CloneButton,
    DateInput, 
    ReferenceInput,
    SelectInput,
    NumberInput,
    TextInput,
    LongTextInput,
    AutocompleteInput,
    FormDataConsumer,
    translate,
    BulkDeleteButton,

} from 'react-admin';

import { withStyles } from '@material-ui/core/styles';
import rowStyle from './content/rowStyle';
import UserAvatarField from '../widget/UserAvatarField';
import ResetStateButton from '../widget/ResetStateButton';
import ReviewIcon from '@material-ui/icons/Comment';
import {cStates} from "../lib/common";

const ReviewTitle = translate(({ record, translate }) => (
    <span>
        {translate('resources.review.name')} / {record.id}
    </span>
));

const ReviewFilter = props => (
    <Filter {...props}>
        <ReferenceInput
            label="resources.review.fields.user_id"
            source="user_id"
            reference="user"
            perPage={10}
            filter={{ role: { $ne: 'virtual' } }}
            allowEmpty
        >
            <AutocompleteInput optionText="name" />
        </ReferenceInput>
        <DateInput source="ctime"/>
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
    headerRow: {
        borderLeftColor: 'white',
        borderLeftWidth: 5,
        borderLeftStyle: 'solid',
    },
    rowEven: {
        backgroundColor: '#fcfcfc',
    }
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

const PostBulkActionButtons = props => (
    <Fragment>
        <ResetStateButton {...props} />
        <BulkDeleteButton {...props} />
    </Fragment>
);

export const ReviewList = withStyles(styles) (( { classes, permissions, ...props } ) => (
    <List 
        {...props}
        bulkActionButtons={<PostBulkActionButtons />}
        filters={<ReviewFilter />} 
    >
        <Responsive
            small={
                <Datagrid  rowClick="edit" classes={{ rowEven: classes.rowEven }}>
                    <ReferenceField source="user_id" reference="user" linkType={false}>
                        <UserAvatarField />
                    </ReferenceField>
                    <ReferenceField source="parent_content" reference="content" label="resources.content.fields.name"  linkType={false}>
                        <TextField source='name' />
                    </ReferenceField>
                    <TextField source="comment" cellClassName={classes.content} />
                </Datagrid>
            }
            medium={
                <Datagrid
                    {...props}
                    rowClick="edit"
                    rowStyle={rowStyle}
                    classes={{ headerRow: classes.headerRow, rowEven: classes.rowEven }}
                >
                    <NumberField source="id"/>
                    <ReferenceField source="user_id" reference="user" linkType={false}>
                        <UserAvatarField />
                    </ReferenceField>
                    <ReferenceField source="level" reference="vip" linkType={false}>
                        <TextField source='name' />
                    </ReferenceField>
                    <NumberField source="like"/>
                    <TextField source="comment" cellClassName={classes.content} />
                    <NumberField source="point"/>
                    <SelectField source="state" choices={cStates}/>
                    <TextField source="delete_reason" />
                    <NumberField source="delete_point"/>
                    <DateField source="ctime" options = {{ year: 'numeric', month: '2-digit', day: '2-digit', hour12: false, hour: '2-digit', minute: '2-digit'}} />
                </Datagrid>
            }
        />
    </List>
))

export const validateContent = (values, props) => {
    const errors = {};
    if (values.state === 'delete' && (!values.delete_reason || !values.delete_reason.length)) {
        errors.delete_reason = props.translate('resources.content.err')
    }
    return errors
}

const ReviewEdit = withStyles(styles) (( { classes, permissions, ...props } ) => (
    <Edit title={<ReviewTitle />} {...props}>
        <SimpleForm toolbar={<CustomToolbar />} validate={validateContent}>
            <ReferenceInput
                source="user_id"
                reference="user"
                perPage={10}
                filter={{ role: { $ne: 'virtual' } }}
            >
                <AutocompleteInput optionText="name" />
            </ReferenceInput>
            <ReferenceInput
                source="content_id"
                reference="content"
                perPage={10}
                label="resources.content.fields.name"
            >
                <AutocompleteInput optionText="name" />
            </ReferenceInput>
            <ReferenceInput source="level" reference="vip">
                <SelectInput optionText="name" />
            </ReferenceInput>
            <NumberInput source="like" defaultValue={0}/>
            <LongTextInput source="comment" />
            <NumberInput source="point"/>
            <SelectInput source="state" choices={cStates}/>
            <FormDataConsumer>
                {({ formData, ...rest }) => formData && formData.state === 'delete' &&
                    <TextInput source="delete_reason" label="resources.review.fields.delete_reason"/>
                }
            </FormDataConsumer>
            <FormDataConsumer>
                {({ formData, ...rest }) => formData && formData.state === 'delete' &&
                    <NumberInput source="delete_point" label="resources.review.fields.delete_point" defaultValue={0}/>
                }
            </FormDataConsumer>

        </SimpleForm>
    </Edit>
))

const ReviewCreate = props => (
    <Create {...props}>
        <SimpleForm toolbar={<CustomToolbar />}>
            <ReferenceInput
                source="user_id"
                reference="user"
                perPage={100}
                filter={{ role: { $ne: 'virtual' } }}
            >
                <AutocompleteInput optionText="name" />
            </ReferenceInput>
            <ReferenceInput
                source="content_id"
                reference="content"
                perPage={10}
                label="resources.content.fields.name"
            >
                <AutocompleteInput optionText="name" />
            </ReferenceInput>
            <ReferenceInput source="level" reference="vip"> 
                <SelectInput optionText="name" />
            </ReferenceInput>
            <LongTextInput source="comment" />
            <NumberInput source="point"/>
        </SimpleForm>
    </Create>
);

export default {
    list: ReviewList,
    edit: ReviewEdit,
    create: ReviewCreate,
    icon: ReviewIcon,
};