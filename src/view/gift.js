import GiftIcon from '@material-ui/icons/CardGiftcard';

import React from 'react';
import { 
    Create,
    Datagrid, 
    Edit, 
    SimpleForm, 
    SimpleFormIterator,
    Responsive, 
    List,
    NumberInput, 
    SelectInput,
    DisabledInput,
    ArrayInput,
    TextInput, 
    TextField, 
    NumberField, 
    ImageField, 
    DateField,
    Toolbar,
    ListButton,
    SaveButton,
    DeleteButton,
    CloneButton,
    translate,
} from 'react-admin';

import { withStyles } from '@material-ui/core/styles';
import { required,  number, minValue } from './validate';
import { langs } from '../lib/common';

const validatePositiveNumber = [required(), number(), minValue(0)];

const GiftTitle = translate(({ record, translate }) => (
    <span>
        {translate('resources.gift.name')} / {record.name}
    </span>
));

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
    inline_margin: { display: 'inline-block', marginRight: 32 },
};

const GiftList = withStyles(styles) (( { classes, permissions, ...props } ) => (
    <List {...props} sort={{ field: 'level', order: 'ASC' }}>
        <Responsive        
            small={
                <Datagrid  rowClick="edit" classes={{ rowEven: classes.rowEven }}>
                    <TextField source="name" />
                    <ImageField classes={classes} source="img"/>
                    <NumberField source="price" />
                    <DateField source="ctime" />
                </Datagrid>
            }
            medium={
                <Datagrid  rowClick="edit" classes={{ rowEven: classes.rowEven }}>
                    <NumberField source="id" />
                    <TextField source="name" />
                    <ImageField classes={classes} source="img"/>
                    <NumberField source="price" />
                    <DateField source="ctime" />
                </Datagrid>
            }
        />
    </List>
));

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

const GiftEdit = withStyles(styles) (( { classes, permissions, ...props } ) => (
    <Edit title={<GiftTitle />} {...props}>
        <SimpleForm toolbar={<CustomToolbar />}>
            <DisabledInput source="id" />
            <TextInput source="name" />
            <TextInput source="img" style={{width:'40%'}}/>
            <NumberInput source="price" />
            <ArrayInput source="trans" style={{ width: '40%' }}>
                <SimpleFormIterator>
                    <SelectInput source="lang" formClassName={classes.inline_margin} style={{ width: 50 }} label="resources.category.trans.lang" choices={langs} />
                    <TextInput source="str"  formClassName={classes.inline_margin} style={{ width: 150 }} label="resources.category.trans.str" />
                </SimpleFormIterator>
            </ArrayInput>
        </SimpleForm>
    </Edit>
))

const GiftCreate = withStyles(styles) (( { classes, permissions, ...props } ) => (
    <Create {...props}>
        <SimpleForm>
            <TextInput source="name" />
            <TextInput source="img" style={{width:'40%'}}/>
            <NumberInput source="price" />
            <ArrayInput source="trans" style={{ width: '40%' }}>
                <SimpleFormIterator>
                    <SelectInput source="lang" formClassName={classes.inline_margin} style={{ width: 50 }} label="resources.category.trans.lang" choices={langs} />
                    <TextInput source="str"  formClassName={classes.inline_margin} style={{ width: 150 }} label="resources.category.trans.str" />
                </SimpleFormIterator>
            </ArrayInput>
        </SimpleForm>
    </Create>
))

export default {
    list: GiftList,
    edit: GiftEdit,
    create: GiftCreate,
    icon: GiftIcon,
};
