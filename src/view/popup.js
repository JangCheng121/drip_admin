import PopupIcon from '@material-ui/icons/FilterFrames';

import React from 'react';
import { 
    Create, 
    TextInput,
    DateField, 
    Datagrid, 
    TextField, 
    UrlField,
    ReferenceArrayInput , 
    CloneButton, 
    SelectArrayInput, 
    Edit, 
    SimpleForm, 
    LongTextInput,
    ImageInput,
    Filter, 
    Toolbar, 
    Responsive, 
    ListButton, 
    SaveButton,
    DeleteButton, 
    ImageField, 
    ReferenceArrayField, 
    DateInput, 
    DateTimeInput, 
    SingleFieldList, 
    ChipField,
    translate,
    List, 
} from 'react-admin';

import { withStyles } from '@material-ui/core/styles';
// import Poster from './content/Poster';

const PopupTitle = translate(({ record, translate }) => (
    <span>
        {translate('resources.popup.name')} / {record.name}
    </span>
));

const PopupFilter = props => (
    <Filter {...props}>
        <DateInput source="from"/>
        <DateInput source="to"/>
    </Filter>
);

const styles = {
    name: { 
        padding: '0 12px 0 25px' 
    },
    image: { 
        maxHeight: '2rem' 
    },
    rowEven: {
        backgroundColor: '#fcfcfc',
    },
    content: {
        maxWidth: '18em',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap',
    },    
};

export const PopupList = withStyles(styles) (( { classes, permissions, ...props } ) => (
    <List 
        {...props} 
        filters={<PopupFilter />} 
    >
        <Responsive
            small={
                <Datagrid  rowClick="edit" classes={{ rowEven: classes.rowEven }}>
                    <ImageField classes={{ image: classes.image }} source="thumb"/>
                    <DateField source="ctime" />
                </Datagrid>
            }
            medium={
                <Datagrid  rowClick="edit" classes={{ rowEven: classes.rowEven }}>
                    <TextField source="name"/>
                    <ImageField classes={{ image: classes.image }} source="thumb"/>
                    <TextField source="description"/>
                    <UrlField source="url"/>
                    <DateField source="from" options = {{ year: 'numeric', month: '2-digit', day: '2-digit', hour12: false, hour: '2-digit', minute: '2-digit'}} />
                    <DateField source="to" options = {{ year: 'numeric', month: '2-digit', day: '2-digit', hour12: false, hour: '2-digit', minute: '2-digit'}} />
                    <ReferenceArrayField source="positions" reference="category">
                        <SingleFieldList>
                            <ChipField source="name" />
                        </SingleFieldList>
                    </ReferenceArrayField>
                    <TextField source="content" cellClassName={classes.content} />
                </Datagrid>
            }
        />
    </List>
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
        <CloneButton />
        <ListButton />
        <DeleteButton undoable={true} />
    </Toolbar>
));

const PopupEdit = withStyles(styles) (( { classes, permissions, ...props } ) => (
    <Edit title={<PopupTitle />} {...props}>
        <SimpleForm  toolbar={<CustomToolbar />}>
            <TextInput source="name"/>
            {/* <Poster/> */}
            <ImageInput source="media" label="com.related_image" accept="image/*" multiple={false}>
                <ImageField source="src" title="" />
            </ImageInput>        
            <LongTextInput source="url"/>                
            <LongTextInput source="description"/>
            <DateTimeInput source="from" defaultValue = {Date.now}/>
            <DateTimeInput source="to" defaultValue = {Date.now}/>
            <ReferenceArrayInput source="positions" reference="category">
                <SelectArrayInput optionText="name" />
            </ReferenceArrayInput>
            <LongTextInput source="content"  />
        </SimpleForm>
    </Edit>
))


const PopupCreate = props => (
    <Create {...props}>
        <SimpleForm  toolbar={<CustomToolbar />}>
            <TextInput source="name"/>
            <ImageInput source="media" label="com.related_image" accept="image/*" multiple={false}>
                <ImageField source="src" title="" />
            </ImageInput>
            <LongTextInput source="url"/>                
            <LongTextInput source="description"/>
            <DateTimeInput source="from" defaultValue = {Date.now}/>
            <DateTimeInput source="to" defaultValue = {Date.now}/>
            <ReferenceArrayInput source="positions" reference="category">
                <SelectArrayInput optionText="name" />
            </ReferenceArrayInput>
            <LongTextInput source="content"  />
        </SimpleForm>
    </Create>
);

export default {
    list: PopupList,
    edit: PopupEdit,
    create: PopupCreate,
    icon: PopupIcon,
};